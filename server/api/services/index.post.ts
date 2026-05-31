import Database from 'better-sqlite3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = new Database('.data/database.sqlite')

  try {
    const stmt = db.prepare(`
      INSERT INTO services (title, category_id, image, alt, description)
      VALUES (@title, @category_id, @image, @alt, @description)
    `)
    
    stmt.run({
      title: body.title,
      category_id: body.category_id, // Guardamos el ID de la categoría
      image: body.image,
      alt: body.title,
      description: body.description
    })

    return { success: true, message: 'Servicio guardado con éxito' }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error al guardar el servicio en la base de datos'
    })
  }
})