import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";

/*

   {
     user: { name, role, avatarUrl? },
     unreadMessages: 3,
     notifications: [{ id, title, text, read }],
     mentors:   [{ id, name, role, avatarUrl? }],
     webinars:  [{ id, date: "2026-05-22", time: "13:00", title, tag }],
     events:    [{ id, date: "2026-05-18", time: "19:30", title, type: "doc"|"video"|"dot" }],
     applications: [{
       id, title, subtitle, status: "review"|"approved"|"new",
       statusLabel, currentPhase, totalPhases, progress, imageUrl?
     }],
     metrics: {
       eligibility: 85,
       documents: { done: 9, total: 10 },
       gpa: 9.5, gpaMax: 10
     }
   }
  */

const DASHBOARD_URL = "/api/dashboard";


function buildDemoData() {
  const now = new Date();
  const y = now.getFullYear();
  const mo = String(now.getMonth() + 1).padStart(2, "0");
  const day = (d) => `${y}-${mo}-${String(d).padStart(2, "0")}`;


  let stored = null;
  try {
    stored = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
   
  }

  return {
    demo: true,
    user: {
      name: stored?.name || stored?.nombre || "Nuevo Becario",
      role: stored?.role || "Becario Activo",
      avatarUrl: stored?.avatarUrl || null,
    },
    unreadMessages: 3,
    notifications: [
      { id: 1, title: "Documento Verificado:", text: "Tu Carta de Recomendación fue aprobada." },
      { id: 2, title: "Recordatorio de Webinar:", text: "Beca Santander empieza mañana." },
    ],
    mentors: [
      { id: 1, name: "Dra. Olivia Miller", role: "Asesora STEM & Fulbright" },
      { id: 2, name: "Lic. Liam García", role: "Revisor de Cartas de Motivo" },
      { id: 3, name: "Ing. Jackson López", role: "Tutor de Proyectos Tec" },
    ],
    webinars: [
      { id: 1, date: day(22), time: "13:00", title: "Sesión de Dudas: Beca Santander", tag: "En Vivo" },
      { id: 2, date: day(28), time: "17:00", title: "Taller: Ensayo Personal de Éxito", tag: "Zoom" },
    ],
    events: [
      { id: 1, date: day(Math.max(now.getDate(), 1)), time: "19:30", title: "Entrega: Ensayos Beca STEM", type: "doc" },
      { id: 2, date: day(22), time: "13:00", title: "Sesión de Dudas: Beca Santander", type: "video" },
      { id: 3, date: day(28), time: "17:00", title: "Taller: Ensayo Personal de Éxito", type: "dot" },
    ],
    applications: [
      {
        id: 1, title: "Beca de Excelencia Robótica", subtitle: "Fundación Tec Global • Posgrado",
        status: "review", statusLabel: "En Revisión", currentPhase: 3, totalPhases: 4, progress: 75,
      },
      {
        id: 2, title: "Intercambio Internacional Alemania", subtitle: "Programa DAAD • Semestre 2027",
        status: "approved", statusLabel: "Doc. Aprobados", currentPhase: 4, totalPhases: 4, progress: 90,
      },
    ],
    metrics: { eligibility: 85, documents: { done: 9, total: 10 }, gpa: 9.5, gpaMax: 10 },
  };
}

function useDashboardData() {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();
    fetch(DASHBOARD_URL, {
      credentials: "include",
      signal: controller.signal,
      headers: { Accept: "application/json" },
    })
      .then((r) => {
        const isJson = (r.headers.get("content-type") || "").includes("application/json");
        if (!r.ok || !isJson) throw new Error(`Respuesta inválida (${r.status})`);
        return r.json();
      })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.warn("[Dashboard] Backend no disponible, usando datos de demostración:", error.message);
        setState({ data: buildDemoData(), loading: false, error: null });
      });
    return () => controller.abort();
  }, []);

  return state;
}



