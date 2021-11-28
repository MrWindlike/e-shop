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
      table.integer('price').notNullable().defaultTo(0)
      table.integer('count').unsigned().notNullable().defaultTo(0)
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
