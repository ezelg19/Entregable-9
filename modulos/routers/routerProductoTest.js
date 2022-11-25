const { Router } = require('express')
const { productosTest: productos } = require('../class/productosTest.js')
const router = Router()

// productos.popular()

router.get('/', async (req, res) => {
    try {
        const array = await productos.getAll()
        res.render('lista', {
            productsExist: array.length,
            products: array
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/", async (req, res) => {
    try {
        const { nombre, precio } = req.body
        await productos.save({ nombre: nombre, precio: precio })
        res.status(201).redirect('./')
    }
    catch (error) { res.status(400).send({ msg: "Error al cargar el producto", err: error }) }
})

router.post("/auto/:cant?", async (req, res) => {
    try {
        if (req.params.cant) { await productos.popular(cant = parseInt(req.params.cant)) }
        else { await productos.popular() }
        res.status(201).redirect('./')
    }
    catch (error) { res.status(400).send({ msg: "Error al cargar el producto", err: error }) }
})

router.get("/:id", async (req, res) => {
    try {
        const array = await productos.getById(parseInt(req.params.id))
        res.render('producto', {
            productsExist: array.length,
            products: array
        })
    } catch (error) {
        res.status(400).send(error)
    }
    const { id } = req.params
})

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const guardado = { title: req.body.title, price: req.body.price, thumbnail: req.body.thumbnail, id: parseInt(id) }
        await productos.actualizar(guardado)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        await productos.deleteById(parseInt(id))
        res.sendStatus(200)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete("/", async (req, res) => {
    try {
        await productos.deleteAll()
        res.sendStatus(200)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router


