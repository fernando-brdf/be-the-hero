
exports.up = function(knex) {   //criação de tabela
    return knex.schema.createTable('ongs',function(table){
        table.string('id').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('cidade').notNullable();
        table.string('uf',2).notNullable();
    });
};

exports.down = function(knex) {     //desfazendo tabela
    return knex.schema.dropTables('ongs');
};
