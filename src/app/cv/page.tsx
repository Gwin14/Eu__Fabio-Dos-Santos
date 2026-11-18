import type { Metadata } from "next";
import Resume from "./Resume";

export const metadata: Metadata = {
  title: "Currículo · Fábio Santos",
  description: "Currículo de Fábio Santos, desenvolvedor full stack e mobile em Florianópolis. Versão para imprimir ou salvar em PDF.",
  alternates: { canonical: "/cv" },
};

export default function Page() {
  return <Resume />;
}
