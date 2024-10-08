import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Projector from 'App/Models/Projector';

export default class ProjetorsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theProjector: Projector = await Projector.findOrFail(params.id)
            await theProjector.load("theater")// este es para cuando se carga solo un teatro
            return theProjector;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Projector.query().paginate(page, perPage)
            } else {
                return await Projector.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();//llega todo el contenido
        const theProjector: Projector = await Projector.create(body);
        await theProjector.load("theater")// cuando cree el projector le hago un load para cargar la agregación, tambien lo puedo hacer para visualisar solo un Projector 
        return theProjector;
    }

    public async update({ params, request }: HttpContextContract) {
        const theProjector: Projector = await Projector.findOrFail(params.id);
        const body = request.body();
        theProjector.brand = body.brand;
        theProjector.high = body.high;
        theProjector.width = body.width;
        theProjector.theater_id = body.theater_id;
        return await theProjector.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theProjector: Projector = await Projector.findOrFail(params.id);
            response.status(204);
            return await theProjector.delete();
    }
}
