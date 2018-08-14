const router = require('express').Router()
const {User, Order, Review, LineItem, Product} = require('../db/models')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
     where: {
       email: req.body.email
     }
    })

    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)

    res.status(201).send()

  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.put('/profile', async(req, res, next) => {
  try {
    const profile = await User.findById(req.body.id)
    const updatedProfile = await profile.update(req.body)
    res.status(202).send(updatedProfile)
  }
  catch (error){
    next(error)
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
