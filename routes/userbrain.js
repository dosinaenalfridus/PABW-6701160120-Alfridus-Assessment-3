const express = require('express')
const router = express.Router()
const { ensureAuth} = require('../midlleware/auth')
const Userbrain = require('../models/Userbrain')
const Story = require('../models/Story')  
const User = require('../models/User')
const { request } = require('express')
const { findByIdAndUpdate } = require('../models/Userbrain')



//@desc Show informasi beasiswa
//@router   GET /userbrain/informasi
router.get('/informasi', ensureAuth, async (req, res) => {
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

//@desc Show registrasi form
//@router   GET /userbrain/registrasi  
router.get('/registrasi', (req, res) => {
  res.render('user/registrasi');
})

//@desc kelola registrasi form
//@router   POST /userbrain/registrasi
router.post('/registrasi', ensureAuth, async (req, res) => {
  try {
      req.body.user = req.user.id
      await Userbrain.create(req.body)
      res.render('user/notification');
  } catch (err) {
      console.error(err)
      res.render('error/500')
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

//@desc kelola registrasi form
//@router   POST /userbrain/registrasi
router.get('/notification', async (req, res) => {
  try {
    let notif = await Userbrain.find().lean()
      console.log(notif)
      res.render('user/notification', {
        notif 
      });
  } catch (err) {
      console.error(err)
      res.render('error/500')
  }
})

// @desc    Show single informasi beasiswa
// @route   GET /userbrain/:id
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    let infor = await Userbrain.findById(req.params.id).populate('user').lean()

    if (!infor) {
      return res.render('error/404')
    }

    res.render('views/dashboard_user', {
      infor,
    })
  } catch (err) {
    console.error(err)
    res.render('error/404')
  }
})

//@desc    Delete Informasi registrasi
// @route   DELETE /userbrain/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    let infor = await Userbrain.findById(req.params.id).lean()

    if (!infor) {
      return res.render('error/404')
    }

    if (infor.user != req.user.id) {
      res.redirect('/userbrain')
    } else {
      await Userbrain.remove({ _id: req.params.id })
      res.redirect('/dashboard_user')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    Update informasi registrasi
// @route   PUT /userbrain/:id
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let infor = await Userbrain.findById(req.params.id).lean()

    if (!infor) {
      return res.render('error/404')
    }

    if (infor.user != req.user.id) {
      res.redirect('/userbrain')
    } else {
      infor = await Userbrain.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })

      res.redirect('/dashboard_user')
    }
  } catch (err) {
        console.error(err)
        return res.render('error/500')
  }
})

//@desc Show edit page
//@router   GET /userbrain/edit
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const infor = await Userbrain.findOne({
      _id: req.params.id,
    }).lean()

    if (!infor) {
      return res.render('error/404')
    }

    if (infor.user != req.user.id) {
      res.redirect('/userbrain')
    } else {
      res.render('user/edit', {
        infor,
      })
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})


module.exports = router;