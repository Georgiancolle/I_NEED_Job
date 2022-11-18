const express=require('express')
const router=express.Router()
const passport=require('passport')
const User=require('../models/user')

// Get: /auth/register =>show register form 
router.get('/register',(req,res)=>{
    res.render('auth/register', {
        title: 'User registeration'
    })
})

//post: /auth/register =>create new user and redirect to /employers
router.post('/register',(req,res)=>{
    User.register(new User({username:req.body.username}), req.body.password,(err,user)=>{
        if(err){
            console.log(err)
        }
        else{
            req.login(user,(err)=>{
                res.redirect('/employers')
            })
        }
    })
})

// Get: /auth/login =>show login form 
router.get('/login',(req,res)=>{
    let messages=req.session.messages ||[]

    //clear the session errror messages
    req.session.messages=[]
    res.render('auth/login', {
        title: 'Login'
    })
})

//post: /auth/login
router.post('/login',passport.authenticate('local',{
    successRedirect:'/employers',
    failureRedirect: '/auth/login',
    failureMessage: 'Invalid Login'
}))

//get logout
router.get('/logout',(req,res,next)=>{
    req.session.messages=[]
    req.logout((err)=>
{
    if(err){
        return next(err)
    }
    res.redirect('/auth/login')
})
})
module.exports=router