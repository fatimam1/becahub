import { Routes, Route } from "react-router";
import ScrollToTop from "./components/ScrollToTop";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BecasInfo from "./pages/BecasInfo"; // o "./components/BecasInfo"
import QuienesSomos from "./pages/QuienesSomos";
import Terminos from "./pages/Terminos";
import Privacidad from "./pages/Privacidad";
import Condiciones from "./pages/Condiciones";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/becas-info" element={<BecasInfo />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/condiciones" element={<Condiciones />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}