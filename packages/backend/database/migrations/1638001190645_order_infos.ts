import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrderInfos extends BaseSchema {
  protected tableName = 'order_infos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.decimal('price', 10, 2).notNullable()
      table.integer('count').unsigned().notNullable()
      table.integer('status').notNullable().defaultTo(0)
      table.integer('good_id').unsigned().notNullable().references('id').inTable('goods')
      table.integer('order_id').unsigned().notNullable().references('id').inTable('orders')
      table.boolean('deleted')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
