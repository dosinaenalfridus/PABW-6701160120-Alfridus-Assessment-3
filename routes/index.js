const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest} = require('../midlleware/auth')
const Story = require('../models/Story')
const Saw = require('../models/Saw')
const Userbrain = require('../models/Userbrain')
const unwind = require('javascript-unwind');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { distinct } = require('../models/Story')
const { title } = require('process')

//@desc Login/Landing page
//@router   GET /
// router.get('/', ensureGuest, (req, res) =>{
//     res.render('layouts/index',{
//         layout:'index',
//     })
// })
router.get('/', ensureGuest, async (req, res) => {
    try {
      const infor = await Story.find({ status: 'public' }).lean()
      //landing page
      res.render('layouts/index', {
        layout: 'index',
        infor
      })
    } catch (err) {
      console.error(err)
      res.render('error/500')
    }
  })


//@desc Dashboard
//@router   GET /dasboard
router.get('/dashboard_admin', ensureAuth, async (req, res) =>{
    try {
        const stories = await Story.find({user: req.user.id}).lean() 
        res.render('dashboard_admin', {
            name: req.user.firstName,
            stories
        })
    } catch (err) {
        console.error(err)
        res.render('error/500') 
    }
})

//@desc Dashboard
//@router   GET /dasboard_user
router.get('/dashboard_user', ensureAuth, async (req, res) =>{
    try {
        const infor = await Userbrain.find({ user: req.user.id}).lean()
        res.render('dashboard_user', {
            name: req.user.firstName,
            infor
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    } 
})

//@desc Dashboard
//@router   GET /dasboard_user
router.get('/preferensi', async (req, res) =>{
    try {
        const infor = await Saw.find().lean()
        res.render('dashboardpreferensi', {
            infor
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    } 
})

module.exports = router; 