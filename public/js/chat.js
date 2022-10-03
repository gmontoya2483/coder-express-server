

const socket = io();

socket.on('from-server-request-socket-handler', ()=> {
    socket.emit('from-client-chat');
});

socket.on('from-server-messages', normalizedMessages => {
    //TODO: desnormalizar y calcular la compresion
    const messages = denormalizeData(normalizedMessages)
    console.log(messages);
    renderMessages(messages);
});


function enviarMensaje() {
    const inputEmail = document.querySelector('#email');
    const inputNombre = document.querySelector('#nombre');
    const inputApellido = document.querySelector('#apellido');
    const inputEdad = document.querySelector('#edad');
    const inputAlias = document.querySelector('#alias');
    const inputAvatar = document.querySelector('#avatar');
    const inputContenido = document.querySelector('#msg');

    if(
        !inputEmail.value ||
        !inputContenido.value ||
        !inputEmail.value ||
        !inputNombre.value ||
        !inputApellido.value ||
        !inputEdad.value ||
        !inputAlias.value ||
        !inputAvatar.value) {
        alert("Se deben completar todos los campos");
        return;
    }

    const message = {
        author: {
            id: inputEmail.value.trim(),
            nombre: inputNombre.value.trim(),
            apellido: inputApellido.value.trim(),
            edad: inputEdad.value,
            alias: inputAlias.value.trim(),
            avatar: inputAvatar.value.trim()
        },
        text: inputContenido.value.trim(),
    }

    socket.emit('from-client-message', message);

    inputContenido.value = "";
    inputContenido.focus();

}



function renderMessages(messages) {
    const mensajesHTMLBody = messages.map((msg)=>{
        return `<span>
                    <span style="color: blue;"><b>${  msg.author.id }</b></span> 
                    <span style="color: brown;"> [${ msg.date }]:</span> 
                    <span style="color: green; font-style: italic;">${ msg.text }</span>
                    <img width="30px" src="${msg.author.avatar}" alt="${msg.author.nombre} ${msg.author.apellido} ">
                </span>`;
    }).join('<br>');
    document.querySelector('#chat').innerHTML = mensajesHTMLBody;
}




function denormalizeData(normalizedMessages)  {

    const compresion = document.querySelector('#compresion');

    const authorSchema = new normalizr.schema.Entity('author');

    const mensajeSchema = new normalizr.schema.Entity('mensaje', {
        author: authorSchema
    });

    const dataSchema =  new normalizr.schema.Entity('mensajes', {
        mensajes: [mensajeSchema]
    });

    const denormalizedData = normalizr.denormalize(normalizedMessages.result, dataSchema, normalizedMessages.entities);

    // Calculo porcentaje de compresion
    const longN = JSON.stringify(normalizedMessages).length
    const longD = JSON.stringify(denormalizedData).length
    const porcentaje = ((longN*100)/longD).toFixed(2)
    compresion.innerHTML = `<strong>${porcentaje}%</strong>`

    return denormalizedData.mensajes

}


