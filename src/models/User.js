const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    nombre: {type: String, require: true}, 
    apellido: {type: String, require: true},
    email:{type: String, require: true},
    password:{type: String, require: true},
    uempresa:{type: String, require: true},
    rol:{type: String, require: true} 
})

UserSchema.methods.encryptPassword = (passregistro)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(passregistro,salt)
    return hash
}

UserSchema.methods.matchPassword = function(passregistro){
    return bcrypt.compareSync(passregistro, this.passregistro)
}



UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await user.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

module.exports = mongoose.model('users', UserSchema)
