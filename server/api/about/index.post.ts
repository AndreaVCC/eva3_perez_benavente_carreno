import Database from 'better-sqlite3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = new Database('.data/database.sqlite')
  
  db.prepare('UPDATE about SET content = ? WHERE id = 1').run(body.content)
  
  return { success: true }
})