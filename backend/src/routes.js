const express = require('express');
const ongController = require('../src/controllers/ongController');
const incidentController = require('../src/controllers/incidentController');
const profileController = require('../src/controllers/profileController');
const sessionController = require('../src/controllers/sessionController');

const routes = express.Router();


routes.post('/session', sessionController.create);

routes.get('/ongs',ongController.index);
routes.post('/ongs', ongController.create);

routes.get('/incident',incidentController.index);
routes.post('/incident', incidentController.create);
routes.delete('/incident/:id', incidentController.delete);

routes.get('/profile', profileController.index);

module.exports = routes;    //exportando variavel rotas