const mongoose = require('mongoose')

const BeasiswaSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    kuota: {
        type: Number,
    },
    body: {
        type: String,
    },
    peminats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Peminat"
    }], 
    createdAt:{
        type: Date,
        default: Date.now
    }
} ,{ collection : 'Beasiswa' });

module.exports = mongoose.model('Beasiswa', BeasiswaSchema)