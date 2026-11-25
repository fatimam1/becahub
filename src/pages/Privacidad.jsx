import LegalPage from "../components/LegalPage";

const NOMBRES =
  "**Carlos Roman Chavez Gutierrez**, **Hanna Paloma Holguin**, **Fatima Medrano Terrazas** y **Brenda Lara Escarcega**";

const sections = [
  {
    id: "responsables",
    title: "1. Responsables del tratamiento",
    blocks: [
      {
        type: "p",
        text: `Los Administradores de **BecaHub** son ${NOMBRES}, con domicilio establecido en las instalaciones del **CBTis 122**, en Chihuahua, Chihuahua, México. Ellos son los responsables del tratamiento de los datos personales que se recaban a través del Sitio Web.`,
      },
    ],
  },
  {
    id: "datos",
    title: "2. Datos que recabamos",
    blocks: [
      {
        type: "p",
        text: "Para que el sistema de recomendación de becas funcione, el Usuario puede proporcionar la siguiente información en los formularios de perfilamiento o registro:",
      },
      {
        type: "list",
        items: [
          "Datos de cuenta: nombre, correo electrónico y contraseña.",
          "Datos académicos: nivel educativo y promedio.",
          "Ubicación.",
          "Situación socioeconómica.",
          "Datos de navegación: fecha y hora de acceso, páginas visitadas, dirección IP y frecuencia de visitas.",
        ],
      },
    ],
  },
  {
    id: "finalidades",
    title: "3. Para qué usamos tus datos",
    blocks: [
      {
        type: "list",
        items: [
          "Filtrar y recomendar becas acordes a tu perfil.",
          "Generar un perfil de compatibilidad con las convocatorias.",
          "Permitirte guardar becas favoritas y recibir alertas de convocatorias.",
          "Administrar tu cuenta y mejorar el rendimiento de BecaHub.",
        ],
      },
    ],
  },
  {
    id: "proteccion",
    title: "4. Protección de datos personales",
    blocks: [
      {
        type: "p",
        text: "De conformidad con lo establecido en la **Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)**, el Administrador se compromete a adoptar las medidas necesarias a su alcance para asegurar la privacidad de los datos personales recabados (incluyendo los datos académicos o socioeconómicos ingresados para filtrar becas), garantizando su seguridad y evitando su alteración, pérdida o tratamiento no autorizado.",
      },
      {
        type: "p",
        text: "Todo dato personal recabado a través de **BecaHub** será tratado bajo los principios de licitud, calidad, finalidad, lealtad y responsabilidad, quedando sujeto al consentimiento de su titular. Cuando el Usuario ingrese datos personales sensibles o socioeconómicos para calcular su compatibilidad con determinadas becas, dicha información será tratada con la mayor diligencia y utilizada únicamente para los fines previstos en el Aviso de Privacidad.",
      },
    ],
  },
  {
    id: "cookies",
    title: "5. Uso de cookies",
    blocks: [
      {
        type: "p",
        text: "El acceso al Sitio Web puede implicar la utilización de *cookies* (pequeñas cantidades de información almacenadas en el navegador del Usuario) para facilitar la navegación, recordar filtros de búsqueda y analizar métricas de interacción (fecha y hora de acceso, páginas visitadas, dirección IP, frecuencia de visitas). Esta información se utiliza de forma anónima para mejorar el rendimiento de **BecaHub**. El Usuario puede deshabilitar o eliminar las *cookies* en cualquier momento desde la configuración de su navegador, aunque hacerlo podría limitar algunas funciones personalizadas del Sitio Web.",
      },
    ],
  },
  {
    id: "derechos",
    title: "6. Tus derechos",
    blocks: [
      {
        type: "p",
        text: "Como titular de tus datos personales, puedes **acceder** a ellos, **rectificarlos** si son inexactos, solicitar su **cancelación** u **oponerte** a su uso (derechos ARCO), así como retirar tu consentimiento. Para ejercer cualquiera de estos derechos, comunícate con nosotros por los medios que aparecen en el apartado de contacto.",
      },
    ],
  },
  {
    id: "menores",
    title: "7. Menores de edad",
    blocks: [
      {
        type: "p",
        text: "El Sitio Web se encuentra dirigido a toda persona interesada en oportunidades educativas, sin importar su edad. En caso de menores de edad, se recomienda la supervisión de sus padres o tutores.",
      },
    ],
  },
  {
    id: "cambios",
    title: "8. Cambios a esta política",
    blocks: [
      {
        type: "p",
        text: "El Administrador se reserva el derecho a modificar su Política de Privacidad de acuerdo con sus necesidades o derivado de cambios en la legislación. El uso del Sitio Web después de dichos cambios implicará su aceptación.",
      },
    ],
  },
  {
    id: "contacto",
    title: "9. Contacto",
    blocks: [
      {
        type: "p",
        text: "Para dudas sobre el tratamiento de tus datos personales o para ejercer tus derechos, puedes comunicarte con el Administrador a través de los siguientes medios:",
      },
      {
        type: "contact",
        items: [
          {
            label: "Correo electrónico",
            value: "carloschzroman@gmail.com",
            href: "mailto:carloschzroman@gmail.com",
          },
          { label: "Teléfono", value: "614 395 3384", href: "tel:+526143953384" },
        ],
      },
    ],
  },
];

export default function Privacidad() {
  return (
    <LegalPage
      title="Política de privacidad"
      subtitle="Qué datos recabamos, para qué los usamos y cómo los protegemos."
      sections={sections}
    />
  );
}