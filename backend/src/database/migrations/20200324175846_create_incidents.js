
exports.up = function(knex) {
    return knex.schema.createTable('incidents',function(table){
        table.increments(); //incremento automatico da primary key

        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.decimal('valor').notNullable();

        table.string('ong_id').notNullable();   //relacionamento
        table.foreign('ong_id').references('id').inTable('ongs');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTables('incidents');
};
