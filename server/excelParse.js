const express = require('express');
const fs = require('fs')
const router = express.Router();

router.post('/', function (req, res) {
    console.log(req);  
})


module.exports = router;