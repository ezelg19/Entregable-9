const fs = require('fs')
const normalizr = require('normalizr')

let datos = {
    id: "1000",
    comentarios: [
    ]
}

const author = new normalizr.schema.Entity('author', {}, { idAttribute: 'alias' })
const comentario = new normalizr.schema.Entity('comentario', {
    author: author
})
const comentarios = new normalizr.schema.Entity('comentarios', {
    comentarios: [comentario]
})

class Mensajes {
    constructor(ruta, id = 1) {
        this.ruta = ruta
        this.id = id
    }

    async save(obj) {
        try {
            const contArchivo = await this.getAll()
            obj.id = String(this.id)
            contArchivo.push(obj)
            const json = JSON.stringify(contArchivo, null, 2)
            await fs.promises.writeFile(this.ruta, json, 'utf-8')
        }
        catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            let contenido = await fs.promises.readFile(this.ruta, 'utf-8')
            let contParse = await JSON.parse(contenido)
            if (contParse.length !== 0) { contParse.map(elem => { if (parseInt(elem.id) >= this.id) { this.id = parseInt(elem.id) + 1 } }) }
            return contParse
        }
        catch (error) {
            console.log(error)
        }
    }

    async normalizar(obj) {
        datos.comentarios = await this.getAll()
        const normalizado = normalizr.normalize(datos, comentarios)
        return normalizado
    }
}

const mensajes = new Mensajes('./modulos/utils/mensajes.json')

module.exports = mensajes