const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "grid" },
  { id: "becas", label: "Mis Becas", icon: "award" },
  { id: "convocatorias", label: "Convocatorias", icon: "globe" },
  { id: "calendario", label: "Calendario", icon: "calendar" },
  { id: "mensajes", label: "Mensajes", icon: "chat" },
  { id: "ajustes", label: "Ajustes", icon: "sliders" },
];

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const monthShort = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const statusStyles = {
  review: { badge: "bg-amber-500", bar: "bg-purple-600", text: "text-purple-700" },
  approved: { badge: "bg-emerald-500", bar: "bg-emerald-500", text: "text-emerald-600" },
  new: { badge: "bg-purple-500", bar: "bg-purple-400", text: "text-purple-700" },
};

const eventAccents = [
  { border: "border-purple-600", label: "text-purple-600", icon: "text-purple-400" },
  { border: "border-indigo-500", label: "text-indigo-600", icon: "text-indigo-400" },
  { border: "border-purple-400", label: "text-purple-500", icon: "text-purple-300" },
];



const parseISO = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return { y, m: m - 1, d };
};
const keyOf = (y, m, d) => `${y}-${m}-${d}`;
const initialsOf = (name = "") =>
  name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("") || "?";
const firstNameOf = (name = "") => name.trim().split(" ")[0] || "";
const pct = (n) => Math.max(0, Math.min(100, Math.round(n)));



const icons = {
  grid: "M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z",
  award: "M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M8.5 13.5L7 21l5-3 5 3-1.5-7.5",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M3 12h18 M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z",
  calendar: "M4 6h16v14H4z M4 10h16 M8 3v4 M16 3v4",
  chat: "M4 5h16v11H9l-5 4z",
  sliders: "M4 7h10 M18 7h2 M4 17h2 M10 17h10 M16 5v4 M8 15v4",
  logout: "M9 4H5v16h4 M16 8l4 4-4 4 M20 12H9",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M20 20l-4-4",
  bell: "M6 17v-6a6 6 0 0 1 12 0v6l2 2H4z M10 21h4",
  megaphone: "M4 10v4h3l8 4V6L7 10z M18 9c1 1 1 5 0 6",
  doc: "M7 3h7l4 4v14H7z M14 3v4h4 M12 17v-6 M9.5 13.5L12 11l2.5 2.5",
  video: "M3 7h12v10H3z M15 11l6-3v8l-6-3",
  left: "M15 6l-6 6 6 6",
  right: "M9 6l6 6-6 6",
  close: "M6 6l12 12 M18 6L6 18",
  plus: "M12 5v14 M5 12h14",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7v5l3 2",
  cap: "M2 9l10-5 10 5-10 5z M6 11v5c3 2 9 2 12 0v-5",
};

function Icon({ name, className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={icons[name]} />
    </svg>
  );
}



const softCard =
  "rounded-3xl border border-white/60 bg-white/85 p-5 backdrop-blur shadow-[0_10px_25px_-5px_rgba(118,93,160,0.08),0_8px_10px_-6px_rgba(118,93,160,0.05)]";

function Avatar({ name, src, size = "h-10 w-10", ring = "", online = false }) {
  return (
    <span className="relative inline-block shrink-0">
      {src ? (
        <img src={src} alt={name} className={`rounded-full object-cover ${size} ${ring}`} />
      ) : (
        <span
          className={`grid place-items-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-xs font-bold text-white ${size} ${ring}`}
        >
          {initialsOf(name)}
        </span>
      )}
      {online && (
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
      )}
    </span>
  );
}

function Ring({ value, color, label }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setV(pct(value)), 150);
    return () => clearTimeout(t);
  }, [value]);

  const r = 38;
  const c = 2 * Math.PI * r;

  return (
    <div className="relative mx-auto my-1 grid h-28 w-28 place-items-center">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="8" className="stroke-purple-900/40" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * v) / 100}
          className={color}
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <span className="absolute text-2xl font-extrabold text-white">{label}</span>
    </div>
  );
}

