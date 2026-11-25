import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";

/* ───────────── Datos y utilidades ───────────── */

const phrases = [
  "Tu próxima beca está más cerca de lo que crees",
  "Educación de calidad, al alcance de todos",
  "Empieza hoy, tu futuro te está esperando",
];

const confettiColors = ["#8b66ea", "#c9b6fb", "#fcd34d", "#ab8ef5", "#ffffff", "#7447d6"];

const sparkles = [
  { top: "14%", left: "20%", d: "0s", s: 14 },
  { top: "20%", left: "80%", d: "0.8s", s: 18 },
  { top: "52%", left: "8%", d: "1.6s", s: 12 },
  { top: "64%", left: "88%", d: "0.4s", s: 14 },
  { top: "82%", left: "34%", d: "2.2s", s: 16 },
];

function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const strengthInfo = [
  { label: "Muy débil", bar: "bg-red-400", text: "text-red-500" },
  { label: "Débil", bar: "bg-orange-400", text: "text-orange-500" },
  { label: "Regular", bar: "bg-yellow-400", text: "text-yellow-600" },
  { label: "Buena", bar: "bg-lime-500", text: "text-lime-600" },
  { label: "¡Fuerte!", bar: "bg-emerald-500", text: "text-emerald-600" },
];

/* ───────────── Iconos ───────────── */

