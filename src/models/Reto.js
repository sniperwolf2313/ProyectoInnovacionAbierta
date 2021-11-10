const mongoose = require('mongoose')
const { Schema } = mongoose

const RetoSchema = new Schema ({
    titulo : { type: String,},
    descripcion: { type: String, required: true},
    fecha: {type: Date, default: Date.now },
    fechafin: {type: String, required: true},
    categoria: {type: String, required:true}
});

module.exports = mongoose.model('Reto',RetoSchema)