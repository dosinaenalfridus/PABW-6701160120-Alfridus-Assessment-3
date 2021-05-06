const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let UserbrainSchema = new Schema({
    body: {
        type: String,
    },
    judul: {
        type: String,
      },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },  
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story',
    }],
    createdAt:{
        type: Date,
        default: Date.now
    },
    tlp: {
        type: String,
    },
    nis: {
        type: String,
    },
    nama: {
        type: String,
    },
    kelas: {
        type: String,
    },
    jurusan: {
        type: String,
    },
    nilai: {
        type: Number,
    },
    penghasilan: {
        type: Number
    },
    sekolah: {
        type: String
    },
    tanggungan: {
        type: Number
    },
    alamatrumah: {
        type: String
    },
    alamatsekolah: {
        type: String
    },
    scanNilai: {
        type: String
    },
})

module.exports = mongoose.model('Userbrain', UserbrainSchema)