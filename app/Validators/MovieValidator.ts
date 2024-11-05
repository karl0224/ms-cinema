import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class MovieValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name : schema.string([rules.alphaNum({ //string.nullableAndOptional este es para poner ese campo opcional
      allow: ['space', 'underscore', 'dash']
    }), rules.minLength(2),rules.maxLength(40)]),// esto son validaxiones para que no entre basura al servidor.

    duration : schema.number([rules.range(1,1000)]),
    date : schema.date({
      format: 'yyyy-MM-dd',
    })

  })

  public messages: CustomMessages = {}
}