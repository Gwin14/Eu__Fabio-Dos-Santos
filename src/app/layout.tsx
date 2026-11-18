import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { LangProvider } from "@/lib/i18n";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });

const title = "Fábio Santos · Desenvolvedor full stack e mobile";
const description =
  "Portfólio de Fábio Santos, desenvolvedor full stack e mobile em Florianópolis. Next.js, React Native com módulos nativos, Supabase e IA aplicada em produção.";

export const metadata: Metadata = {
  metadataBase: new URL("https://fabiosantos.dev.br"),
  title,
  description,
  alternates: { canonical: "/" },
  authors: [{ name: "Fábio Santos", url: "https://fabiosantos.dev.br" }],
  keywords: ["Fábio Santos", "desenvolvedor", "full stack", "React Native", "Expo", "Next.js", "IA", "Florianópolis", "portfólio"],
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    alternateLocale: "en_US",
    url: "https://fabiosantos.dev.br",
    siteName: "Fábio Santos",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0d0c0a",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fábio Santos",
  jobTitle: "Desenvolvedor full stack e mobile",
  url: "https://fabiosantos.dev.br",
  email: "mailto:contato@fabiosantos.dev.br",
  address: { "@type": "PostalAddress", addressLocality: "Florianópolis", addressRegion: "SC", addressCountry: "BR" },
  alumniOf: { "@type": "EducationalOrganization", name: "Senac Santa Catarina" },
  sameAs: ["https://www.linkedin.com/in/fabio-santos14/", "https://github.com/Gwin14"],
  knowsLanguage: ["pt-BR", "en"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${geistMono.variable} ${display.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
