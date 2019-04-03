const express   =   require('express');
const router    =   express.Router();
const bcrypt    =   require('bcryptjs');
const User      =   require('../models/user');

// login
router.get('/login', async (req, res) => {
    try {
        res.render('auths/login.ejs');
    } catch (err) {
        console.log(err);
        res.send(err);    
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        const foundUser = await User.findOne({'username': req.body.username});
        if(foundUser) {
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.message     =   '';
                req.session.username    =   foundUser.username;
                req.session.userId      =   foundUser._id;
                req.session.logged      =   true;
                res.redirect(`/users/${foundUser._id}`);
            } else {
                console.log('Password is wrong');
                // req.session.message = 'Password is wrong';
                req.flash('loginError', 'Password is wrong');
                res.redirect('/');
            }
        } else {
            // req.session.message = 'User not found';
            req.flash('loginError', 'User not found');
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// create
router.get('/create', async (req, res) => {
    try {
        res.render('auths/create.ejs', {
            createMessage: req.flash('createError')
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// logout
router.get('/logout', (req, res) => {
   req.session.destroy((err) => {
       if(err) {
           res.send(err);
       }
       res.redirect('/');
   })
});



module.exports = router;