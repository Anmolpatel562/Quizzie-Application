const express = require('express');
const routes = express.Router();
const {signUpUser, userlogIn, isUserValid} = require('../controllers/User');


routes.post('/signUpUser',signUpUser);
routes.post('/userlogIn',userlogIn);
routes.post('/isUserValid',isUserValid);

module.exports = routes;
