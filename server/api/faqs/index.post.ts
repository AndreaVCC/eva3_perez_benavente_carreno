import Database from 'better-sqlite3'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = new Database('.data/database.sqlite')
  db.prepare('INSERT INTO faqs (label, content) VALUES (@label, @content)').run(body)
  return { success: true }
})