const socket = io()

const addArray = e => {
    const title = document.querySelector('#title').value
    const price = document.querySelector('#price').value
    const thumbnail = document.querySelector('#thumbnail').value
    socket.emit('newProduct', { title, price, thumbnail })
    return false
}

const addMensaje = e => {
    fecha = new Date().toLocaleDateString()
    hora = new Date().toLocaleTimeString()
    const nombre = document.querySelector('#name').value
    const apellido = document.querySelector('#lastName').value
    const edad = document.querySelector('#edad').value
    const alias = document.querySelector('#alias').value
    const mensaje = document.querySelector('#mensaje').value
    const id = nombre.length + apellido.length + parseInt(edad)
    const author = {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        alias: alias,
        id: String(id)
    }
    const comentario = {
        author: author,
        hora: hora,
        fecha: fecha,
        mensaje: mensaje
    }

    socket.emit('newMensaje', comentario)
    return false
}

const render = array => {
    const html = array.map(elem => {
        return (`<tr>
                    <th scope='row' style="text-align:center">${elem.id}</th>
                    <td style="text-align:center">${elem.title}</td>
                    <td style="text-align:center">$ ${elem.price}</td>
                    <td style="text-align:center"><img src=${elem.thumbnail} alt="" border=1 height=30 width=30></img></th>
                </tr>`)
    }).join(" ")
    document.querySelector('#array').innerHTML = html
    document.querySelector('#table').scrollTop = document.querySelector('#table').scrollHeight
}


const rendermsg = data => {
    
    const author = new normalizr.schema.Entity('author', {}, { idAttribute: 'alias' })
    const comentario = new normalizr.schema.Entity('comentario', {
        author: author
    })
    const comentarios = new normalizr.schema.Entity('comentarios', {
        comentarios: [comentario]
    })

    const denormalizado = normalizr.denormalize(data.result, comentarios, data.entities)
    const normZize = JSON.stringify(data).length
    const denormZize = JSON.stringify(denormalizado).length
    let porcentaje = parseInt((normZize*100)/denormZize)

    console.log('Tamaño normalizado: ',normZize)
    console.log('Tamaño denormalizado: ',denormZize)
    console.log('Compresion del ',porcentaje,'%')

    const html = denormalizado.comentarios.map(elem => {
        return (`<div>
                <b style='color:blue'>${elem.author.alias}</b></br>
                <a style='color:#B8B8B9'>${elem.hora}</a>
                <a>${elem.mensaje}</a>
                </div>`)
    }).join(" ")
    const compresion = `<div>
    <b style="text-align:left; margin-left:200px">Compresion del ${porcentaje}%</b></br>
    </div>`

    document.querySelector('#mensajes').innerHTML = html
    document.querySelector('#chat').scrollTop = document.querySelector('#chat').scrollHeight
    document.querySelector('#compresion').innerHTML = compresion
}


socket.emit('respuesta')
socket.on('array', data => {
    render(data)
})
socket.on('mensajes', data => {
    rendermsg(data)
})