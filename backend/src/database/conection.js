const knex = require('knex');
const configuration = require('../../knexfile')

const connection = knex(configuration.development); //conexão como desenvolvedor

module.exports = connection;
