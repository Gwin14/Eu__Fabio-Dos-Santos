# fabiosantos.dev.br

Portfólio de Fábio Santos, desenvolvedor full stack e mobile em Florianópolis.

O próprio site é uma demonstração de trabalho:

- **Retrato revelado ao vivo em WebGL**: seis looks (shader próprio com exposição, balanço de branco, split toning, fade, grão e vinheta) e um divisor para comparar com o original, como nos apps Lutra e Komorebi.
- **Luz real de Florianópolis**: a posição do sol é calculada no navegador; na hora dourada a foto abre no look "Hora dourada".
- **Chat "Pergunte sobre mim"** com a API do Claude (`/api/ask`), preso a uma ficha de fatos, com streaming, limite de uso e um índice local quando não há chave.
- **Paleta de comandos** (⌘K / Ctrl K), que também é o menu no celular.
- **Português e inglês**, detectado pelo navegador e trocável no topo (`?lang=en`).
- **Currículo em `/cv`**, gerado do mesmo conteúdo, pronto para imprimir ou salvar em PDF.

## Stack

Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4, motion, componentes do [React Bits](https://reactbits.dev) (DecryptedText, Magnet, Noise), ícones do simple-icons e `@anthropic-ai/sdk`.

O conteúdo fica todo em `src/content/site.ts`.

## Rodar

```bash
npm install
cp .env.example .env.local   # opcional: coloque a ANTHROPIC_API_KEY
npm run dev
```

## Publicar

O chat precisa de servidor, então o deploy indicado é a Vercel. Configure `ANTHROPIC_API_KEY` nas variáveis de ambiente do projeto e aponte o domínio `fabiosantos.dev.br` para ele.
