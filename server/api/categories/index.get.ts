import Database from 'better-sqlite3'

export default defineEventHandler((event) => {
  const db = new Database('.data/database.sqlite')

  try {
    const categories = db.prepare('SELECT * FROM categories ORDER BY id ASC').all()
    
    return categories
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error al obtener las categorías'
    })
  }
})