import { useState } from "react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";



const types = [
  {
    icon: "🏆",
    title: "Excelencia académica",
    text: "Para estudiantes con promedio alto. Suelen pedir un promedio mínimo y, a veces, carta de motivos.",
  },
  {
    icon: "🤝",
    title: "Apoyo económico",
    text: "Pensadas para quienes necesitan apoyo para continuar estudiando. Normalmente piden comprobante de ingresos.",
  },
  {
    icon: "🌍",
    title: "Movilidad e intercambio",
    text: "Permiten estudiar un semestre o programa en otra ciudad o país. Suelen requerir idioma y entrevista.",
  },
  {
    icon: "🔬",
    title: "Posgrado e investigación",
    text: "Maestría, doctorado o estancias de investigación. Piden proyecto, cartas de recomendación y avance académico.",
  },
  {
    icon: "🎨",
    title: "Talento deportivo y cultural",
    text: "Para quienes destacan en deporte, arte o cultura. Piden evidencia: constancias, portafolio o resultados.",
  },
  {
    icon: "💻",
    title: "Tecnología e innovación",
    text: "Becas de empresas y fundaciones para áreas STEM, programación, ingeniería y emprendimiento.",
  },
];

const documents = [
  "Identificación oficial o credencial de estudiante",
  "CURP",
  "Historial académico o kárdex con promedio",
  "Comprobante de domicilio",
  "Carta de motivos o ensayo personal",
  "Cartas de recomendación",
  "Comprobante de ingresos familiares (becas económicas)",
  "Certificado de idioma (becas internacionales)",
];

const steps = [
  { title: "Define tu perfil", text: "Nivel de estudios, promedio, área de interés y si buscas apoyo local o en el extranjero." },
  { title: "Busca convocatorias vigentes", text: "Revisa requisitos, fechas de apertura y fecha límite antes de empezar." },
  { title: "Reúne tus documentos", text: "Prepáralos con tiempo: algunos, como las cartas de recomendación, tardan en conseguirse." },
  { title: "Envía tu postulación", text: "Llena el formulario completo y confirma que recibiste tu comprobante de registro." },
  { title: "Da seguimiento", text: "Revisa tu correo y las fechas de resultados, entrevistas o documentos adicionales." },
];

const tips = [
  "Empieza semanas antes de la fecha límite, no días.",
  "Lee la convocatoria completa; los requisitos cambian entre programas.",
  "Personaliza tu carta de motivos para cada beca.",
  "Pide las cartas de recomendación con anticipación.",
  "Guarda copias digitales de todo lo que envíes.",
  "Postula a varias becas: aumenta tus posibilidades.",
];

const faqs = [
  {
    q: "¿Necesito cuenta para consultar las becas?",
    a: "Si. La cuenta te sirve para recibir recomendaciones según tu perfil y dar seguimiento a tus postulaciones.",
  },
  {
    q: "¿Cuesta algo postularse?",
    a: "Las convocatorias legítimas no cobran por postularse. Si te piden dinero para “asegurar” una beca, desconfía y verifica en la página oficial de la institución.",
  },
  {
    q: "¿Puedo postular a más de una beca?",
    a: "En general sí, aunque algunas convocatorias no permiten recibir dos apoyos al mismo tiempo. Revisa las bases de cada una.",
  },
  {
    q: "¿Qué pasa si me falta un documento?",
    a: "Casi siempre una postulación incompleta se descarta. Revisa la lista de requisitos desde el inicio y, si tienes dudas, escribe a la institución que convoca.",
  },
  {
    q: "¿Cómo sé si una convocatoria sigue vigente?",
    a: "Revisa siempre la fecha límite y la fuente oficial. En BecaHub te mostramos las fechas clave, pero confirma los datos en la página de quien convoca.",
  },
];

const sources = [
  { name: "Becas Benito Juárez", desc: "Programa federal de apoyo para estudiantes de distintos niveles." },
  { name: "SECIHTI (antes CONAHCYT)", desc: "Becas de posgrado e investigación en México y el extranjero." },
  { name: "Fulbright–García Robles", desc: "Programas de estudio e investigación en Estados Unidos." },
  { name: "DAAD", desc: "Becas para estudiar o investigar en Alemania." },
  { name: "Universidades y fundaciones", desc: "Muchas instituciones publican sus propias becas internas." },
];

