class Author {
    constructor(nombre, apellido, edad, alias, id=1) {
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.alias = alias
        this.id = id
    }

    async save(obj) {
        try {
            const contArchivo = await this.getAll()
            if (contArchivo.length !== 0) {
                this.id++
                await fs.promises.writeFile(this.ruta, JSON.stringify([...contArchivo, { ...obj, id: this.id }], null, 2), 'utf-8')
            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...obj, id: this.id }]), 'utf-8')
            }
            return this.id
        }
        catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            let contenido = await fs.promises.readFile(this.ruta, 'utf-8')
            let contParse = await JSON.parse(contenido)
            if (contParse.length !== 0) { contParse.map(elem => { if (elem.id > this.id) { this.id = elem.id } }) }
            return contParse
        }
        catch (error) {
            console.log(error)
        }
    }
}