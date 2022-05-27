let nombre;
function enviarLogin() {
  nombre = document.getElementById("nombre").value;

  fetch('http://localhost:8080/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre })
  })
    // .then(response => response.json())
    .then(data => window.location.replace("/"));

  return false;
}