/* ───────────── Piezas ───────────── */

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-white ring-1 ring-lila-100">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-lila-800"
      >
        {q}
        <span className={`text-xl text-lila-500 transition ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && <p className="px-6 pb-5 text-sm leading-relaxed text-lila-800/75">{a}</p>}
    </div>
  );
}

/* ───────────── Página ───────────── */

export default function BecasInfo() {
  return (
    <>
      <Navbar />

      <main>
        {/* Intro */}
        <section className="relative overflow-hidden bg-gradient-to-br from-lila-900 via-lila-800 to-lila-700 text-white">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-lila-400/30 blur-3xl" />
          <div className="relative mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
            
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-6xl">
              Todo lo que necesitas saber{" "}
              <span className="bg-gradient-to-r from-lila-200 to-lila-400 bg-clip-text text-transparent">
                antes de postular
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-lila-100">
              Guía abierta para entender los tipos de becas, los documentos que suelen pedir y cómo
              armar una postulación sólida.
            </p>
          </div>
        </section>

        {/* Tipos de beca */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-lila-500">
              Conoce las opciones
            </p>
            <h2 className="mt-2 text-center text-3xl font-bold text-lila-800 sm:text-4xl">
              Tipos de becas
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {types.map((t, i) => (
              <Reveal key={t.title} delay={i * 80}>
                <div className="group h-full rounded-3xl bg-white p-6 shadow-lg shadow-lila-100 ring-1 ring-lila-100 transition hover:-translate-y-2 hover:shadow-xl">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lila-100 text-2xl transition group-hover:bg-lila-600">
                    {t.icon}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-lila-800">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-lila-800/75">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        
        <section className="bg-lila-100/60">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2">
            <Reveal>
              <h2 className="text-3xl font-bold text-lila-800">Documentos que suelen pedir</h2>
              <p className="mt-2 text-sm text-lila-800/70">
                Varía según la convocatoria, pero esta lista cubre la mayoría de los casos.
              </p>
              <ul className="mt-6 space-y-3">
                {documents.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-lila-800 ring-1 ring-lila-100"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lila-600 text-[10px] font-bold text-white">
                      ✓
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={150}>
              <h2 className="text-3xl font-bold text-lila-800">Cómo postular, paso a paso</h2>
              <ol className="relative mt-6 space-y-6 border-l-2 border-dashed border-lila-300 pl-8">
                {steps.map((s, i) => (
                  <li key={s.title} className="relative">
                    <span className="absolute -left-[2.85rem] top-0 grid h-8 w-8 place-items-center rounded-full bg-lila-600 text-sm font-bold text-white ring-4 ring-lila-100">
                      {i + 1}
                    </span>
                    <h3 className="font-bold text-lila-800">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-lila-800/75">{s.text}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* Consejos */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-lila-800 sm:text-4xl">
              Consejos para destacar
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tips.map((t, i) => (
              <Reveal key={t} delay={i * 80}>
                <div className="h-full rounded-2xl bg-gradient-to-br from-lila-600 to-lila-800 p-5 text-sm leading-relaxed text-white shadow-lg shadow-lila-200">
                  <span className="text-xs font-bold text-lila-200">0{i + 1}</span>
                  <p className="mt-1">{t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

       
        <section className="bg-lila-100/60">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <Reveal>
              <h2 className="text-center text-3xl font-bold text-lila-800 sm:text-4xl">
                Dónde se convocan becas
              </h2>
              <p className="mt-3 text-center text-sm text-lila-800/70">
                Ejemplos de instituciones que publican convocatorias. Verifica siempre la vigencia en su sitio oficial.
              </p>
            </Reveal>
            <ul className="mt-10 space-y-3">
              {sources.map((s) => (
                <li key={s.name} className="rounded-2xl bg-white px-5 py-4 ring-1 ring-lila-100">
                  <p className="font-bold text-lila-800">{s.name}</p>
                  <p className="text-sm text-lila-800/70">{s.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        
        <section className="mx-auto max-w-3xl px-6 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-lila-800 sm:text-4xl">
              Preguntas frecuentes
            </h2>
          </Reveal>
          <div className="mt-10 space-y-3">
            {faqs.map((f) => (
              <FaqItem key={f.q} {...f} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <Reveal>
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-lila-600 via-lila-700 to-lila-900 px-8 py-14 text-center text-white shadow-2xl shadow-lila-300">
              <h2 className="text-3xl font-bold sm:text-4xl">¿Listo para encontrar tu beca?</h2>
              <p className="mx-auto mt-4 max-w-xl text-lila-100">
                Crea tu cuenta para recibir recomendaciones según tu perfil y llevar el control de tus fechas clave.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/login"
                  className="rounded-full bg-white px-8 py-3.5 font-semibold text-lila-700 shadow-lg transition hover:-translate-y-1 hover:bg-lila-50"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/"
                  className="rounded-full border border-white/40 px-8 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Volver al inicio
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}