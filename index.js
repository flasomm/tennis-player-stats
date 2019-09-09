/**
 * @author  Fabrice Sommavilla <fs@physalix.com>
 * @date    09/09/2019
 */

const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const config = require('config');

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('host', config.host || '0.0.0.0');
app.set('port', config.port || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const routes = require('./routes');

// App uses routes
app.use('/api', routes);

// Error Handler
app.use(errorHandler());
app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
