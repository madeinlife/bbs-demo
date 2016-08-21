var express = require('express');
var router = express.Router();

router.get('/',(req,res) => {
    res.render('index');
});

router.get('/api',(req,res) => {
    res.send('this is api ok');
});

module.exports = router;
