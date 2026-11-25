import { Link } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Rich({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-lila-800">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

export default function LegalPage({ title, subtitle, intro = [], sections }) {
  return (
    <>
  <Navbar />

  <section className="relative overflow-hidden bg-gradient-to-br from-lila-900 via-lila-800 to-lila-700 text-white">
    <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-lila-400/30 blur-3xl" />

    {/* Volver al inicio: pegado a la izquierda, alineado con el logo */}
    <div className="relative mx-auto max-w-6xl px-6 pt-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-lila-100 ring-1 ring-white/20 transition hover:bg-white/20 hover:text-white"
      >
        ← Volver al inicio
      </Link>
    </div>

    {/* Título */}
    <div className="relative mx-auto max-w-4xl px-6 pb-14 pt-6 text-center md:pb-20">
      <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-lila-200 ring-1 ring-white/20">
        Legal
      </span>
      <h1 className="mt-5 text-4xl font-bold sm:text-5xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-xl text-lila-100">{subtitle}</p>
    </div>
  </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[18rem_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-6 rounded-3xl bg-white p-5 shadow-lg shadow-lila-200 ring-1 ring-lila-100">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-lila-500">
              En esta página
            </p>
            <ul className="space-y-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block rounded-lg px-3 py-1.5 text-sm text-lila-800 transition hover:bg-lila-50 hover:text-lila-600"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="space-y-6">
          {intro.length > 0 && (
            <article className="rounded-3xl bg-white p-7 shadow-lg shadow-lila-100 ring-1 ring-lila-100">
              {intro.map((p, i) => (
                <p key={i} className={`leading-relaxed text-lila-800/80 ${i > 0 ? "mt-4" : ""}`}>
                  <Rich text={p} />
                </p>
              ))}
            </article>
          )}

          {sections.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className="scroll-mt-6 rounded-3xl bg-white p-7 shadow-lg shadow-lila-100 ring-1 ring-lila-100"
            >
              <h2 className="text-xl font-bold text-lila-800">{s.title}</h2>
              <div className="mt-4 space-y-4">
                {s.blocks.map((b, i) => {
                  if (b.type === "p") {
                    return (
                      <p key={i} className="leading-relaxed text-lila-800/80">
                        <Rich text={b.text} />
                      </p>
                    );
                  }
                  if (b.type === "list") {
                    return (
                      <ul key={i} className="space-y-3">
                        {b.items.map((item, k) => (
                          <li key={k} className="flex gap-3 leading-relaxed text-lila-800/80">
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lila-500" />
                            {typeof item === "string" ? (
                              <span>{item}</span>
                            ) : (
                              <span>
                                <strong className="font-semibold text-lila-800">{item.label}</strong>{" "}
                                <Rich text={item.text} />
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <div key={i} className="grid gap-3 sm:grid-cols-2">
                      {b.items.map((c) => (
                        <a
                          key={c.label}
                          href={c.href}
                          className="rounded-2xl bg-lila-50 p-4 ring-1 ring-lila-100 transition hover:-translate-y-1 hover:bg-lila-100"
                        >
                          <p className="text-xs font-semibold uppercase tracking-wide text-lila-500">
                            {c.label}
                          </p>
                          <p className="mt-1 break-all font-semibold text-lila-800">{c.value}</p>
                        </a>
                      ))}
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}