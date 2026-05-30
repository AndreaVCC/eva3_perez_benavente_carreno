import Database from "better-sqlite3";

export default defineNitroPlugin(() => {
  const db = new Database(".data/database.sqlite");

  // tabla faqs
  db.exec(`
  CREATE TABLE IF NOT EXISTS faqs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL,
    content TEXT NOT NULL
  )
`);

  // tabla Nosotros
  db.exec(`
  CREATE TABLE IF NOT EXISTS about (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL
  )
`);

  // Inicializar Nosotros
  const aboutRow = db.prepare("SELECT COUNT(*) as count FROM about").get() as {
    count: number;
  };
  if (aboutRow.count === 0) {
    const insertAbout = db.prepare(
      "INSERT INTO about (content) VALUES (@content)",
    );
    insertAbout.run({
      content:
        "Centros de Desarrollo de Negocios es un programa de Sercotec que busca impulsar el crecimiento de las mipymes y cooperativas de Chile, a través de un servicio gratuito basado en el acompañamiento, la asesoría técnica especializada, las vinculaciones estratégicas y el fortalecimiento de capacidades empresariales que contribuyan a la sostenibilidad económica de las empresas atendidas. El programa Centros de Desarrollo de Negocios nace de un acuerdo suscrito entre los gobiernos de Chile y Estados Unidos en junio de 2014, con el objetivo de promover el emprendimiento y el crecimiento de las empresas de menor tamaño locales, estrategia inspirada en el modelo de los Small Business Development Centers (SBDC), una red de puntos de atención integral y principal fuente de asesoría técnica para las micro y pequeñas empresas estadounidensas.",
    });
    console.log("Base de datos: Sección 'Nosotros' inicializada");
  }

  // Inicializar FAQs 
  const faqRow = db.prepare("SELECT COUNT(*) as count FROM faqs").get() as {
    count: number;
  };
  if (faqRow.count === 0) {
    const insertFaq = db.prepare(
      "INSERT INTO faqs (label, content) VALUES (@label, @content)",
    );
    insertFaq.run({
      label: "¿Los servicios tienen costo?",
      content: "La mayoría de las asesorías y capacitaciones son gratuitas.",
    });
    insertFaq.run({
      label: "¿Cómo puedo solicitar orientación?",
      content: "Puedes completar el formulario de contacto.",
    });
    insertFaq.run({
      label: "¿Qué tipo de empresas pueden participar?",
      content: "Micro, pequeñas y medianas empresas.",
    });
    insertFaq.run({
      label: "¿Dónde se ubica el centro?",
      content: "Manuel Rodríguez Sur 749, Santiago.",
    });
  }
});
