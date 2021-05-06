const express = require('express')
const router = express.Router()
const { ensureAuth} = require('../midlleware/auth')
const Userbrain = require('../models/Userbrain')
const Story = require('../models/Story')
const User = require('../models/User')
const Saw = require('../models/Saw')
const { request } = require('express')
const { findByIdAndUpdate } = require('../models/Saw')

//@desc Show add informasi beasiswa page
//@router   GET /admin/add
router.get('/add', (req, res) => {
    res.render('admin/saw/addpreferensi')
})

//@desc Show add informasi beasiswa page
//@router   GET /admin/add
router.get('/show', async (req, res) => {
  const infor = await Saw.find().lean()
  res.render('admin/saw/showpreferensi', {
    infor 
  })
})

//@desc Process add informasi beasiswa form
//@router   POST /stories
router.post('/', async (req, res) => {
    try {
        req.body.user = req.user.id
        await Saw.create(req.body)
        res.redirect('admin/saw/showpreferensi')
    } catch (error) {
        console.error(err)
        res.render('error/500')
    }
})

  // @desc    Show edit page
  // @route   GET /admin/edit/:id
  router.get('/edit/:id', async (req, res) => {
    try {
      const infor = await Saw.findOne({
        _id: req.params.id,
      }).lean()
  
      if (!infor) {
        return res.render('error/404')
      }
      else {
        res.render('admin/saw/editpreferensi', {
          infor,
        })
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })
  
   // @desc    Update informasi beasiswa
  // @route   PUT /admin/:id
  router.put('/:id', async (req, res) => {
    try {
      let infor = await Saw.findById(req.params.id).lean()
  
      if (!infor) {
        return res.render('error/404')
      }
      else {
        infor = await Saw.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        })
        res.redirect('show')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })

module.exports = router;