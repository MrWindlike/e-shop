import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Addresses extends BaseSchema {
  protected tableName = 'addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('name', 15).notNullable()
      table.string('phone', 15).notNullable()
      table.string('address', 63).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.boolean('deleted')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
