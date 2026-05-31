import Database from 'better-sqlite3'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const db = new Database('.data/database.sqlite')

  try {
    const inUse = db.prepare('SELECT COUNT(*) as count FROM services WHERE category_id = ?').get(id) as { count: number }
    
    if (inUse.count > 0) {
      throw createError({ 
        statusCode: 400, 
        statusMessage: 'La categoría está en uso por servicios y no puede ser eliminada.' 
      })
    }

    db.prepare('DELETE FROM categories WHERE id = ?').run(id)
    return { success: true }
    
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error interno al eliminar la categoría'
    })
  }
})