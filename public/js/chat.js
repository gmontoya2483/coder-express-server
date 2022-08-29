const socket = io();

socket.on('from-server-request-socket-handler', ()=> {
    socket.emit('from-client-chat');
});

socket.on('from-server-messages', messages => {
    console.log(messages);
    renderMessages(messages);
});


function enviarMensaje() {
    const inputUser = document.querySelector('#user');
    const inputContenido = document.querySelector('#msg');

    if(!inputUser.value ||  !inputContenido.value ) {
        alert("Se deben completar todos los campos");
        return;
    }

    const message = {
        author: inputUser.value,
        text: inputContenido.value,
    }

    socket.emit('from-client-message', message);

    inputContenido.value = "";
    inputContenido.focus();

}



function renderMessages(messages) {
    const mensajesHTMLBody = messages.map((msg)=>{
        return `<span>
                    <span style="color: blue;"><b>${ msg.author }</b></span> 
                    <span style="color: brown;"> [${ msg.date }]:</span> 
                    <span style="color: green; font-style: italic;">${ msg.text }</span>
                </span>`;
    }).join('<br>');
    document.querySelector('#chat').innerHTML = mensajesHTMLBody;
}


