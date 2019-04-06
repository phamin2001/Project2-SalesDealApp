const express   =   require('express');
const router    =   express.Router();
const percent      =   require('../models/percent');
const Brand     =   require('../models/brand');

const brandsTitles = [
    {name: 'Nike'     , percent: '23%' ,  category: 'sport'       },
    {name: 'Gap'      , percent: '5%'  ,  category: 'clothes'     },
    {name: 'Starbucks', percent: '15%' ,  category: 'coffee'      },
    {name: 'Subway'   , percent: '20%' ,  category: 'coffee'      },
    {name: 'Lacost'   , percent: '30%' ,  category: 'food'        },
    {name: 'Target'   , percent: '18%' ,  category: 'clothes'     },
    {name: 'Apple'    , percent: '25%' ,  category: 'clothes'     },
    {name: 'Samsung'  , percent: '30%' ,  category: 'technology'  },
    {name: 'Toyota'   , percent: '32%' ,  category: 'auto'        },
    {name: 'H&M'      , percent: '45%' ,  category: 'clothes'     },
    {name: 'Ikea'     , percent: '16%' ,  category: 'home'        },
    {name: 'Laws'     , percent: '32%' ,  category: 'utility'     },
    {name: 'Zara'     , percent: '12%' ,  category: 'clothes'     },
    {name: 'Budweiser', percent: '21%' ,  category: 'beer'        },
    {name: 'Canon'    , percent: '16%' ,  category: 'Camera'      },
    {name: 'Gucci'    , percent: '30%' ,  category: 'fashion'     },
    {name: 'Adidas'   , percent: '22%' ,  category: 'sport'       },
    {name: 'Lego'     , percent: '54%' ,  category: 'game'        },
    {name: 'KFC'      , percent: '20%' ,  category: 'food'        },
    {name: 'Lenovo'   , percent: '12%' ,  category: 'computer'    }
]

module.exports = router;