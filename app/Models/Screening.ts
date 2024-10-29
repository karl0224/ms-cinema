import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Movie from './Movie'
import Theater from './Theater'

export default class Screening extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date:DateTime

  @column()
  public movie_id:number

  @column()
  public theater_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Para referenciar a las otras clases
  @belongsTo(() => Movie, {
    foreignKey: 'movie_id' //nombre de la clase foranea de la otra clase
  })
  public movie: BelongsTo<typeof Movie>

  @belongsTo(() => Theater, {
    foreignKey: 'theater_id' //nombre de la clase foranea de la otra clase
  })
  public theater: BelongsTo<typeof Theater>

}
