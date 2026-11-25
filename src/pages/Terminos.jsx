import LegalPage from "../components/LegalPage";

const NOMBRES =
  "**Carlos Roman Chavez Gutierrez**, **Hanna Paloma Holguin**, **Fatima Medrano Terrazas** y **Brenda Lara Escarcega**";

const intro = [
  `Este contrato describe los términos y condiciones generales aplicables al uso de los contenidos, herramientas, bases de datos y servicios ofrecidos a través de la plataforma digital **BecaHub**, de la cual son Administradores ${NOMBRES}, con domicilio establecido en las instalaciones del **CBTis 122**, en Chihuahua, Chihuahua, México.`,
  "Cualquier persona que desee acceder o hacer uso del Sitio Web o de los servicios que en él se ofrecen, podrá hacerlo sujetándose a los presentes Términos y Condiciones, así como a las políticas y principios incorporados al presente documento. En todo caso, cualquier persona que no acepte los presentes Términos y Condiciones deberá abstenerse de utilizar el Sitio Web y/o los servicios de búsqueda y recomendación que en él se ofrecen.",
];

const sections = [
   {
    id: "objeto",
    title: "I. DEL OBJETO",
    blocks: [
      {
        type: "p",
        text: "El objeto de los presentes Términos y Condiciones es regular el acceso y el uso del Sitio Web **BecaHub**, entendiendo por este la plataforma digital diseñada para brindar orientación, filtrado y vinculación informativa que permita a los estudiantes y aspirantes encontrar la beca académica, socioeconómica, deportiva o cultural más adecuada según su perfil y necesidades específicas, dentro del dominio.",
      },
      {
        type: "p",
        text: "El Administrador se reserva la facultad de modificar en cualquier momento y sin previo aviso la presentación, los contenidos, las convocatorias indexadas, la funcionalidad, los algoritmos de búsqueda y la configuración que pudiera estar contenida en el Sitio Web. En este sentido, el Usuario reconoce y acepta que el Administrador podrá interrumpir, desactivar o cancelar en cualquier momento cualquiera de los elementos que conforman el Sitio Web o el acceso a los mismos.",
      },
      {
        type: "list",
        items: [
          {
            label: "Gratuidad:",
            text: "El acceso y uso del Sitio Web por parte del Usuario tiene carácter libre y gratuito, sin que el Usuario tenga que proporcionar una contraprestación económica para disfrutar de la búsqueda de becas, salvo en lo referente al costo de la conexión a internet suministrada por el proveedor de servicios que hubiere contratado el mismo Usuario.",
          },
          {
            label: "Registro:",
            text: "El acceso a funcionalidades personalizadas (como guardar becas favoritas, recibir alertas de convocatorias o generar un perfil de compatibilidad) podrá realizarse previa suscripción o registro gratuito del Usuario.",
          },
          {
            label: "Público y Territorio:",
            text: "El Sitio Web se encuentra dirigido a toda persona interesada en oportunidades educativas, sin importar su edad (en caso de menores de edad, se recomienda la supervisión de sus padres o tutores). Asimismo, **BecaHub** está dirigido principalmente a Usuarios residentes en la República Mexicana; por lo cual, el Administrador no asegura que el Sitio Web cumpla con la legislación de otros países. Si el Usuario reside en otro país y decide acceder, lo hará bajo su propia responsabilidad.",
          },
        ],
      },
      {
        type: "p",
        text: "Se hace del conocimiento del Usuario que el Administrador podrá gestionar el Sitio Web de manera directa o a través de un tercero, lo cual no modifica en ningún sentido lo establecido en los presentes Términos y Condiciones.",
      },
    ],
  },
  {
    id: "usuario",
    title: "II. DEL USUARIO",
    blocks: [
      {
        type: "p",
        text: "El acceso o utilización del Sitio Web, así como de los formularios de perfilamiento o herramientas habilitadas para interactuar con la plataforma, confiere la condición de **Usuario** de **BecaHub**, quedando sujeto a los presentes Términos y Condiciones y a sus ulteriores modificaciones desde el momento en que accede al Sitio Web. Se recomienda al Usuario revisar periódicamente las actualizaciones de este documento.",
      },
      { type: "p", text: "**Obligaciones y restricciones del Usuario:**" },
      {
        type: "list",
        items: [
          {
            label: "Uso lícito y adecuado:",
            text: "Es responsabilidad del Usuario utilizar el Sitio Web de acuerdo con la forma en la que fue diseñado. Queda estrictamente prohibida la utilización de cualquier tipo de software, *bots* o *scrapers* que automatice la interacción, extracción masiva o descarga de los contenidos y bases de datos de becas proporcionados en **BecaHub**.",
          },
          {
            label: "Veracidad de la información:",
            text: "Para que el sistema de recomendación de becas funcione adecuadamente, el Usuario se compromete a proporcionar información lícita y veraz en los formularios de perfilamiento o registro (tales como nivel educativo, promedio, ubicación o situación socioeconómica).",
          },
          {
            label: "Seguridad de cuenta:",
            text: "En caso de contar con una cuenta registrada, el Usuario notificará de forma inmediata al Administrador acerca de cualquier robo, extravío o acceso no autorizado a su cuenta y/o contraseña para proceder a su cancelación o restablecimiento.",
          },
          {
            label: "Respeto y conducta:",
            text: "El Usuario se abstendrá de realizar cualquier acto que afecte derechos de terceros o perjudique el funcionamiento del Sitio Web. El Administrador se reserva el derecho de retirar cualquier comentario o aportación que vulnere la ley, sea discriminatorio o atente contra el orden público, sin ser responsable de las opiniones vertidas por los Usuarios.",
          },
        ],
      },
      {
        type: "p",
        text: "El solo acceso al Sitio Web o el uso de su buscador de becas no supone el establecimiento de ninguna relación laboral, contractual de representación ni garantía de obtención de beca entre el Administrador y el Usuario.",
      },
    ],
  },
  {
    id: "propiedad",
    title: "III. PROPIEDAD INTELECTUAL E INDUSTRIAL",
    blocks: [
      {
        type: "p",
        text: "Carlos Roman Chavez Gutierrez, Hanna Paloma Holguin, Fatima Medrano Terrazas y Brenda Lara Escarcega, por sí o como parte cesionaria, son titulares de todos los derechos de propiedad intelectual e industrial del Sitio Web **BecaHub**, entendiendo por este su código fuente, algoritmos de filtrado, bases de datos estructuradas, imágenes, logotipos, marcas, combinaciones de colores, interfaces y diseños que lo distinguen. Estos elementos están protegidos por la legislación mexicana en materia de propiedad intelectual e industrial y por los tratados internacionales aplicables.",
      },
      {
        type: "p",
        text: "Queda expresamente prohibida la reproducción, distribución, ingeniería inversa o difusión de los contenidos y estructura del Sitio Web con fines comerciales sin la autorización previa y por escrito del Administrador. El Usuario podrá visualizar, imprimir o almacenar información de las convocatorias exclusivamente para su **uso estrictamente personal y educativo**. Asimismo, el Usuario se abstendrá de vulnerar la seguridad, archivos o bases de datos protegidas del Sitio Web.",
      },
      {
        type: "p",
        text: "En caso de que el Usuario o algún tercero considere que cualquiera de los contenidos del Sitio Web supone una violación a derechos de propiedad intelectual o industrial, deberá comunicarlo inmediatamente al Administrador a través de los siguientes medios de contacto:",
      },
      {
        type: "list",
        items: [
          { label: "Teléfono:", text: "614 395 3384" },
          { label: "Correo electrónico:", text: "carloschzroman@gmail.com" },
        ],
      },
    ],
  },
];

export default function Terminos() {
  return (
    <LegalPage
      title="Términos de uso"
      subtitle="Las reglas para usar BecaHub."
      intro={intro}
      sections={sections}
    />
  );
}