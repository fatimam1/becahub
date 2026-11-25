import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";

const values = [
  {
    num: "01",
    title: "Transparencia",
    text: "Mostramos los requisitos y fechas tal cual son, sin letra pequeña escondida.",
  },
  {
    num: "02",
    title: "Accesibilidad",
    text: "Buscar una beca debe ser fácil para cualquier estudiante, sin importar de dónde venga.",
  },
  {
    num: "03",
    title: "Calidad",
    text: "Priorizamos oportunidades reales y útiles, no cantidad por cantidad.",
  },
  {
    num: "04",
    title: "Compromiso",
    text: "Impulsamos el acceso equitativo a la información sobre apoyos educativos, contribuyendo desde la tecnología a las metas del ODS 4.",
  },
];

const story = [
  {
    step: "El problema",
    text: "Hay becas disponibles, pero la información está dispersa en decenas de páginas, con requisitos confusos y fechas que se pierden.",
  },
  {
    step: "La idea",
    text: "¿Y si las convocatorias vigentes estuvieran reunidas en un solo lugar, explicadas con claridad y filtradas según el perfil de cada estudiante?",
  },
  {
    step: "BecaHub",
    text: "Así nace BecaHub: una aplicación web que centraliza convocatorias, recomienda opciones compatibles con tu perfil y da seguimiento a tus postulaciones.",
  },
];

export default function QuienesSomos() {
  return (
    <>
      <Navbar />

      <main>
        
        <section className="relative overflow-hidden bg-gradient-to-br from-lila-900 via-lila-800 to-lila-700 text-white">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-lila-400/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-lila-300/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-5 md:py-28">
            <div className="md:col-span-3">
              <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-lila-200 ring-1 ring-white/20">
                Conócenos
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-6xl">
                Que estudiar no dependa de{" "}
                <span className="bg-gradient-to-r from-lila-200 to-lila-400 bg-clip-text text-transparent">
                  saber dónde buscar
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-lila-100">
                BecaHub es una plataforma web inspirada en el ODS 4 
                que centraliza convocatorias educativas, te recomienda opciones
                según tu perfil y te ayuda a dar seguimiento a tus fechas clave.
                Encontrar una beca no debería ser más difícil que merecerla.
              </p>
            </div>

       
            <div className="relative hidden h-72 md:col-span-2 md:block">
              <div className="animate-float absolute left-0 top-4 rounded-2xl bg-white/10 p-5 backdrop-blur ring-1 ring-white/20">
                <p className="text-3xl">🎓</p>
                <p className="mt-2 text-sm font-semibold">Para estudiantes</p>
              </div>
              <div
                className="animate-float absolute right-0 top-24 rounded-2xl bg-white/15 p-5 backdrop-blur ring-1 ring-white/20"
                style={{ animationDelay: "1.5s" }}
              >
                <p className="text-3xl">🌍</p>
                <p className="mt-2 text-sm font-semibold">Con enfoque ODS 4</p>
              </div>
              <div
                className="animate-float absolute bottom-0 left-12 rounded-2xl bg-lila-400/30 p-5 backdrop-blur ring-1 ring-white/20"
                style={{ animationDelay: "3s" }}
              >
                <p className="text-3xl">🔎</p>
                <p className="mt-2 text-sm font-semibold">Búsqueda sencilla</p>
              </div>
            </div>
          </div>
        </section>

      
        <section className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-lila-800 sm:text-4xl">
              Hacia dónde vamos
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="group h-full rounded-3xl bg-white p-8 shadow-lg shadow-lila-200 ring-1 ring-lila-100 transition hover:-translate-y-2 hover:shadow-xl">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lila-100 text-2xl transition group-hover:bg-lila-600 group-hover:text-white">
                  🎯
                </span>
                <h3 className="mt-5 text-2xl font-bold text-lila-800">Misión</h3>
                <p className="mt-3 leading-relaxed text-lila-800/80">
                  Centralizar convocatorias de becas vigentes en un solo 
                  lugar, explicarlas con claridad y conectarlas con cada
                  estudiante mediante recomendaciones personalizadas y seguimiento oportuno.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="group h-full rounded-3xl bg-gradient-to-br from-lila-600 to-lila-800 p-8 text-white shadow-lg shadow-lila-300 transition hover:-translate-y-2 hover:shadow-xl">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-2xl">
                  🔭
                </span>
                <h3 className="mt-5 text-2xl font-bold">Visión</h3>
                <p className="mt-3 leading-relaxed text-lila-100">
                  Ser la plataforma de referencia en México para que
                  ningún estudiante pierda una oportunidad educativa
                  por desinformación, dispersión de convocatorias o vencimiento de plazos.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        
        <section className="bg-lila-100/60">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <Reveal>
              <p className="text-center text-sm font-semibold uppercase tracking-widest text-lila-500">
                El porqué
              </p>
              <h2 className="mt-2 text-center text-3xl font-bold text-lila-800 sm:text-4xl">
                Cómo nació BecaHub
              </h2>
            </Reveal>

            <div className="relative mt-14 space-y-10 border-l-2 border-dashed border-lila-300 pl-8">
              {story.map((item, i) => (
                <Reveal key={item.step} delay={i * 150}>
                  <div className="relative">
                    <span className="absolute -left-[2.85rem] top-1 grid h-8 w-8 place-items-center rounded-full bg-lila-600 text-sm font-bold text-white ring-4 ring-lila-100">
                      {i + 1}
                    </span>
                    <h3 className="text-xl font-bold text-lila-800">{item.step}</h3>
                    <p className="mt-2 leading-relaxed text-lila-800/80">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

       
        <section className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-lila-500">
              Lo que nos define
            </p>
            <h2 className="mt-2 text-center text-3xl font-bold text-lila-800 sm:text-4xl">
              Nuestros valores
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="group relative h-full overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-lila-100 transition duration-300 hover:-translate-y-2 hover:bg-lila-700 hover:shadow-xl hover:shadow-lila-300">
                  <span className="text-5xl font-bold text-lila-200 transition group-hover:text-lila-500">
                    {v.num}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-lila-800 transition group-hover:text-white">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-lila-800/75 transition group-hover:text-lila-100">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

   
        <section className="px-6 pb-24">
          <Reveal>
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-lila-600 via-lila-700 to-lila-900 px-8 py-16 text-center text-white shadow-2xl shadow-lila-300">
              <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-lila-300/30 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-lila-400/30 blur-3xl" />

              <h2 className="relative text-3xl font-bold sm:text-5xl">
                Tu próxima oportunidad
                <br />
                <span className="text-lila-200">puede estar a un clic</span>
              </h2>
              <p className="relative mx-auto mt-5 max-w-xl text-lila-100">
                Explora las becas disponibles y da el primer paso hacia una
                educación de calidad.
              </p>

              <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/login"
                  className="rounded-full bg-white px-8 py-3.5 font-semibold text-lila-700 shadow-lg transition hover:-translate-y-1 hover:bg-lila-50"
                >
                  Iniciar búsqueda
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