var express = require('express');
var userRouter = express.Router();

userRouter.get('/',(req,res) => {
    res.send('user home page');
});
userRouter.get('/sigin',(req,res) => {
    res.render('sigin/sigin');
})

module.exports = userRouter;
