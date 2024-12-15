const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments:[
    {
      type: String
    }
  ]
}, { versionKey: false })

blogSchema.set('toJSON', {
  transform: (document, returnedValue) =>
  {
    returnedValue.id = returnedValue._id.toString()
    delete returnedValue._id
    delete returnedValue.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog