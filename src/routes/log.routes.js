const express = require('express');
const logRouter = express.Router();

logRouter.post('/login', (req, res) => {
  if (req.session.contador) {
    req.session.contador++;
    res.send(`${req.session.nombre} visitaste la página ${req.session.contador} veces.`)
  }
  else {
    const nombre = req.body.nombre;
    req.session.nombre = nombre
    req.session.contador = 1
    res.send(`Te damos la bienvenida ${nombre}`)
  }
})

logRouter.post('/logout', (req, res) => {
  const nombre = req.session.nombre;
  req.session.destroy(err => {
    if (!err) {
      res.send({ mensaje: `${nombre} ha sido deslogueado.` })
    }
    else {
      res.send(err);
    }
  })
})

module.exports = logRouter;