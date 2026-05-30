import Database from "better-sqlite3";

export default defineEventHandler(() => {
  const db = new Database(".data/database.sqlite");
  const about = db.prepare("SELECT content FROM about LIMIT 1").get() as {
    content: string;
  };
  return about || { content: "Contenido pendiente de actualización..." };
});
