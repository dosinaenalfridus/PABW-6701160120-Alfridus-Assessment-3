const mongoose = require('mongoose')

const SawSchema = new mongoose.Schema({
    nnr: {
        type: Number
    },
    kode: {
        type: String
    },
    bobot: {
        type: Number
    },
    jpo: {
        type: Number
    },
    jto: {
        type: Number
    },
})

module.exports = mongoose.model('Saw', SawSchema)