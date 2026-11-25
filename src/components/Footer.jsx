import { Link } from "react-router";

const company = [
  { label: "Términos", to: "/terminos" },
  { label: "Condiciones", to: "/condiciones" },
  { label: "Política de privacidad", to: "/privacidad" },
];

const socials = [
  {
    name: "Facebook",
    icon: (
      <path
        fill="currentColor"
        d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"
      />
    ),
  },
  {
    name: "X",
    icon: (
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    ),
  },
  {
    name: "Instagram",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </g>
    ),
  },
];

export default function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí después conectaremos el correo con el backend
  };

  return (
    <footer className="bg-lila-900 text-lila-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        {/* Marca */}
        <div>
          <p className="text-2xl font-bold text-white">BecaHub</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-lila-200">
            Conectamos estudiantes con becas que impulsan una educación de calidad.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href="#"
                aria-label={s.name}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-lila-100 transition hover:bg-lila-500 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Compañía */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-lila-300">
            Compañía
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {company.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-lila-100 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Únete */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-lila-300">
            Únete a BecaHub
          </p>
          <p className="mt-4 text-sm text-lila-200">
            Déjanos tu correo para recibir más información.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              placeholder="Ingresa tu correo"
              className="w-full rounded-full bg-white/10 px-5 py-2.5 text-sm text-white placeholder-lila-300 outline-none ring-1 ring-white/20 focus:ring-lila-300"
            />
            <button
              type="submit"
              className="rounded-full bg-lila-400 px-6 py-2.5 text-sm font-semibold text-lila-900 transition hover:bg-lila-300"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-lila-300">
        © {new Date().getFullYear()} BecaHub. Todos los derechos reservados.
      </div>
    </footer>
  );
}