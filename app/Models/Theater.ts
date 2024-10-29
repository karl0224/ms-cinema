import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Projector from './Projector';
import Screening from './Screening';
import Seat from './Seat';


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
    foreignKey: 'theater_id' //nombre de la clave foranea de la otra clase
  })
  public projector: HasOne<typeof Projector>

  //forma de decir la relación de uno a muchos
  @hasMany(() => Screening, {
    foreignKey: 'theater_id' //nombre de la clave foranea de la otra clase
  })
  public screenings: HasMany<typeof Screening> //como se va a llamar esa relación en esta clase

  @hasMany(() => Seat, {
    foreignKey: 'theater_id' //nombre de la clave foranea de la otra clase
  })
  public seats: HasMany<typeof Seat>

}
