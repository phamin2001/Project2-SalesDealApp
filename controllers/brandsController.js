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
    const brandDbEntry       =  {};
    brandDbEntry.namme       =  req.params.name;
    brandDbEntry.category    =  rea.params.category;

    try {
        const existBrand     =  await Brande.findOne({'name': brandDbEntry.name});
        if(!existBrand) {
            const createBrand  = await Brande.create(brandDbEntry);
            // add new brand to user brand
            // redirect to user profile


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