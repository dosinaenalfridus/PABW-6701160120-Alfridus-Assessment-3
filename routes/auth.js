const express = require('express')
const passport = require('passport')
const mogngoose = require ('mongoose')
const User = require('../models/User')
const router = express.Router()


//@desc Auth with Google
//@router   GET /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile'] }))

//@desc Google Auth Callback
//@router   GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect:'/'}), async (req, res) => {
    
    //const user = await User.find({ hasRole : "public"})
        //res.redirect('/dashboard_user')
    //const admin = await User.find({ hasRole : "admin"})
        res.redirect('/userbrain/registrasi')
           
    }
) 

//desc Logout user
//router /auth/logout

router.get('/logout', (req, res) =>{
    req.logOut()
    res.redirect('/')
})
module.exports = router;