const express    =   require('express');
const router     =   express.Router();
const Brande     =   require('../models/brand');
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
        const allBrands = await Brande.find({});

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
    // console.log(req.body.brandName, 'brandName');
    // check if selected brand OR created brand
    // has already in the user.Brands array

    const brandDbEntry       =  {};

    try {
        if(req.body.brandName !== "Select") {
            brandDbEntry.name         = req.body.brandName;
            const foundBrand          = await Brande.findOne({'name': brandDbEntry.name});
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

        const existBrand     =  await Brande.findOne({'name': brandDbEntry.name});
        if(!existBrand) {
            brandsTitles.push(brandDbEntry);
            const createBrand  = await Brande.create(brandDbEntry);
            const foundUser    = await User.findById(req.userId);
            foundUser.brands.push(createBrand);
            await foundUser.save();
            res.redirect(`/users/${req.userId}`);
        } else {
            console.log('This brand already exists. Create another one or Choose from and options');
            req.flash('newBrandMessage', 'Brand Alredy Exist, Try Again');
            res.redirect('/brands/new');
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

module.exports  = router;