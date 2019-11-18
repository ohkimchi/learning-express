const express = require('express')
const users = require('../users')
const uuid = require('uuid')
const router = express.Router()

router.get('/api/users', (req, res) => res.json(users))

router.get('/api/users/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id))
  if (found) {
    res.json(users.filter(user => user.id === parseInt(req.params.id)))
  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}`})
  }
})

router.post('/', (req, res) => {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    password: req.body.password,
    status: 'active'
  }

  if (!newUser.name || !newUser.password) {
    return res.status(400).json({ msg: 'Please include a name and password'})
  }

  users.push(newUser)
  res.json(users)
})

router.put('/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id))
  if (found) {
    const updUser = req.body
    users.forEach(user => {
      if (user.id === parseInt(req.params.id)) {
        user.name = updUser.name ? updUser.name: user.name
        user.password = updUser.password ? updUser.password :user.password
        res.json({ msg: 'User updated', user})
      }
    })
  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}`})
  }
})

router.delete('/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id))
  if (found) {
    res.json({
      msg: 'User deleted',
      users: users.filter(user => user.id !== parseInt(req.params.id))})
  } else {
    res.status(400).json({msg: `No user with the id of ${req.params.id}`})
  }
})


module.exports = router
