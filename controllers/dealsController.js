const express   =   require('express');
const router    =   express.Router();
const Brand     =   require('../models/brand');
const Deal      =   require('../models/deal');
const User      =   require('../models/user');

const salesArray = [
    {name: 'Nike'     , percent: '23%' ,  category: 'shoes'       },
    {name: 'Gap'      , percent: '5%'  ,  category: 'clothes'     },
    {name: 'Starbucks', percent: '15%' ,  category: 'coffee'      },
    {name: 'Subway'   , percent: '20%' ,  category: 'sandwitchs'  },
    {name: 'Lacost'   , percent: '30%' ,  category: 'clothes'     },
    {name: 'Target'   , percent: '18%' ,  category: 'clothes'     },
    {name: 'Apple'    , percent: '25%' ,  category: 'technology'  },
    {name: 'Samsung'  , percent: '30%' ,  category: 'technology'  },
    {name: 'Toyota'   , percent: '32%' ,  category: 'auto cars'   },
    {name: 'H&M'      , percent: '45%' ,  category: 'clothes'     },
    {name: 'Ikea'     , percent: '16%' ,  category: 'home'        },
    {name: 'Lowes'    , percent: '32%' ,  category:'utility'      },
    {name: 'Zara'     , percent: '12%' ,  category: 'clothes'     },
    {name: 'Budweiser', percent: '21%' ,  category: 'beer'        },
    {name: 'Canon'    , percent: '16%' ,  category: 'camera'      },
    {name: 'Gucci'    , percent: '30%' ,  category: 'fashion'     },
    {name: 'Adidas'   , percent: '22%' ,  category: 'sport'       },
    {name: 'Lego'     , percent: '54%' ,  category: 'game'        },
    {name: 'KFC'      , percent: '20%' ,  category: 'food'        },
    {name: 'Lenovo'   , percent: '12%' ,  category: 'technology'  }
]

// index
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.userId);
        res.render('deals/index.ejs', {
            user          :  currentUser,
            sales         :  salesArray,
            sessionId     :  req.session.userId,
            selectMessage :  req.flash('selectErrorMessage'),
            showUserBrand :  false
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

module.exports = router;