import LegalPage from "../components/LegalPage";

const NOMBRES =
  "**Carlos Roman Chavez Gutierrez**, **Hanna Paloma Holguin**, **Fatima Medrano Terrazas** y **Brenda Lara Escarcega**";

const sections = [
 {
    id: "alcance",
    title: "I. DEL ACCESO, NAVEGACIÓN Y ALCANCE DEL SERVICIO",
    blocks: [
      {
        type: "list",
        items: [
          {
            label: "Naturaleza meramente informativa:",
            text: "**BecaHub** actúa exclusivamente como un intermediario informativo y herramienta de búsqueda. El Administrador **no otorga directamente las becas** ni garantiza que el Usuario sea seleccionado o aprobado por las instituciones públicas o privadas convocantes. Es responsabilidad exclusiva del Usuario verificar los requisitos oficiales y realizar su trámite directamente ante la entidad que emite cada convocatoria.",
          },
          {
            label: "Disponibilidad:",
            text: "El Administrador no garantiza la continuidad y disponibilidad ininterrumpida de los contenidos o servicios del Sitio Web, aunque llevará a cabo las acciones a su alcance para mantener su buen funcionamiento, sin que esto suponga responsabilidad legal para Carlos Roman Chavez Gutierrez, Hanna Paloma Holguin, Fatima Medrano Terrazas y Brenda Lara Escarcega.",
          },
          {
            label: "Exclusión de garantías técnicas:",
            text: "El Administrador no garantiza que el contenido o software al que se acceda a través del Sitio Web se encuentre libre de errores o fallos técnicos, ni se hace responsable de los daños o perjuicios que pudiesen ocasionarse por un uso inadecuado de la plataforma o por la desactualización repentina de alguna convocatoria externa.",
          },
        ],
      },
    ],
  },

  {
    id: "enlaces",
    title: "II. POLÍTICA DE ENLACES",
    blocks: [
      {
        type: "p",
        text: "Dado que el propósito de **BecaHub** es conectar a los Usuarios con convocatorias de diversas instituciones educativas, gubernamentales y fundaciones, el Sitio Web contiene hipervínculos o enlaces que dirigen a páginas web pertenecientes y gestionadas por terceros.",
      },
      {
        type: "p",
        text: "La inclusión de estos enlaces tiene como único objeto facilitar el acceso a las fuentes oficiales de cada beca. El Administrador no controla ni es propietario de dichos sitios externos, por lo cual no asume responsabilidad alguna por la disponibilidad, exactitud, cambios de fechas de último momento, validez o legalidad de los portales externos, ni por el tratamiento de datos personales que dichos terceros realicen una vez que el Usuario abandona **BecaHub**.",
      },
    ],
  },

  {
    id: "legislacion",
    title: "III. LEGISLACIÓN Y JURISDICCIÓN APLICABLE",
    blocks: [
      {
        type: "p",
        text: "El Administrador se reserva la facultad de presentar las acciones civiles, administrativas o penales que considere necesarias por la utilización indebida del Sitio Web, sus contenidos o servicios, o por el incumplimiento de los presentes Términos y Condiciones.",
      },
      {
        type: "p",
        text: `La relación entre el Usuario y ${NOMBRES} se regirá por la legislación vigente en los Estados Unidos Mexicanos, sometiéndose expresamente a la jurisdicción de los tribunales competentes en la ciudad de **Chihuahua, Chihuahua**, renunciando a cualquier otro fuero que pudiera corresponderles por razón de sus domicilios presentes o futuros.`,
      },
    ],
  },
];

export default function Condiciones() {
  return (
    <LegalPage
      title="Condiciones del servicio"
      subtitle="Qué es BecaHub, qué alcance tiene y bajo qué leyes se rige."
      sections={sections}
    />
  );
}