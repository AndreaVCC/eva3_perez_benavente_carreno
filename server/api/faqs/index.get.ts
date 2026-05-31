import Database from 'better-sqlite3'
export default defineEventHandler(() => {
  const db = new Database('.data/database.sqlite')
  return db.prepare('SELECT * FROM faqs ORDER BY id ASC').all()
})