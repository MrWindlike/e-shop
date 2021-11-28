import { DateTime } from 'luxon'
import { belongsTo, BelongsTo, BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Good from './Good'
import Order from './Order'

export default class OrderInfo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public price: number

  @column()
  public count: number

  @column()
  public status: number

  @column()
  public goodId: number

  @belongsTo(() => Good, { foreignKey: 'goodId', localKey: 'id' })
  public good: BelongsTo<typeof Good>

  @column()
  public orderId: number

  @belongsTo(() => Order, { foreignKey: 'orderId', localKey: 'id' })
  public order: BelongsTo<typeof Order>
}
