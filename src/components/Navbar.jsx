import { useState } from "react";
import { Link, NavLink } from "react-router";

const links = [
  { label: "Inicio", to: "/" },
  { label: "Becas", to: "/becas-info" },
  { label: "Quienes Somos", to: "/quienes-somos" },
 
];

function LogoBadge() {
  return (
    <svg
      viewBox="0 0 48 60"
      className="h-12 w-10 drop-shadow-md"
      role="img"
      aria-label="Logo BecaHub ODS 4"
    >
      <defs>
        <linearGradient id="pennantGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b66ea" />
          <stop offset="100%" stopColor="#5f36b3" />
        </linearGradient>
      </defs>

      {/* Banderín */}
      <path d="M3 2 H45 V42 L24 58 L3 42 Z" fill="url(#pennantGrad)" />

      {/* Contorno del libro (tapas) */}
      <path
        d="M7.5 13 V30 C13 28.5 19 28.5 24 31.5 C29 28.5 35 28.5 40.5 30 V13"
        fill="none"
        stroke="#e0d4ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Páginas */}
      <path
        d="M24 12 C20 9.5 14.5 9.5 11 11 V27.5 C14.5 26 20 26.5 24 29 Z"
        fill="#ffffff"
      />
      <path
        d="M24 12 C28 9.5 33.5 9.5 37 11 V27.5 C33.5 26 28 26.5 24 29 Z"
        fill="#f7f4ff"
      />
      <line x1="24" y1="12" x2="24" y2="29" stroke="#c9b6fb" strokeWidth="1.2" />

      {/* Texto */}
      <text
        x="24"
        y="39"
        textAnchor="middle"
        fontSize="7.5"
        fontWeight="700"
        fill="#ffffff"
        letterSpacing="0.5"
      >
        ODS 4
      </text>
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-lila-100 bg-white/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <LogoBadge />
          <span className="text-xl font-bold text-lila-800">BecaHub</span>
        </Link>

        {/* Menú escritorio */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition hover:text-lila-500 ${
                    isActive ? "text-lila-500" : "text-lila-800"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-full bg-lila-600 px-6 py-2 text-sm font-semibold text-white shadow-md shadow-lila-300 transition hover:-translate-y-0.5 hover:bg-lila-700"
          >
            Iniciar
          </Link>

          {/* Botón hamburguesa móvil */}
          <button
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-lg text-lila-700 hover:bg-lila-100 md:hidden"
            aria-label="Abrir menú"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {open && (
        <ul className="space-y-1 border-t border-lila-100 bg-white px-6 py-3 md:hidden">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-lila-800 hover:bg-lila-50"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}