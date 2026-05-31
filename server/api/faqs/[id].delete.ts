import Database from 'better-sqlite3'
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const db = new Database('.data/database.sqlite')
  db.prepare('DELETE FROM faqs WHERE id = ?').run(id)
  return { success: true }
})