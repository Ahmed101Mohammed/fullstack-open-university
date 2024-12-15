const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    required: true,
    type: String,
    unique: true,
    minLength: [3, 'username length should be at least 3 charchters']
  },
  password: {
    required: true,
    type: String
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
}, { versionKey: false })

userSchema.set('toJSON', {
  transform: (document, returnedUser) =>
  {
    returnedUser.id = returnedUser._id.toString()
    delete returnedUser._id
    delete returnedUser.__v
    delete returnedUser.password
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User