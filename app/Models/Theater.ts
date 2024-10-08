import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Projector from './Projector';


export default class Theater extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public location:string;

  @column()
  public capacity:number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Projector, {
    foreignKey: 'theater_id' //nombre de la clase foranea de la otra clase
  })
  public projector: HasOne<typeof Projector>
}
