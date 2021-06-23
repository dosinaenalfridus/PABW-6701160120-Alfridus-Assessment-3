const express = require('express')
const router = express.Router()
const { ensureAuth} = require('../midlleware/auth')
const Userbrain = require('../models/Userbrain')
const Story = require('../models/Story')
const User = require('../models/User')
const Saw = require('../models/Saw')
const { request } = require('express')
const { findByIdAndUpdate } = require('../models/Story')


//@desc Admin index page
//@router   GET /
router.get('/', async (req, res) => {
  try {
    const infor = await Story.find({ status: 'public' }).lean()
    //landing page
    res.render('admin/index', {
      infor
    });
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

//@desc Admin scholarship page
//@router   GET /
router.get('/scholarship', async (req, res) => {
  try {
    const infor = await Story.find().lean()
    //landing page
    res.render('admin/scholarship', {
      infor
    });
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

//@desc Admin rulesofsaw
//@router   GET /admin/add
router.get('/rulesofsaw', async (req, res) => {
  const infor = await Saw.find().lean()
  res.render('admin/rulesofsaw', {
    infor 
  })
})

  // @desc    Admin rulesofsaw edit page
  // @route   GET /admin/edit/:id
  router.get('/editSaw/:id', async (req, res) => {
    try {
      const infor = await Saw.findOne({
        _id: req.params.id,
      }).lean()
  
      if (!infor) {
        return res.render('error/404')
      }
      else {
        res.render('admin/rulesofsawedit', {
          infor,
        })
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })

//@desc Admin Scholarship Result
//@router   GET /
router.get('/scholarshipresult', async (req, res) => {
  try {
    const infor = await Story.find({ status: 'public' }).lean()
    //landing page
    res.render('admin/scholarshipresult', {
      infor
    });
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

//@desc Show add informasi beasiswa page
//@router   GET /admin/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('admin/add')
})

//@desc Process add informasi beasiswa form
//@router   POST /stories
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard_user')
    } catch (error) {
        console.error(err)
        res.render('error/500')
    }
})
// @desc    Show edit page
  // @route   GET /admin/edit/:id
  router.get('/edit/:id', async (req, res) => {
    try {
      const story = await Story.find({
        _id: req.params.id,
      }).lean()
  
      if (!story) {
        return res.render('error/404')
      }
  
      if (story.user != req.user.id) {
        res.redirect('/admin')
      } else {
        res.render('admin/edit', {
          story,
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
      let story = await Story.findById(req.params.id).lean()
  
      if (!story) {
        return res.render('error/404')
      }
  
      if (story.user != req.user.id) {
        res.redirect('/admin')
      } else {
        story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        })
        res.redirect('/dashboard_admin')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })
  
  // @desc    Delete Informasi beasiswa
  // @route   DELETE /admin/:id
  router.delete('/:id', ensureAuth, async (req, res) => {
    try {
      let story = await Story.findById(req.params.id).lean()
  
      if (!story) {
        return res.render('error/404')
      }
  
      if (story.user != req.user.id) {
        res.redirect('/admin')
      } else {
        await Story.remove({ _id: req.params.id })
        res.redirect('/dashboard_admin')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })
// @desc    Show single informasi beasiswa
  // @route   GET /admin/:id
  router.get('/:id', ensureAuth, async (req, res) => {
    try {
      let story = await Story.findById(req.params.id).populate('user').lean()
  
      if (!story) {
        return res.render('error/404')
      }
  
      res.render('admin/index', {
        story,
      })
    } catch (err) {
      console.error(err)
      res.render('error/404')
    }
  })
  
//..........................................//


  
  
module.exports = router;