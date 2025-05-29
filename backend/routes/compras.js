const express = require('express');
const router = express.Router();
const { Compras } = require('../models');


router.get('/', async (req, res)=> res.json(await Compras.FindALL())); 


module.exports = router;