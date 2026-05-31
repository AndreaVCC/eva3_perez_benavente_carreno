import Database from 'better-sqlite3'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const db = new Database('.data/database.sqlite')

  try {
    db.prepare('DELETE FROM services WHERE id = ?').run(id)
    return { success: true }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error interno al eliminar el servicio'
    })
  }
})