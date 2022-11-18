const express = require('express')
const router = express.Router()
const Employer = require('../models/employer')
const Region = require('../models/region')
const passport=require('passport')
//auth check
function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/auth/login')
}

// GET: /employers => show all employers
router.get('/', (req, res) => {
    Employer.find((err, employers) => {
        if (err) {
            console.log(err);
        } 
        else {
            res.render('employers/index', {
                title: 'Employers', 
                employers: employers,
                user: req.user
            })
        }
    })
})

// GET: /employers/create => display blank form
router.get('/create',isAuthenticated, (req, res) => {
    // get regions for Form dropdown
    Region.find((err, regions) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('employers/create', { 
                title: 'Add Employer',
                regions: regions,
                user: req.user
                
            })
        }
    }).sort('name')   
})

// POST: /employers/create => save new employer doc from form body
router.post('/create',isAuthenticated, (req, res) => {
    Employer.create(req.body, (err, newEmployer) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/employers')
        }
    })
})

// GET: /employers/delete/abc123 => remove selected Employer document
router.get('/delete/:_id',isAuthenticated, (req, res) => {
    Employer.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/employers')
        }
    })
})

// GET: /employers/edit/abc123 => display populated form for editing
router.get('/edit/:_id',isAuthenticated,(req, res) => {
    // get regions for Form dropdown
    Region.find((err, regions) => {
        if (err) {
            console.log(err)
        }
        else {
            // fetch selected Employer for display
            Employer.findById(req.params._id, (err, employer) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.render('employers/edit', { 
                        title: 'Employer Details',
                        regions: regions,
                        employer: employer,
                        user: req.user
                    })
                }
            })           
        }
    }).sort('name')   
})


//post :/ employers/edit/abc123 => update the db for the selected doc
router.post('/edit/:_id',isAuthenticated,(req,res)=>{
    Employer.findByIdAndUpdate({_id: req.params._id}, req.body,null, (err, employer)=>{
        if(err){
            console.lof(err)
        }
        else{
            res.redirect('/employers')
        }
    })
})

module.exports = router