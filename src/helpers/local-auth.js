const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require ('../models/User')

passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser(async(id, done)=>{
    const user = await User.findById(id)
    done(null, user)
})

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,email,password,done)=>{
    const correoExiste = await User.findOne({'email': email})
    console.log(correoExiste)
    if(correoExiste){
        return done(null, false, req.flash('signUpMessage','Correo Ya Existe.'))
    }
    else{
        const newuser = new User()
        newuser.email = email
        newuser.password = newuser.encryptPassword(password)
        await newuser.save()
        done(null, newuser)
    }

}))

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, email, password, done )=>{
    const passwordOk = await User.findByCredentials(email, password);
      if (!passwordOk) {
        return done(null, false, { message: 'Invalid username or password' });
      }
}))
