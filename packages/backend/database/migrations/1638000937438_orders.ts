import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.integer('status').unsigned().notNullable().defaultTo(0)
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.integer('address_id').unsigned().notNullable().references('id').inTable('addresses')
      table.boolean('deleted')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
