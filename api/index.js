const express = require('express');
const swaggerUi = require('swagger-ui-express');

const config = require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const crypto = require('./components/crypto/network');
const errors = require('../network/errors');
const swaggerDoc = require('./swagger.json');

const app = express();

//Recognize json object
app.use(express.json());

//Recognize url additional parameters
app.use(express.urlencoded({ extended: true }));

//Router
app.use('/api/v1/user', user);
app.use('/api/v1/auth', auth);
app.use('/api/v1/crypto', crypto);

//Swagger Documentation not completed
app.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errors);

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});


module.exports = app;