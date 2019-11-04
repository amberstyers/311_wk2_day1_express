
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
let counter = users.length+1

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
/* BEGIN - create routes here */

app.get('/users', (req,res) => {
  res.jason(users);
})

app.get('/users/:userId', (req, res) => {
  userIdent = req.params.userIdent
  const found = users.some(user => user._id == parseInt(userIdent));
  if(found) {
    res.json(users.filter(user => user._id == parseInt(userIdent)));
  } else {
    res.status(400).json({msg: 'User ${userIdent} not found'})
  }
});

// POST
app.post('/users', (req, res) => {
  const newUser = {
    _id: counter,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar,
  }
  users.push(newUser)
  res.json(users)
  counter = counter + 1
  console.log(users)
})

// PUT
app.put('/users/:userId', (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params.userId))
  if (found) {
    const upUser = req.body
    users.forEach(user => {
      if(user._id === parseInt(req.params.userId)){
        user._id = upUser._id ? upUser._id : user._id
        user.name = upUser.name ? upUser.name : user.name
        user.occupation = upUser.occupation ? upUser.occupation : user.occupation
        user.avatar = upUser.avatar ? upUser.avatar : user.avatar
        res.json ({msg: 'The user ${req.params.userId} updated.'})
      }
    })
  } else {
    res.status(400).json({msg: 'No user with id ${req.params.userId}'})
  }
})

// DELETE
app.delete('/users/:userId', (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params.userId));
  userIndex = parseInt(req.params.userId);
  deletedUserIndex = userIndex -1;
  if(found) {
    users[deletedUserIndex]["isActive"] = false
    res.send('User $(userIndex)deletion success.')
  } else {
    res.status(400).json({msg: 'User ${req.params.userId} not found'})
  }
  console.log(deletedUserIndex)
  console.log(userIndex)
  console.log(users)
})
/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))