const express =require('express')
const router = express.Router()

const User = require('../models/User')
const passport = require('passport')
const {isAuthenticated} = require('../helpers/auth')

router.get('/users/signup',(req,res)=>{
    res.render('users/registro')
})

router.post('/users/signup', passport.authenticate('local-signup',{
    successRedirect: '/users/perfil',
    failureRedirect: '/users/signin',
    passReqToCallback: true

}))

router.get('/users/signin',(req,res)=>{
    res.render('users/login')
})

router.post('/users/signin', passport.authenticate('local-signin',{
    successRedirect: '/',
    failureRedirect: '/users/signin',
    failureFlash: true
}))

router.get('/users/perfil',isAuthenticated,(req,res)=>{
    res.render('users/perfil')
})

router.get('/users/loguot',(req,res)=>{
    req.logout()
    res.redirect('/')
})

module.exports = router