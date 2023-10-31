// Create web server application

// Import modules
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Comment = require('./models/comment')
const app = express()

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Use body-parser middleware
app.use(bodyParser.json())

// Get all comments
app.get('/comments', async (req, res) => {
  const comments = await Comment.find()
  res.send(comments)
})

// Get a comment by ID
app.get('/comments/:id', async (req, res) => {
  const comment = await Comment.findById(req.params.id)
  res.send(comment)
})

// Create a new comment
app.post('/comments', async (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment
  })
  await comment.save()
  res.send(comment)
})

// Update a comment
app.put('/comments/:id', async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment
  }, { new: true })
  res.send(comment)
})

// Delete a comment
app.delete('/comments/:id', async (req, res) => {
  const comment = await Comment.findByIdAndRemove(req.params.id)
  res.send(comment)
})

// Listen on port 3000
app.listen(3000, () => console.log('Server running on port 3000'))