/**
 * @author  Fabrice Sommavilla <fs@physalix.com>
 * @date    09/09/2019
 */

const express = require('express');
const {players} = require('./controllers');

const routes = express.Router();

routes.get('/players', players.getAll);
routes.get('/players/:id', players.getById);
routes.delete('/players/:id', players.delete);

module.exports = routes;
