// const socket = io.connect();

function enviarProducto() {
  const title = document.getElementById("nombre").value;
  const price = document.getElementById("precio").value;
  const thumbnail = document.getElementById("foto").value;
  socket.emit('productoNuevo', { title, price, thumbnail });
  return false;
}

socket.on('productos', productos => {
  let productosContenedor = '';
  productos && productos.length > 0 && productos.forEach(producto => {
    productosContenedor += `
      <div class="row">
        <div class="col">${producto.title}</div>
        <div class="col">${producto.price}</div>
        <div class="col"><img src=${producto.thumbnail}></div>
        </div>
        `;
  });
  document.getElementById('productosContenedor').innerHTML = productosContenedor;
});

function enviarLogout() {
  fetch('http://localhost:8080/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
    // .then(response => response.json())
    .then(data => window.location.replace("/login.html"));

  return false;
}