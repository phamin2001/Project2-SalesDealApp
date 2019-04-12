const express    =   require('express');
const router     =   express.Router();
const Brand      =   require('../models/brand');
const User       =   require('../models/user');
const Deal       =   require('../models/deal');

const brandsTitles = [
    {name: 'Nike'     , category: 'shoes'     },
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
    {name: 'Canon'    , category: 'camera'    },
    {name: 'Gucci'    , category: 'fashion'   },
    {name: 'Adidas'   , category: 'sport'     },
    {name: 'Lego'     , category: 'game'      },
    {name: 'KFC'      , category: 'food'      },
    {name: 'Lenovo'   , category: 'technology'}
]

// new
router.get('/new', async (req, res) => {
    try {
        const foundUser       = await User.findById(req.userId);
        const allBrands       = await Brand.find({});

        res.render('brands/newBrand.ejs', {
            user             :  foundUser,
            allBrands        :  allBrands,
            brandsTitles     :  brandsTitles,
            sessionId        :  req.session.userId,
            newBrandMessage  :  req.flash('newBrandMessage')
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// create
router.post('/', async(req, res) => {
    const brandDbEntry       =  {};
    var flag                 = false;

    try {
        const currentUser   =   await User.findById(req.userId);
        const allBrands     =   await Brand.find({});

        // user select from list which is brandsTitle + allBrands in DB
        if(req.body.brandName !== "Select") {
            const stringArray       =   req.body.brandName.split(',');
            brandDbEntry.name       =   stringArray[0];
            brandDbEntry.category   =   stringArray[1];
        } else {
            brandDbEntry.name        =  req.body.name;
            brandDbEntry.category    =  req.body.category;

            brandsTitles.forEach((brand) => {  
                if(brand.name === brandDbEntry.name && brand.category === brandDbEntry.category) {
                    flag = true;  
                }
            });

            allBrands.forEach((brand) => {
                if(brand.name === brandDbEntry.name && brand.category === brandDbEntry.category) {
                    flag = true;  
                }
            });
        }        

        if(flag) {
            console.log("This brand is already in the List. Check the List!");
            req.flash('newBrandMessage', 'It is already in the list.Chek it.');
            res.redirect(`/users/${req.userId}/brands/new`);
        } else {
            const filterBrandInUserBrands = currentUser.brands.filter((brand) => {
                return (
                    brand.name     ===  brandDbEntry.name &&
                    brand.category ===  brandDbEntry.category
                )
            });

            if(filterBrandInUserBrands.length === 0) {
                const createBrand  = await Brand.create(brandDbEntry);
                currentUser.brands.push(createBrand);
                await currentUser.save();
                res.redirect(`/users/${req.userId}`);
            } else{
                console.log('User has this brand. Create another one or Choose from the list');
                req.flash('newBrandMessage', 'User has this brand, Try Again');
                res.redirect(`/users/${req.userId}/brands/new`);
            }
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
    const brandDbentry     = {}; 
    brandDbentry.name      = req.body.name;
    brandDbentry.category  = req.body.category;

    try {
        const currentUser           =   await User.findById(req.userId);
        const allBrands             =   await Brand.find({});
        const findEditedBrand       =   allBrands.filter((brand) => {
            return(
                brand.name         ==   brandDbentry.name &&
                brand.category     ==   brandDbentry.category
            );
        });
        const findEditedBrandInBrandTitles = brandsTitles.filter((brand) => {
            return(
                brand.name         ==   brandDbentry.name &&
                brand.category     ==   brandDbentry.category
            );
        });

        // editedBrand is not existed in Brand DB or is not in brandsTitles
        // updated the current one in BrandDB and
        // also replace it with the current brand in userBrands
        if(findEditedBrand.length === 0 && findEditedBrandInBrandTitles.length === 0) { 
            const newBrand         = await Brand.create(brandDbentry);
            currentUser.brands.id(req.params.id).remove();
            currentUser.brands.push(newBrand);
            await currentUser.save();
            res.redirect(`/users/${req.userId}/brands/${newBrand._id}`);  
        } else {
            let repeatFlag = false;
            currentUser.brands.forEach((brand) => {
                if(brand.name === brandDbentry.name && brand.category === brandDbentry.category) {
                    repeatFlag = true;
                }
            });

            if(repeatFlag) {
                console.log("User alread has this brand and category");
                req.flash('updateError', 'User alread has this brand and category');
                res.redirect(`/users/${req.userId}/brands/${req.params.id}/edit`);
            } else {
                currentUser.brands.id(req.params.id).remove();
                if(findEditedBrand.length > 1) {
                    currentUser.brands.push(findEditedBrand[0]);
                } else {
                    currentUser.brands.push(findEditedBrandInBrandTitles[0]);
                }
                await currentUser.save();
                res.redirect(`/users/${req.userId}/brands/${findEditedBrand[0]._id}` );  
            }
        }        
    } catch (err) {
        console.log('err');
        res.send(err);        
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        // const deletedBrand  =  await Brand.findByIdAndDelete(req.params.id);
        const foundUser     =  await User.findById(req.userId);
        foundUser.brands.id(req.params.id).remove();
        await foundUser.save();
        res.redirect(`/users/${req.userId}`); 
    } catch (err) {
        console.log(err);
        res.send(err)        
    }
});

module.exports  = router;