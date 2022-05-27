// -- Version Anterior -- //
// const socket = io.connect();

// function enviarMensaje() {
//   const autor = document.getElementById('autor').value;
//   const texto = document.getElementById('texto').value;
//   console.log({ autor, texto })
//   socket.emit('mensajeNuevo', { autor, texto });
//   return false;
// }

// socket.on('mensajes', mensajes => {
//   console.log(mensajes);
//   let contMensajesHtml = '';
//   mensajes.forEach(mensaje => {
//     contMensajesHtml += `<span><b>${mensaje.autor}: </b>${mensaje.texto}</span><br>`;
//   });
//   document.getElementById('contenedorMsjs').innerHTML = contMensajesHtml;  
// });

// socket.on('mensajes', mensajes => {
//   console.log(mensajes);
//   let contMensajesHtml = '';
//   mensajes.forEach(mensaje => {
//     contMensajesHtml += `<span><b>${mensaje.autor}: </b>${mensaje.texto}</span><br>`;
//   });
//   document.getElementById('contenedorMsjs').innerHTML = contMensajesHtml;
// });

// -- Version Nueva -- //
const socket = io.connect();

function enviarMensaje() {
  const autor = {
    id: document.getElementById('autorEmail').value,
    nombre: document.getElementById('autorNombre').value,
    apellido: document.getElementById('autorApellido').value,
    edad: document.getElementById('autorEdad').value,
    alias: document.getElementById('autorAlias').value,
    avatar: document.getElementById('autorAvatar').value,
  }

  const mensaje = document.getElementById('texto').value;

  const schemaAuthor = new normalizr.schema.Entity('autores');
  const schemaMensaje = new normalizr.schema.Entity('mensajes');
  const schemaChat = new normalizr.schema.Entity('chats', {
    autor: schemaAuthor,
    mensaje: schemaMensaje,
  });

  const normalizedData = normalizr.normalize({
    id: 'misChats',
    autor,
    mensaje,
  }, schemaChat);

  socket.emit('mensajeNuevo', normalizedData);
  return false;
}


socket.on('mensajes', chat => {
  let contMensajesHtml = '';

  if (chat.length > 0) {
    chat.forEach(e => {
      const mensaje = e.entities.chats.misChats.mensaje
      const autor = e.entities.autores[e.entities.chats.misChats.autor].id;
      contMensajesHtml += `<span><b>${autor}: </b>${mensaje}</span><br>`;
    });
    document.getElementById('contenedorMsjs').innerHTML = contMensajesHtml;
  }
});