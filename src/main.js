const express = require('express');

// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedtopology: true };

const { faker } = require('@faker-js/faker');

const { Server: Httperver } = require('http');
const { Server: IOServer } = require('socket.io');

const logRouter = require('./routes/log.routes.js')
const productRouter = require('./routes/products.routes.js')

// ** Memoria ** //
const ProductsMemo = require('./api/productsMemo.js')
const apiProducts = new ProductsMemo();

// ** File System ** //
// const ProductsFs = require('./api/productsFs.js')
// const apiProducts = new ProductsFs();
const FileSystem = require('./api/FileSystem.js');
const { env } = require('process');
const apiMensajes = new FileSystem('mensajes');

// ** SQL Lite 3 ** //
// const { optionSqlite } = require('./utils/sqlite');
// const ProductsDb = require('./api/productsDb.js')
// const apiProducts = new ProductsDb(optionSqlite);

// ** MongoDB ** //
// var mongo = require('mongodb');
// const ProductsMongo = require('./api/productsMongo.js')
// const apiProducts = new ProductsMongo();

const app = express();
const httpServer = new Httperver(app);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser());

productRouter.use(express.json());
logRouter.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(session({
//   store: MongoStore.create({
//     mongoUrl: 'mongodb://root:example@127.0.0.1:27017/',
//     mongoOptions: advancedOptions,
//   }),
//   secret: 'shhhhhhhhhhhhhhh',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 40000
//   }
// }))

app.use('api/productos', productRouter);
app.use('api', logRouter);

app.set("view engine", "ejs");
app.set("views", "./views");

// app.post('/api/login', (req, res) => {
//   if (req.session.contador) {
//     req.session.contador++;

//     res.send(`${req.session.nombre} visitaste la página ${req.session.contador} veces.`)
//   }
//   else {
//     const nombre = req.body.nombre;
//     req.session.nombre = nombre
//     req.session.contador = 1
//     res.send(`Te damos la bienvenida ${nombre}`)
//   }
// })

// app.post('/api/logout', (req, res) => {
//   const nombre = req.session.nombre;
//   req.session.destroy(err => {
//     if (!err) {
//       res.send({ mensaje: `${nombre} ha sido deslogueado.` })
//     }
//     else {
//       res.send(err);
//     }
//   })
// })

// app.post('/api/productos', (req, res) => {
//   const product = req.body;
//   apiProducts.addProduct(product);
//   res.redirect('/');
// })

// app.get('/api/productos', (req, res) => {
//   const prods = apiProducts.listAll()
//   res.render("view", {
//     products: prods,
//     productsLength: prods.length,
//   });
// });

// app.get('/api/productos-test', async (req, res) => {
//   for (let i = 0; i < 5; i++) {
//     apiProducts.addProduct({
//       title: faker.commerce.productName(),
//       price: faker.commerce.price(),
//       thumbnail: faker.image.avatar()
//     });
//   }

//   io.emit('productos', apiProducts.listAll());
//   res.json(apiProducts.listAll());
// });

// -- Socket -- //
const io = new IOServer(httpServer);
io.on('connection', socket => {
  console.log(`Nuevo cliente conectado: ${socket.id}`);

  io.emit('productos', apiProducts.listAll());
  io.emit('mensajes', apiMensajes.findAll());

  socket.on('mensajeNuevo', async (normalizedData) => {
    console.log('Mensaje nuevo', socket.id, normalizedData.entities.chats.misChats);
    await apiMensajes.create(normalizedData);
    io.sockets.emit('mensajes', await apiMensajes.findAll());
  });

  socket.on('productoNuevo', product => {
    console.log('Producto nuevo', socket.id, product);
    apiProducts.addProduct(product);

    io.emit('productos', apiProducts.listAll());
    return false;
  });
});

// -- Express -- //
const port = process.env.PORT || 8008
const server = httpServer.listen(port, () => {
  console.log(`HTTP Server in port: ${port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))
