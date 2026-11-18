"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { Grade } from "@/content/site";

const VERT = `
attribute vec2 p;
varying vec2 v;
void main(){ v = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
varying vec2 v;
uniform sampler2D tex;
uniform vec2 res;
uniform vec2 img;
uniform float time;
uniform float split;
uniform float exposure, contrast, saturation, temp, tint, fade, grain, vignette, bw;
uniform vec3 shadows, highlights;

vec2 cover(vec2 uv){
  float rc = res.x / res.y;
  float ri = img.x / img.y;
  vec2 s = rc > ri ? vec2(1.0, ri / rc) : vec2(rc / ri, 1.0);
  return (uv - 0.5) * s + vec2(0.5, 0.5);
}
float hash(vec2 q){ return fract(sin(dot(q, vec2(12.9898, 78.233))) * 43758.5453); }

vec3 grade(vec3 c, vec2 uv){
  vec3 lin = pow(max(c, 0.0), vec3(2.2));
  lin *= exp2(exposure);
  lin *= vec3(1.0 + temp * 0.13 + tint * 0.03, 1.0 - tint * 0.07, 1.0 - temp * 0.16 + tint * 0.03);
  c = pow(max(lin, 0.0), vec3(1.0 / 2.2));
  c = (c - 0.5) * contrast + 0.5;
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c = mix(vec3(l), c, saturation);
  c += shadows * (1.0 - smoothstep(0.0, 0.55, l)) + highlights * smoothstep(0.45, 1.0, l);
  c = mix(c, vec3(dot(c, vec3(0.2126, 0.7152, 0.0722))), bw);
  c = fade * 0.32 + c * (1.0 - fade * 0.32);
  float d = distance(uv, vec2(0.5));
  c *= 1.0 - vignette * smoothstep(0.32, 0.86, d);
  c += (hash(uv * res + fract(time) * 91.7) - 0.5) * grain;
  return clamp(c, 0.0, 1.0);
}

void main(){
  vec3 src = texture2D(tex, cover(v)).rgb;
  vec3 col = v.x < split ? src : grade(src, v);
  float edge = 1.0 - smoothstep(0.0, 1.5 / res.x, abs(v.x - split));
  col = mix(col, vec3(0.95, 0.64, 0.23), edge * step(0.001, split) * step(split, 0.999));
  gl_FragColor = vec4(col, 1.0);
}
`;

const KEYS = ["exposure", "contrast", "saturation", "temp", "tint", "fade", "grain", "vignette", "bw"] as const;
type Num = (typeof KEYS)[number];
type State = Record<Num, number> & { shadows: number[]; highlights: number[] };

const toState = (g: Grade): State => ({
  exposure: g.exposure,
  contrast: g.contrast,
  saturation: g.saturation,
  temp: g.temp,
  tint: g.tint,
  fade: g.fade,
  grain: g.grain,
  vignette: g.vignette,
  bw: g.bw,
  shadows: [...g.shadows],
  highlights: [...g.highlights],
});

// Aproximação em CSS para quando não houver WebGL
const cssFilter = (g: Grade) =>
  `brightness(${(1 + g.exposure * 0.6).toFixed(2)}) contrast(${g.contrast.toFixed(2)}) saturate(${g.saturation.toFixed(2)}) sepia(${Math.max(0, g.temp * 0.35).toFixed(2)}) grayscale(${g.bw})`;

