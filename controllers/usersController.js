const express   =   require('express');
const router    =   express.Router();
const User      =   require('../models/user');
const bcrypt    =   require('bcryptjs');

// create
router.post('/create', async (req, res) => {
    const password         =   req.body.password;
    const hashedPassword   =   bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const userDbEntry      =   {};
    userDbEntry.name       =   req.body.name;
    userDbEntry.lastname   =   req.body.lastname;
    userDbEntry.username   =   req.body.username;
    userDbEntry.password   =   hashedPassword;

    try {
        const userExist    =   await User.findOne({'username': userDbEntry.username});
        if(!userExist) {
            req.session.message = '';
            const createdUser   = await User.create(userDbEntry);
            req.session.userId  = createdUser._id;
            req.session.logged  = true;
            res.redirect(`/users/${createdUser._id}`);
        } else {
            console.log('User Already Exists, Try Again.');
            // req.session.message = 'User Already Exists, Try Again.';
            req.flash('createMessage', 'User Already Exists, Try Again.');
            res.redirect('/auths/create');
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// show
router.get('/:id', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id);
        res.render('users/show.ejs', {
            user       : foundUser,
            sessionId  : req.params.id
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// edit
router.get('/:id/edit', async (req, res) => {

    if(req.session.userId == req.params.id) {
        try {
            const foundUser = await User.findById(req.params.id);
            res.render('users/edit.ejs', {
                user           :  foundUser,
                sessionId      :  req.session.userId,
                editMessage    :  req.flash('updateError')
            })
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    } else {
        res.send('Not a right person to do it');
    }
});

// update:
router.put('/:id', async (req, res) => {
    try {
        const currentUser      =   await User.findById(req.params.id);
        const usernameExists   =   await User.findOne({'username': req.body.username});
        
        if(!usernameExists || (currentUser.username === req.body.username)) {
            await User.findByIdAndUpdate(req.params.id, req.body);
            res.redirect(`/users/${req.params.id}`);
        } else {
            console.log('Username already Exists!');
            // req.session.message = 'Username already exists.';
            req.flash('updateError', 'Username already exists.');
            res.redirect(`/users/${req.params.id}/edit`);
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//delete
router.delete('/:id', async (req, res) => {
    if(req.session.userId == req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.redirect('/');
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    } else {
        res.send('Not a right person to do it.');
    }
});

module.exports = router;