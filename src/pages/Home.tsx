import { Link } from "wouter";
import { BookText, Boxes, ListChecks, Calculator, Cpu, ShieldCheck } from "lucide-react";
import manifest from "@/manifest.json";

const CARDS = [
  {
    href: "/doc/language",
    icon: BookText,
    title: "Linguagem C++",
    desc: "A linguagem em si: tipos, templates, classes, lambdas, move semantics, expressoes e declaracoes.",
  },
  {
    href: "/doc/container",
    icon: Boxes,
    title: "Containers",
    desc: "vector, map, set, array, span, mdspan e todos os containers da biblioteca padrao.",
  },
  {
    href: "/doc/algorithm",
    icon: ListChecks,
    title: "Algoritmos",
    desc: "sort, find, transform, accumulate e os algoritmos (incluindo as versoes de ranges).",
  },
  {
    href: "/doc/ranges",
    icon: ListChecks,
    title: "Ranges",
    desc: "views, adaptadores e a biblioteca de ranges (C++20) para composicao de operacoes.",
  },
  {
    href: "/doc/concepts",
    icon: ShieldCheck,
    title: "Conceitos (Concepts)",
    desc: "Restricoes de tipo para templates (C++20): same_as, integral, invocable e mais.",
  },
  {
    href: "/doc/thread",
    icon: Cpu,
    title: "Threads e Concorrencia",
    desc: "thread, mutex, atomic, coroutines, futures e a biblioteca de concorrencia.",
  },
];

export default function Home() {
  const total = (manifest as any).total;
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[hsl(var(--nix-blue))]/10 border border-[hsl(var(--nix-blue))]/30 mx-auto mb-4">
          <span className="font-mono font-bold text-2xl text-[hsl(var(--nix-blue))]">C++</span>
        </div>
        <h1 className="text-4xl font-bold text-[hsl(var(--nix-blue))] mb-3">
          Documentacao da Linguagem C++
        </h1>
        <p className="text-lg text-[hsl(var(--nix-dim))]">
          A referencia completa do C++ (cppreference) traduzida para portugues brasileiro.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="block p-5 rounded-lg border border-[hsl(var(--nix-blue))]/20 bg-[hsl(var(--nix-bg-2))] hover:border-[hsl(var(--nix-blue))]/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-5 h-5 text-[hsl(var(--nix-orange))]" />
                <h3 className="font-mono font-bold text-[hsl(var(--nix-blue))] m-0">{c.title}</h3>
              </div>
              <p className="text-sm text-[hsl(var(--nix-dim))] m-0">{c.desc}</p>
            </Link>
          );
        })}
      </div>

      <div className="p-4 rounded-lg border border-[hsl(var(--nix-purple))]/20 bg-[hsl(var(--nix-bg-2))]">
        <p className="text-sm text-[hsl(var(--nix-fg))]/80 m-0">
          <strong className="text-[hsl(var(--nix-blue))]">{total} paginas</strong> da referencia da
          linguagem C++ e sua biblioteca padrao (do cppreference) traduzidas via Vertex AI (Gemini
          2.5 Flash). Cobre a linguagem, conceitos, containers, ranges, algoritmos, corrotinas e
          toda a biblioteca padrao ate o C++26.
        </p>
        <p className="text-xs text-[hsl(var(--nix-dim))] mt-2 mb-0">
          Use a busca na barra lateral para encontrar qualquer recurso rapidamente (ex: vector, sort, unique_ptr).
        </p>
      </div>
    </div>
  );
}
