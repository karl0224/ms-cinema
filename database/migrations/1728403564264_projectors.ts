import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'projectors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("brand")
      table.integer("high")
      table.integer("width")
      //clave foranea 
      table.integer("theater_id").unsigned().references('theaters.id')//.onDelete('CASCADE') Este se hace solo cuando tenenemos una agregacion fuerte, ya que si eliminamos el teatro debemos saber que hacemos con el proyector y asi no deja esliminar el teatro, si esta en cascada, se elimina de una.

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
