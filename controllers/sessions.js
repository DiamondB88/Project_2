const express = require('express');
const sessions = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');


sessions.get('/new', (req,res) => {
  res.render('users/login.ejs')
})

sessions.post('/', (req, res)=>{
    User.findOne({ username: req.body.username },(err, foundUser) => {
      console.log(req.body.password, foundUser.password);
        if( bcrypt.compareSync(req.body.password, foundUser.password) ){
            req.session.currentUser = foundUser;
            res.redirect('/');
        } else {
            res.send('wrong password');
        }
    });
});


sessions.delete('/', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/sizzle');
    });
})

module.exports = sessions;