export default function GradedPortrait({
  src,
  alt,
  grade,
  compareLabel,
  className = "",
}: {
  src: string;
  alt: string;
  grade: Grade;
  compareLabel: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const target = useRef<State>(toState(grade));
  const wake = useRef<() => void>(() => {});
  const splitRef = useRef(0);
  const [split, setSplit] = useState(0.12);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const dragging = useRef(false);

  useEffect(() => {
    target.current = toState(grade);
    wake.current();
  }, [grade]);

  useEffect(() => {
    splitRef.current = split;
    wake.current();
  }, [split]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false, preserveDrawingBuffer: false });
    if (!gl) {
      setFailed(true);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const compile = (type: number, code: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, code);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const U = {
      res: u("res"),
      img: u("img"),
      time: u("time"),
      split: u("split"),
      shadows: u("shadows"),
      highlights: u("highlights"),
      ...Object.fromEntries(KEYS.map((k) => [k, u(k)])),
    } as Record<string, WebGLUniformLocation | null>;

    const cur: State = toState(grade);
    let imgSize: [number, number] = [1, 1];
    let raf = 0;
    let visible = true;
    let alive = true;
    let lastGrain = 0;
    let loaded = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
    };

    const draw = (now: number) => {
      gl.uniform2f(U.res, canvas.width, canvas.height);
      gl.uniform2f(U.img, imgSize[0], imgSize[1]);
      gl.uniform1f(U.time, reduce ? 0 : now / 1000);
      gl.uniform1f(U.split, splitRef.current);
      for (const k of KEYS) gl.uniform1f(U[k], cur[k]);
      gl.uniform3fv(U.shadows, cur.shadows);
      gl.uniform3fv(U.highlights, cur.highlights);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const step = (now: number) => {
      raf = 0;
      if (!alive || !loaded) return;
      const t = target.current;
      let moving = false;
      const k = 0.14;
      for (const key of KEYS) {
        const d = t[key] - cur[key];
        if (Math.abs(d) > 0.0005) {
          cur[key] += d * k;
          moving = true;
        } else cur[key] = t[key];
      }
      for (const arr of ["shadows", "highlights"] as const) {
        for (let i = 0; i < 3; i++) {
          const d = t[arr][i] - cur[arr][i];
          if (Math.abs(d) > 0.0005) {
            cur[arr][i] += d * k;
            moving = true;
          } else cur[arr][i] = t[arr][i];
        }
      }
      const grainTick = !reduce && cur.grain > 0.001 && now - lastGrain > 1000 / 24;
      if (moving || grainTick || dragging.current) {
        if (grainTick) lastGrain = now;
        resize();
        draw(now);
      }
      if (visible && (moving || (!reduce && cur.grain > 0.001))) raf = requestAnimationFrame(step);
    };

    const kick = () => {
      if (raf || !visible) return;
      raf = requestAnimationFrame(step);
    };
    wake.current = () => {
      if (!loaded) return;
      resize();
      draw(performance.now());
      kick();
    };

    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      if (!alive) return;
      imgSize = [image.naturalWidth, image.naturalHeight];
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      loaded = true;
      resize();
      draw(performance.now());
      setReady(true);
      kick();
    };
    image.onerror = () => setFailed(true);
    image.src = src;

    const ro = new ResizeObserver(() => wake.current());
    ro.observe(canvas);
    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible) kick();
    });
    io.observe(canvas);
    const lost = (e: Event) => {
      e.preventDefault();
      setFailed(true);
    };
    canvas.addEventListener("webglcontextlost", lost);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("webglcontextlost", lost);
      wake.current = () => {};
    };
    // a textura é carregada uma vez; o look muda pelos uniforms
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const fromPointer = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setSplit(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") setSplit((s) => Math.max(0, s - 0.05));
    else if (e.key === "ArrowRight") setSplit((s) => Math.min(1, s + 0.05));
    else if (e.key === "Home") setSplit(0);
    else if (e.key === "End") setSplit(1);
    else return;
    e.preventDefault();
  };

  return (
    <div
      className={`relative h-full w-full touch-pan-y select-none overflow-hidden ${className}`}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        fromPointer(e);
      }}
      onPointerMove={(e) => dragging.current && fromPointer(e)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* imagem real sempre presente: base para leitores de tela, sem WebGL e antes do shader carregar */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: failed ? cssFilter(grade) : undefined, opacity: ready && !failed ? 0 : 1 }}
        draggable={false}
      />
      {!failed && <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />}
      {!failed && (
        <div
          role="slider"
          tabIndex={0}
          aria-label={compareLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(split * 100)}
          onKeyDown={onKey}
          className="absolute inset-y-0 z-10 w-11 -translate-x-1/2 cursor-ew-resize outline-none"
          style={{ left: `${split * 100}%` }}
        >
          <span
            className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--accent)] bg-black/60 text-[var(--accent)] backdrop-blur-sm"
            style={{ opacity: split > 0.002 && split < 0.998 ? 1 : 0.85 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 4 2 8l4 4M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
}
