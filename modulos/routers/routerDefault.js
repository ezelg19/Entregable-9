const { Router } = require('express')
const mensajes = require('../class/mensajes.js')
const routerDefault = Router()
let reg = false

function register(a){
    reg = a
}

routerDefault.get('/', (req, res) => {
    res.render('main', { root: __dirname, register: reg })
})

routerDefault.post('/', (req,res)=>{
    const author = {
        name:req.body.name,
        lastName:req.body.lastName,
        edad:req.body.edad,
        alias:req.body.alias
    }
    mensajes.author(author)
    reg = true
    res.redirect('/')
})

module.exports = {routerDefault, register}