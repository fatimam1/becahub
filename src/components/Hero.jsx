import { Link } from "react-router";

const highlights = ["Becas para ti", "Búsqueda sencilla", "Enfoque ODS 4"];

function BookIllustration() {
  return (
    <svg viewBox="0 0 400 360" className="mx-auto w-full max-w-md drop-shadow-xl" role="img" aria-label="Libro abierto con birrete de graduación">
      {/* Birrete */}
      <g>
        <path d="M150 75 L150 105 C175 122 225 122 250 105 L250 75 L200 95 Z" fill="#5f36b3" />
        <polygon points="200,15 295,52 200,92 105,52" fill="#4c2d8f" />
        <line x1="283" y1="57" x2="283" y2="98" stroke="#fcd34d" strokeWidth="4" strokeLinecap="round" />
        <circle cx="283" cy="102" r="6" fill="#fcd34d" />
      </g>

      {/* Libro */}
      <g transform="translate(0,60)">
        <ellipse cx="200" cy="285" rx="150" ry="14" fill="#7447d6" opacity="0.15" />
        {/* Portada */}
        <path d="M28 90 L28 262 C90 240 150 240 200 274 C250 240 310 240 372 262 L372 90 Z" fill="#7447d6" />
        {/* Páginas */}
        <path d="M200 90 C150 60 90 60 40 80 L40 250 C90 230 150 230 200 260 Z" fill="#ffffff" stroke="#c9b6fb" strokeWidth="3" />
        <path d="M200 90 C250 60 310 60 360 80 L360 250 C310 230 250 230 200 260 Z" fill="#faf8ff" stroke="#c9b6fb" strokeWidth="3" />
        {/* Líneas de texto */}
        <g stroke="#e0d4ff" strokeWidth="6" strokeLinecap="round">
          <line x1="68" y1="115" x2="170" y2="122" />
          <line x1="68" y1="140" x2="170" y2="147" />
          <line x1="68" y1="165" x2="170" y2="172" />
          <line x1="68" y1="190" x2="140" y2="195" />
          <line x1="230" y1="122" x2="332" y2="115" />
          <line x1="230" y1="147" x2="332" y2="140" />
          <line x1="230" y1="172" x2="332" y2="165" />
          <line x1="230" y1="195" x2="302" y2="190" />
        </g>
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-lila-100 via-lila-50 to-lila-200"
    >
      {/* Círculos decorativos */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-lila-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-lila-400/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        {/* Texto */}
        <div className="text-center md:text-left">
          <h1 className="text-6xl font-bold leading-tight tracking-tight text-lila-800 sm:text-7xl">
            Beca<span className="text-lila-500">Hub</span>
          </h1>

          <p className="mt-4 text-xl font-medium text-lila-700">
            Becas sostenibles para tu futuro
          </p>

          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-lila-800/80 md:mx-0">
            Encuentra becas vigentes en un solo lugar. 
            Facilitamos tu búsqueda para ampliar tus
            oportunidades y acercarte a una educación de calidad.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Link
              to="/login"
              className="rounded-full bg-lila-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-lila-300 transition hover:-translate-y-0.5 hover:bg-lila-700"
            >
              Iniciar búsqueda
            </Link>
            <Link
              to="/quienes-somos"
              className="rounded-full border border-lila-300 bg-white/60 px-8 py-3.5 text-base font-semibold text-lila-700 transition hover:bg-white"
            >
              Quienes Somos
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-3 md:justify-start">
            {highlights.map((item) => (
              <li
                key={item}
                className="rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-lila-700 ring-1 ring-lila-200"
              >
                ✓ {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Ilustración */}
        <BookIllustration />
      </div>
    </section>
  );
}