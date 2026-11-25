import { Link } from "react-router";

export default function NotFound() {
  return (
    <section className="grid min-h-screen place-items-center bg-lila-50 px-6 text-center">
      <div>
        <p className="text-8xl font-bold text-lila-300">404</p>
        <h1 className="mt-4 text-3xl font-bold text-lila-800">Esta página no existe</h1>
        <p className="mt-2 text-lila-800/70">
          Puede que el enlace esté roto o que la página se haya movido.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-lila-600 px-8 py-3 font-semibold text-white shadow-lg shadow-lila-300 transition hover:-translate-y-0.5 hover:bg-lila-700"
        >
          ← Volver al inicio
        </Link>
      </div>
    </section>
  );
}