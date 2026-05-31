import Database from 'better-sqlite3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = new Database('.data/database.sqlite')

  try {
    const stmt = db.prepare('INSERT INTO categories (name) VALUES (@name)')
    stmt.run({ name: body.name })
    return { success: true }
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Ya existe una categoría con este nombre en la base de datos.'
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Error al guardar la categoría en la base de datos.'
    })
  }
})