const express = require('express');
const routes = express.Router();
const {signUpUser, userlogIn} = require('../controllers/User');


routes.post('/signUpUser',signUpUser);
routes.post('/userlogIn',userlogIn);

module.exports = routes;
