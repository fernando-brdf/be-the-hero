const crypto = require('crypto');
const connection = require('../database/conection');

module.exports = {

    async create (request,response){
        
        const {nome,email,whatsapp,cidade,uf} = request.body;
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('ongs').insert({   //await aguarda código terminar quando for async
            id,nome,email,whatsapp,cidade,uf 
        });
    
        return response.json({id});
    },

    async index(request,response) {

        const ongs = await connection('ongs').select('*');
        return response.json(ongs);

    }

}