function Modal({ title, onClose, children, actions }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between border-b pb-3">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} aria-label="Cerrar" className="text-gray-400 hover:text-gray-600">
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>
        <div className="mb-6 text-sm text-gray-600">{children}</div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-200"
          >
            Cerrar
          </button>
          {actions}
        </div>
      </div>
    </div>
  );
}

function EmptyNote({ children, className = "" }) {
  return <p className={`rounded-2xl bg-purple-50 p-4 text-xs text-purple-700/70 ${className}`}>{children}</p>;
}

function Logo() {
  return (
    <div className="flex items-center gap-3 px-2 py-1">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-xl font-bold text-white shadow-md shadow-purple-400/30">
        B
      </span>
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-purple-950">
          BecaHub<span className="text-indigo-500">.</span>
        </h1>
        <p className="text-xs font-medium text-purple-400">Plataforma de Becas</p>
      </div>
    </div>
  );
}



function Sidebar({ user, tab, onNavigate, unreadMessages }) {
  return (
    <aside className="relative z-20 hidden w-64 shrink-0 flex-col justify-between border-r border-purple-100/40 bg-[#ebe6f2] p-5 md:flex md:h-screen md:sticky md:top-0">
      <div>
        <div className="mb-6">
          <Logo />
        </div>

        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/60 p-3 shadow-sm">
          <Avatar name={user.name} src={user.avatarUrl} size="h-11 w-11" ring="ring-2 ring-purple-300" online />
          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold text-gray-800">{user.name}</h2>
            {user.role && (
              <p className="flex items-center gap-1 text-[11px] font-medium text-purple-600">
                <Icon name="cap" className="h-3 w-3" /> {user.role}
              </p>
            )}
          </div>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                  active
                    ? "bg-white font-bold text-[#6b5299] shadow-[0_4px_12px_rgba(138,116,180,0.12)]"
                    : "text-purple-800 hover:bg-white/50"
                }`}
              >
                <Icon name={item.icon} className="h-5 w-5" />
                <span>{item.label}</span>
                {item.id === "mensajes" && unreadMessages > 0 && (
                  <span className="ml-auto rounded-full bg-purple-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    {unreadMessages}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-purple-200/50 pt-4">
        <Link
          to="/"
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
        >
          <Icon name="logout" className="h-5 w-5" />
          Cerrar sesión
        </Link>
      </div>
    </aside>
  );
}

function MobileNav({ tab, onNavigate }) {
  return (
    <div className="border-b border-purple-100 bg-[#ebe6f2] px-4 py-4 md:hidden">
      <div className="flex items-center justify-between">
        <Logo />
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50"
        >
          <Icon name="logout" className="h-4 w-4" />
          Salir
        </Link>
      </div>
      <ul className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {navItems.map((item) => (
          <li key={item.id} className="shrink-0">
            <button
              onClick={() => onNavigate(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === item.id ? "bg-purple-600 text-white" : "bg-white/70 text-purple-800"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MentorsCard({ mentors, onChat }) {
  return (
    <section className={`${softCard} flex flex-col justify-between`}>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-800">Mentores / Asesores</h3>
          <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
            {mentors.length} Asignados
          </span>
        </div>

        <ul className="space-y-3">
          {mentors.length === 0 && <EmptyNote>Aún no tienes mentores asignados.</EmptyNote>}
          {mentors.map((m) => (
            <li key={m.id} className="flex items-center justify-between rounded-xl p-2 transition hover:bg-purple-50/50">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar name={m.name} src={m.avatarUrl} />
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-gray-800">{m.name}</p>
                  <p className="truncate text-[11px] text-purple-500">{m.role}</p>
                </div>
              </div>
              <button
                onClick={() => onChat(m)}
                aria-label={`Escribir a ${m.name}`}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-purple-100 text-purple-700 transition hover:bg-purple-600 hover:text-white"
              >
                <Icon name="chat" className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WebinarsCard({ webinars }) {
  const accents = ["bg-purple-600", "bg-indigo-500"];
  const tagStyles = ["bg-emerald-100 text-emerald-700", "bg-indigo-100 text-indigo-700"];

  return (
    <section className={`${softCard} flex flex-col justify-between`}>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-800">Próximos Webinars / Cierres</h3>
          <Icon name="megaphone" className="h-4 w-4 text-purple-400" />
        </div>

        <ul className="space-y-3">
          {webinars.length === 0 && <EmptyNote>No hay webinars ni cierres próximos.</EmptyNote>}
          {webinars.map((w, i) => {
            const { d, m } = parseISO(w.date);
            return (
              <li key={w.id} className="flex items-center gap-3 rounded-xl border border-purple-100/60 bg-purple-50/60 p-2">
                <span
                  className={`flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl text-xs font-bold text-white ${accents[i % accents.length]}`}
                >
                  <span>{d}</span>
                  <span className="text-[9px] font-normal uppercase tracking-wider">{monthShort[m]}</span>
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-gray-800">{w.title}</p>
                  <p className="mt-0.5 flex items-center gap-2 text-[11px] text-purple-500">
                    <span className="flex items-center gap-1">
                      <Icon name="clock" className="h-3 w-3" /> {w.time} hrs
                    </span>
                    {w.tag && (
                      <span className={`rounded px-1.5 font-bold ${tagStyles[i % tagStyles.length]}`}>{w.tag}</span>
                    )}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function CalendarCard({ events }) {
  const today = new Date();
  const [cal, setCal] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [sel, setSel] = useState(null);

  const byDay = useMemo(() => {
    const map = {};
    events.forEach((e) => {
      const { y, m, d } = parseISO(e.date);
      (map[keyOf(y, m, d)] ||= []).push(e);
    });
    return map;
  }, [events]);

  const move = (delta) => {
    setSel(null);
    setCal(({ y, m }) => {
      const d = new Date(y, m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  };

  const cells = useMemo(() => {
    const offset = (new Date(cal.y, cal.m, 1).getDay() + 6) % 7;
    const total = new Date(cal.y, cal.m + 1, 0).getDate();
    const prevTotal = new Date(cal.y, cal.m, 0).getDate();
    const list = [];
    for (let i = offset - 1; i >= 0; i--) list.push({ d: prevTotal - i, other: true });
    for (let d = 1; d <= total; d++) list.push({ d, other: false });
    let n = 1;
    while (list.length % 7 !== 0) list.push({ d: n++, other: true });
    return list;
  }, [cal]);

  const monthEvents = useMemo(() => {
    const total = new Date(cal.y, cal.m + 1, 0).getDate();
    const out = [];
    for (let d = 1; d <= total; d++) {
      (byDay[keyOf(cal.y, cal.m, d)] || [])
        .slice()
        .sort((a, b) => a.time.localeCompare(b.time))
        .forEach((e) => out.push({ ...e, day: d }));
    }
    return sel === null ? out : out.filter((e) => e.day === sel);
  }, [byDay, cal, sel]);

  const isToday = (d) =>
    d === today.getDate() && cal.m === today.getMonth() && cal.y === today.getFullYear();

  return (
    <section className={softCard}>
      <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h3 className="text-base font-bold text-gray-800">Mi Calendario de Entregas</h3>
        <span className="w-fit rounded-full bg-purple-100/60 px-3 py-1 text-xs font-semibold text-purple-500">
          {monthNames[cal.m]} {cal.y}
        </span>
      </div>

      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
        <div className="rounded-2xl border border-purple-100 bg-white/70 p-4 md:col-span-7">
          <div className="mb-3 flex items-center justify-between">
            <button
              onClick={() => move(-1)}
              aria-label="Mes anterior"
              className="p-1 text-purple-400 hover:text-purple-700"
            >
              <Icon name="left" className="h-4 w-4" />
            </button>
            <span className="text-xs font-bold text-purple-900">
              {monthNames[cal.m]} {cal.y}
            </span>
            <button
              onClick={() => move(1)}
              aria-label="Mes siguiente"
              className="p-1 text-purple-400 hover:text-purple-700"
            >
              <Icon name="right" className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-purple-400">
            {weekDays.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-600">
            {cells.map((c, i) => {
              if (c.other) {
                return (
                  <span key={i} className="p-1.5 text-gray-300">
                    {c.d}
                  </span>
                );
              }
              const has = !!byDay[keyOf(cal.y, cal.m, c.d)];
              const picked = sel === c.d;
              return (
                <button
                  key={i}
                  onClick={() => setSel(picked ? null : c.d)}
                  className={`rounded-lg p-1.5 transition ${
                    picked
                      ? "bg-purple-900 font-bold text-white ring-2 ring-purple-300"
                      : has
                      ? "bg-purple-600 font-bold text-white shadow-sm hover:bg-purple-700"
                      : isToday(c.d)
                      ? "font-bold text-purple-700 ring-1 ring-purple-300"
                      : "hover:bg-purple-50"
                  }`}
                >
                  {c.d}
                </button>
              );
            })}
          </div>
        </div>

        <ul className="max-h-64 space-y-2.5 overflow-y-auto pr-1 md:col-span-5">
          {monthEvents.length === 0 && (
            <EmptyNote>{sel === null ? "No hay entregas ni eventos este mes." : "No hay eventos en esta fecha."}</EmptyNote>
          )}
          {monthEvents.map((e, i) => {
            const a = eventAccents[i % eventAccents.length];
            return (
              <li
                key={e.id ?? `${e.date}-${e.time}-${i}`}
                className={`flex items-center justify-between rounded-xl border-l-4 bg-white/80 p-3 shadow-sm ${a.border}`}
              >
                <div className="min-w-0">
                  <span className={`text-[10px] font-bold uppercase ${a.label}`}>
                    Día {e.day} - {e.time}
                  </span>
                  <p className="text-xs font-bold text-gray-800">{e.title}</p>
                </div>
                {e.type === "dot" || !icons[e.type] ? (
                  <span className={`h-3 w-3 shrink-0 rounded-full bg-current ${a.icon}`} />
                ) : (
                  <Icon name={e.type} className={`h-4 w-4 shrink-0 ${a.icon}`} />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ApplicationsCard({ applications, onNew }) {
  return (
    <section className={softCard}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-base font-bold text-gray-800">Mis Postulaciones Activas</h3>
        <button
          onClick={onNew}
          className="flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-purple-700"
        >
          <Icon name="plus" className="h-3 w-3" /> Nueva Postulación
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {applications.length === 0 && (
          <EmptyNote className="sm:col-span-2">
            Aún no tienes postulaciones activas. Crea la primera con “Nueva Postulación”.
          </EmptyNote>
        )}
        {applications.map((a) => {
          const s = statusStyles[a.status] || statusStyles.new;
          const progress = pct(a.progress ?? (a.currentPhase / a.totalPhases) * 100);
          return (
            <article
              key={a.id}
              className="group rounded-2xl border border-purple-100 bg-white/90 p-3.5 shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative mb-3 h-32 overflow-hidden rounded-xl bg-gradient-to-br from-purple-700 to-indigo-400">
                {a.imageUrl && (
                  <img
                    src={a.imageUrl}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <span
                  className={`absolute right-2 top-2 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white shadow ${s.badge}`}
                >
                  {a.statusLabel}
                </span>
              </div>
              <h4 className="text-sm font-bold text-gray-800">{a.title}</h4>
              <p className="mb-2 text-xs text-purple-500">{a.subtitle}</p>
              <div className="mb-1 h-2 w-full overflow-hidden rounded-full bg-purple-100">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${s.bar}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-medium text-gray-500">
                <span>
                  Fase {a.currentPhase} de {a.totalPhases}
                </span>
                <span className={`font-bold ${s.text}`}>{progress}% Completado</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function MetricsPanel({ metrics, onReport }) {
  const eligibility = pct(metrics.eligibility ?? 0);
  const docs = metrics.documents ?? { done: 0, total: 0 };
  const docsPct = docs.total ? pct((docs.done / docs.total) * 100) : 0;
  const gpaMax = metrics.gpaMax ?? 10;
  const gpa = metrics.gpa ?? 0;
  const gpaPct = pct((gpa / gpaMax) * 100);

  const items = [
    {
      title: "Elegibilidad de Perfil",
      value: eligibility,
      label: `${eligibility}%`,
      color: "stroke-rose-400",
      note: "Qué tan apto es tu perfil para las becas disponibles.",
    },
    {
      title: "Documentos Cargados",
      value: docsPct,
      label: `${docsPct}%`,
      color: "stroke-teal-300",
      note: `${docs.done} de ${docs.total} requisitos adjuntos correctamente.`,
    },
    {
      title: "Promedio / Rating",
      value: gpaPct,
      label: Number(gpa).toFixed(1),
      color: "stroke-amber-300",
      note: `Promedio ponderado sobre ${gpaMax}.`,
    },
  ];

  return (
    <aside className="flex flex-col gap-6 rounded-3xl bg-[#81729f] p-6 text-white shadow-[0_12px_28px_-5px_rgba(103,80,140,0.25)] lg:col-span-4">
      <div className="border-b border-purple-300/30 pb-3">
        <h3 className="text-lg font-extrabold">Métricas de Postulante</h3>
        <p className="text-xs text-purple-200">Resumen integral de cumplimiento</p>
      </div>

      {items.map((it) => (
        <div
          key={it.title}
          className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur-sm"
        >
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-purple-200">{it.title}</h4>
          <Ring value={it.value} color={it.color} label={it.label} />
          <p className="mt-1 text-[11px] text-purple-100">{it.note}</p>
        </div>
      ))}

      <button
        onClick={onReport}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/20 py-3 text-xs font-bold text-white transition-all hover:bg-white/30"
      >
        <span>Ver informe completo</span>
        <Icon name="arrow" className="h-4 w-4" />
      </button>
    </aside>
  );
}

function Placeholder({ item, onBack }) {
  return (
    <section className={`${softCard} mt-6 py-16 text-center`}>
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-purple-100 text-purple-600">
        <Icon name={item.icon} className="h-8 w-8" />
      </span>
      <h2 className="mt-5 text-2xl font-bold text-gray-800">{item.label}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">Esta sección estará disponible muy pronto.</p>
      <button
        onClick={onBack}
        className="mt-6 rounded-full bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-300/50 transition hover:bg-purple-700"
      >
        Volver al Dashboard
      </button>
    </section>
  );
}

/* ───────────── Página ───────────── */

export default function Dashboard() {
  const navigate = useNavigate();
  const { data, loading, error } = useDashboardData();

  const [tab, setTab] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null); // { type, mentor? }
  const [readIds, setReadIds] = useState([]);

  if (loading) {
    return (
      <div className="grid h-screen place-items-center bg-[#f3f0f7] text-sm font-medium text-purple-600">
        Cargando tu panel…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="grid h-screen place-items-center bg-[#f3f0f7] p-6 text-center">
        <div>
          <p className="text-lg font-bold text-gray-800">No pudimos cargar tu panel</p>
          <p className="mt-1 text-sm text-gray-500">Revisa tu conexión e inténtalo de nuevo.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-5 rounded-full bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const {
    user,
    unreadMessages = 0,
    notifications = [],
    mentors = [],
    webinars = [],
    events = [],
    applications = [],
    metrics = {},
  } = data;

  const q = query.trim().toLowerCase();
  const shownMentors = mentors.filter((m) => `${m.name} ${m.role}`.toLowerCase().includes(q));
  const shownApps = applications.filter((a) => `${a.title} ${a.subtitle}`.toLowerCase().includes(q));
  const hasUnread = notifications.some((n) => !n.read && !readIds.includes(n.id));
  const currentItem = navItems.find((n) => n.id === tab);

  const closeModal = () => setModal(null);
  const markAllRead = () => {
    setReadIds(notifications.map((n) => n.id));
    closeModal();
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f3f0f7] font-['Plus_Jakarta_Sans',sans-serif] text-[#4a4556] antialiased md:flex-row">
      <Sidebar user={user} tab={tab} onNavigate={setTab} unreadMessages={unreadMessages} />
      <MobileNav tab={tab} onNavigate={setTab} />

      <main className="min-w-0 flex-1 p-4 md:p-8">
        {/* Encabezado */}
        <header className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl font-extrabold uppercase tracking-tight text-gray-800 md:text-3xl">
              ¡Hola, {firstNameOf(user.name)}! <span className="inline-block animate-bounce">👋</span>
            </h1>
            <p className="text-xs font-medium text-purple-600/80 md:text-sm">
              Revisa el estado de tus becas e hitos de postulaciones de hoy.
            </p>
          </div>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <label className="relative w-full sm:w-64">
              <Icon
                name="search"
                className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar becas, tutores..."
                className="w-full rounded-full border border-purple-200/70 bg-white/80 py-2 pl-10 pr-4 text-sm text-gray-800 outline-none transition-all placeholder:text-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-400"
              />
            </label>

            <button
              onClick={() => setModal({ type: "notifs" })}
              aria-label="Notificaciones"
              className="relative shrink-0 rounded-full border border-purple-200/70 bg-white/80 p-2.5 text-purple-700 shadow-sm transition-all hover:bg-white"
            >
              <Icon name="bell" className="h-5 w-5" />
              {hasUnread && (
                <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>
          </div>
        </header>

        {tab !== "dashboard" ? (
          <Placeholder item={currentItem} onBack={() => setTab("dashboard")} />
        ) : (
          <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <MentorsCard mentors={shownMentors} onChat={(mentor) => setModal({ type: "chat", mentor })} />
                <WebinarsCard webinars={webinars} />
              </div>
              <CalendarCard events={events} />
              <ApplicationsCard applications={shownApps} onNew={() => navigate("/convocatorias")} />
            </div>

            <MetricsPanel metrics={metrics} onReport={() => setModal({ type: "report" })} />
          </div>
        )}
      </main>

      {/* Modales */}
      {modal?.type === "notifs" && (
        <Modal
          title="Notificaciones Recientes"
          onClose={closeModal}
          actions={
            <button
              onClick={markAllRead}
              className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-purple-700"
            >
              Entendido
            </button>
          }
        >
          <ul className="space-y-3">
            {notifications.length === 0 && <EmptyNote>No tienes notificaciones nuevas.</EmptyNote>}
            {notifications.map((n) => (
              <li key={n.id} className="rounded-xl bg-purple-50 p-2.5 text-xs">
                <strong className="text-purple-900">{n.title}</strong> {n.text}
              </li>
            ))}
          </ul>
        </Modal>
      )}

      {modal?.type === "chat" && (
        <Modal
          title={`Mensaje con ${modal.mentor.name}`}
          onClose={closeModal}
          actions={
            <button
              onClick={closeModal /* TODO: enviar mensaje al backend */}
              className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-purple-700"
            >
              Enviar
            </button>
          }
        >
          <p className="mb-3">
            Canal de asesoría en <strong>BecaHub</strong> con <strong>{modal.mentor.name}</strong>.
          </p>
          <textarea
            rows={4}
            placeholder="Escribe tu consulta sobre la beca o documentos..."
            className="w-full rounded-xl border border-purple-200 p-3 text-xs outline-none focus:ring-2 focus:ring-purple-500"
          />
        </Modal>
      )}

      {modal?.type === "report" && (
        <Modal title="Informe Completo del Perfil" onClose={closeModal}>
          <div className="space-y-2 text-xs">
            <p>
              <strong>Elegibilidad de perfil:</strong> {pct(metrics.eligibility ?? 0)}%
            </p>
            <p>
              <strong>Documentos cargados:</strong> {metrics.documents?.done ?? 0} de{" "}
              {metrics.documents?.total ?? 0}
            </p>
            <p>
              <strong>Promedio:</strong> {metrics.gpa ?? "—"} / {metrics.gpaMax ?? 10}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}