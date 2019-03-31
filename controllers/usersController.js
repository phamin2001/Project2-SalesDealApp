const express   =   require('express');
const router    =   express.Router();
const User      =   require('../models/user');
const bcrypt    =   require('bcryptjs');

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
            const createdUser   = await User.create(userDbEntry);
            req.session.message = '';
            req.session.userId  = createdUser._id;
            req.session.logged  = true;
            res.redirect(`/users/${req.secure.userId}`);
        } else {
            console.log('User Already Exists, Try Again.');
            req.session.message = 'User Already Exists, Try Again.';
            res.redirect('/auths/create');//where is this go
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

module.exports = router;