function Icon({ d, className = "h-5 w-5", strokeWidth = 1.8 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

function Star({ size = 14, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" />
    </svg>
  );
}

const icons = {
  mail: "M4 6h16v12H4z M4 7l8 6 8-6",
  lock: "M6 11h12v9H6z M8.5 11V8a3.5 3.5 0 0 1 7 0v3",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  eyeOff:
    "M3 3l18 18 M10.6 6.1A9.7 9.7 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.2 3.9 M6.5 7.5C3.9 9.2 2 12 2 12s3.5 6 10 6c1.6 0 3-.4 4.3-1 M9.9 9.9a3 3 0 0 0 4.2 4.2",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  back: "M19 12H5 M11 6l-6 6 6 6",
  book: "M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5z M12 6.5v13",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M20 20l-4-4",
  check: "M5 12.5l4.5 4.5L19 7",
  bookmark: "M7 4h10v16l-5-4-5 4z",
  cap: "M2 9l10-5 10 5-10 5z M6 11.5V16c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-4.5 M22 9v6",
};

const socials = [
  {
    name: "Google",
    path: "M21.35 11.1H12v2.9h5.35c-.23 1.4-1.7 4.1-5.35 4.1-3.2 0-5.85-2.65-5.85-5.9s2.65-5.9 5.85-5.9c1.8 0 3.05.8 3.75 1.45l2.55-2.45C16.7 3.9 14.55 3 12 3 7 3 3 7 3 12s4 9 9 9c5.2 0 8.65-3.65 8.65-8.8 0-.6-.05-1.05-.3-1.1z",
  },
  {
    name: "Facebook",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z",
  },
  {
    name: "Apple",
    path: "M16.37 12.64c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.61-1.7-3.18-1.73-1.35-.14-2.64.8-3.32.8-.69 0-1.74-.78-2.86-.76-1.47.02-2.83.86-3.58 2.17-1.53 2.65-.39 6.58 1.1 8.73.73 1.05 1.6 2.23 2.74 2.19 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.87.69 1.19-.02 1.94-1.07 2.66-2.13.84-1.22 1.19-2.4 1.21-2.46-.03-.01-2.31-.89-2.37-3.53zM14.2 6.1c.6-.74 1.02-1.76.9-2.78-.87.04-1.94.58-2.56 1.31-.55.64-1.04 1.69-.91 2.69.97.08 1.97-.49 2.57-1.22z",
  },
];

/* ───────────── Piezas reutilizables ───────────── */

function LogoMark({ dark = false }) {
  return (
    <span
      className={`grid h-10 w-10 place-items-center rounded-xl ${
        dark
          ? "bg-white/15 text-white ring-1 ring-white/25 backdrop-blur"
          : "bg-gradient-to-br from-lila-500 to-lila-700 text-white shadow-md shadow-lila-300"
      }`}
    >
      <Icon d={icons.book} className="h-5 w-5" />
    </span>
  );
}

function Field({ id, label, type = "text", value, onChange, error, icon, right, tabIndex }) {
  return (
    <div>
      <div
        className={`group relative rounded-2xl border bg-white transition duration-300 ${
          error
            ? "border-red-400 ring-4 ring-red-100"
            : "border-lila-200 focus-within:border-lila-500 focus-within:ring-4 focus-within:ring-lila-200/60"
        }`}
      >
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lila-400 transition group-focus-within:text-lila-600">
          <Icon d={icons[icon]} />
        </span>

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" "
          tabIndex={tabIndex}
          className="peer w-full rounded-2xl bg-transparent pb-2 pl-12 pr-12 pt-6 text-sm text-lila-900 outline-none"
        />

        <label
          htmlFor={id}
          className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 text-sm text-lila-500 transition-all duration-200 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-lila-600 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold"
        >
          {label}
        </label>

        {right && <div className="absolute right-3 top-1/2 -translate-y-1/2">{right}</div>}
      </div>

      {error && <p className="animate-fade-up mt-1.5 pl-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Check({ checked, onChange, children }) {
  return (
    <label className="flex cursor-pointer select-none items-center gap-2 text-sm text-lila-800/80">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 border-lila-300 bg-white transition peer-checked:border-lila-600 peer-checked:bg-lila-600 peer-focus-visible:ring-4 peer-focus-visible:ring-lila-200 [&>svg]:scale-0 peer-checked:[&>svg]:scale-100">
        <svg
          viewBox="0 0 24 24"
          className="h-3 w-3 text-white transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12.5l4.5 4.5L19 7" />
        </svg>
      </span>
      {children}
    </label>
  );
}

function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 48 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 2.4 + Math.random() * 2,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      round: Math.random() > 0.5,
    }))
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className={`absolute top-0 block h-3.5 w-2 ${p.round ? "rounded-full" : "rounded-sm"}`}
          style={{
            left: `${p.left}%`,
            background: p.color,
            animation: `confetti ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
    </div>
  );
}

/* ───────────── Panel visual (izquierda) ───────────── */

function AuthVisual() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % phrases.length), 4000);
    return () => clearInterval(t);
  }, []);

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    });
  };

  const layer = (f) => ({
    transform: `translate(${pos.x * f}px, ${pos.y * f}px)`,
    transition: "transform 0.25s ease-out",
  });

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className="animate-gradient relative hidden overflow-hidden bg-gradient-to-br from-lila-900 via-lila-700 to-lila-800 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between"
    >
      {/* Luces de fondo */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-lila-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-lila-300/20 blur-3xl" />

      {/* Puntos decorativos */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Destellos */}
      {sparkles.map((s, idx) => (
        <span
          key={idx}
          className="animate-twinkle absolute text-lila-200"
          style={{ top: s.top, left: s.left, animationDelay: s.d }}
        >
          <Star size={s.s} />
        </span>
      ))}

      {/* Logo */}
      <Link to="/" className="relative z-10 flex items-center gap-3 p-10">
        <LogoMark dark />
        <span className="text-xl font-bold">BecaHub</span>
      </Link>

      {/* Escena central */}
      <div className="relative z-10 mx-auto h-[26rem] w-full max-w-lg">
        {/* Halo y anillos */}
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lila-300/20 blur-2xl" />
        <div className="animate-spin-slow absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/20" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />

        {/* Tarjeta de beca (centro) */}
        <div style={layer(12)} className="absolute left-1/2 top-1/2 w-64 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-float rounded-3xl bg-white p-5 text-lila-900 shadow-2xl shadow-lila-900/40">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lila-100 text-lila-600">
                <Icon d={icons.cap} className="h-6 w-6" />
              </span>
              <div className="space-y-1.5">
                <div className="h-3 w-28 rounded-full bg-lila-800/80" />
                <div className="h-2 w-20 rounded-full bg-lila-200" />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-lila-100 px-3 py-1 text-[11px] font-semibold text-lila-700">
                Pregrado
              </span>
              <span className="rounded-full bg-lila-100 px-3 py-1 text-[11px] font-semibold text-lila-700">
                Cobertura total
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-2 w-full rounded-full bg-lila-100" />
              <div className="h-2 w-5/6 rounded-full bg-lila-100" />
              <div className="h-2 w-2/3 rounded-full bg-lila-100" />
            </div>

            <div className="mt-5 rounded-xl bg-gradient-to-r from-lila-600 to-lila-700 py-2.5 text-center text-xs font-semibold text-white">
              Ver detalles
            </div>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div style={layer(34)} className="absolute left-0 top-6">
          <div className="animate-float flex items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-xs font-semibold text-lila-700 shadow-xl shadow-lila-900/30">
            <Icon d={icons.search} className="h-4 w-4" />
            Buscar becas
          </div>
        </div>

        {/* Marcador guardado */}
        <div style={layer(-30)} className="absolute right-2 top-12">
          <div
            className="animate-float grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-white ring-1 ring-white/30 backdrop-blur"
            style={{ animationDelay: "1.5s" }}
          >
            <Icon d={icons.bookmark} className="h-5 w-5" />
          </div>
        </div>

        {/* Perfil completo */}
        <div style={layer(-38)} className="absolute bottom-6 right-0">
          <div
            className="animate-float flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3 ring-1 ring-white/25 backdrop-blur"
            style={{ animationDelay: "3s" }}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-400 text-white">
              <Icon d={icons.check} className="h-4 w-4" strokeWidth={3} />
            </span>
            <div>
              <p className="text-xs font-semibold">Perfil completo</p>
              <p className="text-[11px] text-lila-100">Listo para aplicar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Frase rotativa */}
      <div className="relative z-10 p-10">
        <p key={i} className="animate-fade-up max-w-md text-3xl font-bold leading-tight">
          {phrases[i]}
        </p>
        <div className="mt-5 flex gap-2">
          {phrases.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === i ? "w-8 bg-white" : "w-3 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Pantalla de éxito ───────────── */

function Success({ name, mode }) {
  return (
    <div className="animate-fade-up text-center">
      <Confetti />
      <div className="animate-pop mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-lila-500 to-lila-700 shadow-xl shadow-lila-300">
        <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path className="animate-draw" d="M5 12.5l4.5 4.5L19 7" />
        </svg>
      </div>
      <h2 className="mt-6 text-3xl font-bold text-lila-800">
        {mode === "register" ? `¡Bienvenido, ${name}!` : `¡Qué bueno verte, ${name}!`}
      </h2>
      <p className="mx-auto mt-2 max-w-xs text-lila-800/70">
        {mode === "register"
          ? "Tu cuenta está lista. Ahora sí, a buscar esa beca."
          : "Todo listo. Tus oportunidades te estaban esperando."}
      </p>
      <div className="mt-8 flex flex-col gap-3">
        <Link
          to="/becas"
          className="rounded-2xl bg-gradient-to-r from-lila-600 to-lila-700 px-6 py-3.5 font-semibold text-white shadow-lg shadow-lila-300 transition hover:-translate-y-0.5"
        >
          Explorar becas
        </Link>
        <Link to="/" className="text-sm font-medium text-lila-600 transition hover:text-lila-800">
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}



export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", remember: true, terms: false });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [shake, setShake] = useState(false);

  const isRegister = mode === "register";
  const strength = useMemo(() => getStrength(form.password), [form.password]);

  const update = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const switchMode = (m) => {
    setMode(m);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    // Aún no autenticamos: pasamos directo al Dashboard
    setTimeout(() => navigate("/dashboard"), 900);
  };


  const displayName = form.name.trim().split(" ")[0] || form.email.split("@")[0];

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthVisual />

      <div className="relative flex min-h-screen flex-col bg-lila-50">
        {/* Decoración suave */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-lila-200/60 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-lila-300/40 blur-3xl" />
        </div>

        {/* Barra superior */}
        <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10">
          <Link to="/" className="flex items-center gap-2.5 font-bold text-lila-800 lg:invisible">
            <LogoMark />
            BecaHub
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-lila-700 transition hover:bg-lila-100 hover:text-lila-800"
          >
            <Icon d={icons.back} className="h-4 w-4" />
            Volver al inicio
          </Link>
        </header>

        {/* Contenido */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-6 pb-10">
          <div className="w-full max-w-md">
            {status === "success" ? (
              <Success name={displayName} mode={mode} />
            ) : (
              <>
                <div
                  className={`rounded-[2rem] bg-white/90 p-8 shadow-2xl shadow-lila-200 ring-1 ring-lila-100 backdrop-blur ${
                    shake ? "animate-shake" : ""
                  }`}
                >
                  {/* Selector Entrar / Crear cuenta */}
                  <div className="relative grid grid-cols-2 rounded-2xl bg-lila-100 p-1">
                    <span
                      className={`absolute bottom-1 left-1 top-1 w-[calc(50%-0.25rem)] rounded-xl bg-white shadow-md transition-transform duration-300 ease-out ${
                        isRegister ? "translate-x-full" : "translate-x-0"
                      }`}
                    />
                    {[
                      { id: "login", label: "Entrar" },
                      { id: "register", label: "Crear cuenta" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => switchMode(t.id)}
                        className={`relative z-10 py-2.5 text-sm font-semibold transition ${
                          mode === t.id ? "text-lila-700" : "text-lila-500 hover:text-lila-700"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {/* Título */}
                  <div key={mode} className="animate-fade-up mt-7 text-center">
                    <h1 className="text-3xl font-bold text-lila-800">
                      {isRegister ? "Crea tu cuenta" : "Bienvenido de vuelta"}
                    </h1>
                    <p className="mt-1.5 text-sm text-lila-800/70">
                      {isRegister
                        ? "Empieza a descubrir becas hechas para ti"
                        : "Inicia sesión para continuar"}
                    </p>
                  </div>

                  {/* Redes sociales */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {socials.map((s) => (
                      <button
                        key={s.name}
                        type="button"
                        aria-label={`Continuar con ${s.name}`}
                        className="flex items-center justify-center gap-2 rounded-2xl border border-lila-200 bg-white py-3 text-lila-700 transition duration-300 hover:-translate-y-1 hover:border-lila-400 hover:bg-lila-600 hover:text-white hover:shadow-lg hover:shadow-lila-200"
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                          <path d={s.path} />
                        </svg>
                        <span className="hidden text-xs font-semibold sm:inline">{s.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Divisor */}
                  <div className="my-6 flex items-center gap-3 text-xs text-lila-500">
                    <span className="h-px flex-1 bg-lila-200" />
                    o con tu correo
                    <span className="h-px flex-1 bg-lila-200" />
                  </div>

                  {/* Formulario */}
                  <form onSubmit={handleSubmit} noValidate>
                    {/* Nombre (solo registro) */}
                    <div
                      className={`grid transition-all duration-500 ${
                        isRegister ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="pb-4">
                          <Field
                            id="name"
                            label="Tu nombre"
                            icon="user"
                            value={form.name}
                            onChange={update("name")}
                            error={errors.name}
                            tabIndex={isRegister ? 0 : -1}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Field
                        id="email"
                        label="Correo electrónico"
                        type="email"
                        icon="mail"
                        value={form.email}
                        onChange={update("email")}
                        error={errors.email}
                      />

                      <Field
                        id="password"
                        label="Contraseña"
                        type={show ? "text" : "password"}
                        icon="lock"
                        value={form.password}
                        onChange={update("password")}
                        error={errors.password}
                        right={
                          <button
                            type="button"
                            onClick={() => setShow(!show)}
                            aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
                            className="grid h-9 w-9 place-items-center rounded-xl text-lila-500 transition hover:bg-lila-100 hover:text-lila-700"
                          >
                            <Icon d={show ? icons.eyeOff : icons.eye} />
                          </button>
                        }
                      />
                    </div>

                    {/* Extras según el modo */}
                    <div className="mt-4">
                      {isRegister ? (
                        <div key="extras-register" className="animate-fade-up space-y-3">
                          {form.password && (
                            <div>
                              <div className="flex gap-1.5">
                                {[1, 2, 3, 4].map((n) => (
                                  <span
                                    key={n}
                                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                                      strength >= n ? strengthInfo[strength].bar : "bg-lila-100"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className={`mt-1.5 text-xs font-medium ${strengthInfo[strength].text}`}>
                                Seguridad: {strengthInfo[strength].label}
                              </p>
                            </div>
                          )}

                          <Check checked={form.terms} onChange={update("terms")}>
                            <span>
                              Acepto los{" "}
                              <Link to="/terminos" className="font-semibold text-lila-600 transition hover:text-lila-800">
                                Términos y condiciones
                              </Link>{" "}
                              y la{" "}
                              <Link to="/privacidad" className="font-semibold text-lila-600 transition hover:text-lila-800">
                                Política de privacidad
                              </Link>
                            </span>
                          </Check>
                          {errors.terms && (
                            <p className="animate-fade-up pl-1 text-xs text-red-500">{errors.terms}</p>
                          )}
                        </div>
                      ) : (
                        <div key="extras-login" className="animate-fade-up flex items-center justify-between">
                          <Check checked={form.remember} onChange={update("remember")}>
                            Recordarme
                          </Check>
                          <a href="#" className="text-sm font-medium text-lila-600 transition hover:text-lila-800">
                            ¿Olvidaste tu contraseña?
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Botón principal */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-lila-600 via-lila-500 to-lila-700 py-4 font-semibold text-white shadow-lg shadow-lila-300 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:scale-[0.98] disabled:opacity-80"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      {status === "loading" ? (
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      ) : (
                        <>
                          <span className="relative">{isRegister ? "Crear mi cuenta" : "Iniciar sesión"}</span>
                          <Icon d={icons.arrow} className="relative h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Cambio de modo */}
                  <p className="mt-6 text-center text-sm text-lila-800/70">
                    {isRegister ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
                    <button
                      type="button"
                      onClick={() => switchMode(isRegister ? "login" : "register")}
                      className="font-semibold text-lila-600 transition hover:text-lila-800"
                    >
                      {isRegister ? "Inicia sesión" : "Regístrate aquí"}
                    </button>
                  </p>
                </div>

                <p className="mt-6 text-center text-xs text-lila-500">
                  <Link to="/terminos" className="transition hover:text-lila-700">
                    Términos y condiciones
                  </Link>
                  <span className="mx-2">·</span>
                  <Link to="/privacidad" className="transition hover:text-lila-700">
                    Política de privacidad
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}