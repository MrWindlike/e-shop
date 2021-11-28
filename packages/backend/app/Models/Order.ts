import { DateTime } from 'luxon'
import Address from './Address'
import User from './User'
import OrderInfo from './OrderInfo'
import { hasMany, HasMany, belongsTo, BelongsTo, BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public addressId: number

  @column()
  public userId: number

  @belongsTo(() => Address, { foreignKey: 'addressId', localKey: 'id' })
  public address: BelongsTo<typeof Address>

  @belongsTo(() => User, { foreignKey: 'userId', localKey: 'id' })
  public user: BelongsTo<typeof User>

  @hasMany(() => OrderInfo, { foreignKey: 'orderId', localKey: 'id' })
  public orderInfos: HasMany<typeof OrderInfo>

  @column()
  public status: string
}
