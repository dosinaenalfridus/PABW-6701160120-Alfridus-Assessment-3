const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let StorySchema = new Schema({
    title: {
        type: String
    },
    kuota: {
        type: Number
    },
    body: {
        type: String
    },
    status: {
        type: String,
        default: 'private',
        enum: ['private', 'public']
    },
    nama: 
        {
          type: Schema.Types.ObjectId,
          ref: "Userbrain"
        }
      ,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Userbrain'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    
    endDate:{
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Story', StorySchema)