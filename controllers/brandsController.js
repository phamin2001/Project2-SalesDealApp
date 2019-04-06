const express    =   require('express');
const router     =   express.Router();
const Brand      =   require('../models/brand');
const User       =   require('../models/user');
const Deal       =   require('../models/deal');

const brandsTitles = [
    {name: 'Nike'     , category: 'sport'     },
    {name: 'Gap'      , category: 'clothes'   },
    {name: 'Starbucks', category: 'coffee'    },
    {name: 'Subway'   , category: 'food'      },
    {name: 'Lacost'   , category: 'clothes'   },
    {name: 'Target'   , category: 'clothes'   },
    {name: 'Apple'    , category: 'technology'},
    {name: 'Samsung'  , category: 'technology'},
    {name: 'Toyota'   , category: 'auto'      },
    {name: 'H&M'      , category: 'clothes'   },
    {name: 'Ikea'     , category: 'home'      },
    {name: 'Laws'     , category: 'utility'   },
    {name: 'Zara'     , category: 'clothes'   },
    {name: 'Budweiser', category: 'beer'      },
    {name: 'Canon'    , category: 'Camera'    },
    {name: 'Gucci'    , category: 'fashion'   },
    {name: 'Adidas'   , category: 'sport'     },
    {name: 'Lego'     , category: 'game'      },
    {name: 'KFC'      , category: 'food'      },
    {name: 'Lenovo'   , category: 'computer'  }
]

// new
router.get('/new', async (req, res) => {
    try {
        const foundUser = await User.findById(req.userId);
        const allBrands = await Brand.find({});

        res.render('brands/newBrand.ejs', {
            user             :  foundUser,
            allBrands        :  allBrands,
            brandsTitles     :  brandsTitles,
            sessionId        : req.session.userId,
            newBrandMessage  : req.flash('newBrandMessage')
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// create
router.post('/', async(req, res) => {
    const brandDbEntry       =  {};

    try {
        if(req.body.brandName !== "Select") {
            brandDbEntry.name         = req.body.brandName;
            const foundBrand          = await Brand.findOne({'name': brandDbEntry.name});
            if(foundBrand) {
                brandDbEntry.category = foundBrand.category;
            } else {
                const brandTitle  = brandsTitles.find( brand => brand.name === brandDbEntry.name);
                brandDbEntry.category = brandTitle.category;
            }
        } else {
            brandDbEntry.name        =  req.body.name;
            brandDbEntry.category    =  req.body.category;
        }
        console.log(brandDbEntry, 'brandDbEntry');

        const existBrand     =  await Brand.findOne({'name': brandDbEntry.name});
        if(!existBrand) {
            brandsTitles.push(brandDbEntry);
            const createBrand  = await Brand.create(brandDbEntry);
            const foundUser    = await User.findById(req.userId);
            foundUser.brands.push(createBrand);
            await foundUser.save();
            res.redirect(`/users/${req.userId}`);
        } else {
            console.log('This brand already exists. Create another one or Choose from and options');
            req.flash('newBrandMessage', 'Brand Alredy Exist, Try Again');
            res.redirect(`/users/${req.userId}/brands/new`);
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// show
router.get('/:id', async (req, res) => {
    if(req.session.userId == req.userId) {
        try {
            const foundUser    =   await User.findById(req.userId);
            const foundBrand   =   await Brand.findById(req.params.id);
            res.render('brands/show.ejs', {
                user          : foundUser,
                brand         : foundBrand,
                userSessionId : req.userId
            });
        } catch (err) {
            console.log(err);
            res.send(err);    
        }
    } else {
        console.log('You are not a right person!');
        req.send('You are not a right person!');
    }
});

// edit
router.get('/:id/edit', async (req, res) => {
    try {
        const foundUser  = await User.findById(req.userId);
        const foundBrand = await Brand.findById(req.params.id);

        res.render('brands/edit.ejs', {
            user           :  foundUser,
            brand          :  foundBrand,
            userSessionId  :  req.userId,
            editMessage    :  req.flash('updateError')
        });
        
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// update
router.put('/:id', async (req, res) => {
    try {
        const currentUser       =   await User.findById(req.userId);
        const currentBrand      =   await Brand.findById(req.params.id);
        const brandNameExists   =   await Brand.findOne({'name': req.body.naem});


        if(!brandNameExists || (currentBrand.name === brandNameExists.name)) {
                const updatedBrand   =   await Brand.findByIdAndUpdate(req.params.id, req.body, {new: true});
                currentUser.brands.forEach((brand) => {
                    if(brand._id == req.params.id) {
                        brand.remove();
                    }
                });
                currentUser.brands.push(updatedBrand);
                await currentUser.save();
                res.redirect(`/users/${req.userId}/brands/${req.params.id}`);
        } else {
            console.log('Brand Name already exists!');
            req.flash('updateError', 'Brand Name alreadyt Exists!');
            res.redirect(`/users/${req.userId}/brands/${req.params.id}/edit`);
        }
    } catch (err) {
        console.log('err');
        res.send(err);        
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
        const foundUser  =  await User.findById(req.userId);

        foundUser.brands.forEach((brand) => {
            if(brand._id == req.params.id) {
                brand.remove();
            }
        });
        await foundUser.save();
        console.log(req.userId, 'userId')
        res.redirect(`/users/${req.userId}`); 
    } catch (err) {
        console.log(err);
        res.send(err)        
    }
});

module.exports  = router;