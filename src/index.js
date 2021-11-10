const express = require('express')
const path = require('path')
const exhbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')


//Inicializar
const app = express()
require('./database')
require('./helpers/local-auth')

//Settings
app.set('port', process.env.PORT || 3000)
app.set('views',path.join(__dirname, 'views'))
app.engine('.hbs', exhbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}))

app.set('view engine', '.hbs')



//Middlewares
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())


//Variables Globales

app.use((req, res, next)=>{
    app.locals.signUpMessage = req.flash('signUpMessage')
    app.locals.signUpMessage = req.flash('signInMessage')
    app.locals.user = req.user
    next()
})



//Routes
 app.use(require('./routers/index'))
 app.use(require('./routers/users'))
 app.use(require('./routers/retos'))


//Static Files
app.use(express.static(path.join(__dirname, 'public')))


//Server listening
app.listen(app.get('port'), ()=>{
    console.log('Server en el puerto', app.get('port'));
})