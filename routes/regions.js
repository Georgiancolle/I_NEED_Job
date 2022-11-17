const express = require('express')
const router = express.Router()

// import Region model
const Region = require('../models/region')

// GET: /regions => show list of regions
router.get('/', (req, res) => {
    // query the model to fetch & pass the region data to the view
    Region.find((err, regions) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('regions/index', { 
                title: 'Regions',
                regions: regions
            })
        }
    })  
})

// GET: /regions/create => show blank region form
router.get('/create', (req, res) => {
    res.render('regions/create', { title: 'Add Region'})
})

// POST: /regions/create => process form submission
router.post('/create', (req, res) => {
    // create a new Region document from the fields in the form post
    Region.create(req.body, (err, newRegion) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/regions')
        }
    })
})

// make public
module.exports = router