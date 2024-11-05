import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';
import Env from "@ioc:Adonis/Core/Env" //

export default class Security {

  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) { //recibiendo request:carta lo que trae todos los datos, token, ruta, etc y response:

    let theRequest = request.toJSON() //toda la carta la convierto en JSON, 
    console.log(theRequest);//imprime el contenido de la carta

    if (theRequest.headers.authorization) { //validando que si en la request viene en los headers la autorización(el token)
      let token = theRequest.headers.authorization.replace("Bearer ", "") //mira si esta el token, si ahí viene eso y con la palabra Bearer y quietarla para obtener el token sin esa palabra
      let thePermission: object = {
        url: theRequest.url, //la request con su atributo del token
        method: theRequest.method //donde le pregunto al ms-seguridad si puede entrar
      }
      try { //conexión que hay entre el ms-seguridad y ms-cinema
        const result = await axios.post(`${Env.get('MS_SECURITY')}/api/public/security/permissions-validation`, thePermission, //axios(libreria) que si puede llamar de forma POST a un sitio(elemento externo, API) que valla al servidor de ms-seguirdad
          {                                                                                                                   // donde llamamos el endpoint que tenemos en ms-security, luego llamamos el body de esa petición
            headers: { //que en el encabezado de esa peticón se mandan los headers, mandando los Token
              Authorization: `Bearer ${token}`
            }
          }
        )
        
        console.log("La respuesta de ms-security >" + result.data + "<")
        if (result.data == true) { //si tiene permiso puede ingresar, llamando al endpoint de ms-security
          console.log(result.data)
          await next() //lo deja pasar
        } else { //sino tiene el permiso dado por el endpoint de ms-security
          console.log("no puede ingresar")
          return response.status(401)
        }
      } catch (error) {
        console.error(error)
        return response.status(401)
      }
    }else{
      return response.status(401) 
    }

  }
}
