import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Goods extends BaseSchema {
  protected tableName = 'goods'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('name', 15).notNullable()
      table.string('description', 255).notNullable()
      table.string('image', 255).notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.integer('inventory').notNullable()
      table.boolean('deleted')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
