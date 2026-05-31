import Database from 'better-sqlite3'

export default defineEventHandler((event) => {
  const db = new Database('.data/database.sqlite')

  try {

    const services = db.prepare('SELECT * FROM services ORDER BY id DESC').all()
    
    return services
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error al obtener la lista de servicios'
    })
  }
})