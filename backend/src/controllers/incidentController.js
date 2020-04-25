const connection = require('../database/conection');


module.exports = {
    
    async create (request,response){
        const{titulo,descricao,valor} = request.body;
        const ong_id = request.headers.authorization;
        
        const [id] = await connection('incidents').insert({
            titulo,descricao,valor,ong_id
        });

        return response.json({id});
    },

    async index(request,response){
        const { page = 1} = request.query;
        const [count] = await connection('incidents').count(); //ou count()[0];

        const inc = await connection('incidents').
            join('ongs','ongs.id','=','incidents.ong_id').
            limit(5).
            offset((page-1)*5).
            select(['incidents.*','ongs.nome','ongs.email','ongs.whatsapp','ongs.cidade','ongs.uf']);

        response.header('X-Total-Count',count['count(*)']);
        return response.json(inc);
    },

    async delete(request,response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents').where('id',id).select('ong_id').first();

        if(incident.ong_id != ong_id){
            return response.status(401).json({error: 'Operação não autorizada'});
        }

        await connection('incidents').where('id',id).delete();

        return response.status(204).send();
    }

}