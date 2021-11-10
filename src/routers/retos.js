const express =require('express')
const router = express.Router()

const Reto = require('../models/Reto')
const {isAuthenticated} = require('../helpers/auth')

router.get('/retos/crear', isAuthenticated, (req,res)=>{
    res.render('retos/crear-reto')
})

router.post('/retos/crear-reto', async(req,res)=>{
    const {titulo, descripcion, fecha, fechafin, categoria } = req.body;
    const nuevoReto = new Reto({titulo,descripcion,fecha, fechafin, categoria})
    await nuevoReto.save()
    req.flash('success_msg', ' Se ha agregado un nuevo reto')
    res.redirect('/retos')
})  

router.get('/retos', async(req,res)=>{
    const retosguardados = await Reto.find({}).lean()
    res.render('retos/retos-guardados', {retosguardados})
})

router.get('/retos/editar/:id', isAuthenticated, async(req,res)=>{
    const retoeditar = await Reto.findById(req.params.id).lean()
    res.render('retos/editar-reto', {retoeditar})
})

router.put('/retos/editarreto/:id', isAuthenticated, async(req,res)=>{
    const {titulo,descripcion,fechafin} = req.body
    await Reto.findByIdAndUpdate(req.params.id, {titulo,descripcion,fechafin}).lean()
    req.flash('success_msg', 'El Reto se ha actualizado')
    res.redirect('/retos')
})

router.delete('/retos/eliminar/:id', isAuthenticated, async(req,res)=>{
    await Reto.findByIdAndDelete(req.params.id).lean()
    req.flash('success_msg', 'El Reto se ha Eliminado')
    res.redirect('/retos')
})
module.exports = router