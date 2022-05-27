const knexLib = require('knex');

class ProductsDb {
  constructor(optionMysql) {
    this.knex = knexLib(optionMysql);
  }

  createTable() {
    return this.knex.schema.dropTableIfExists('productos')
      .finally(() => {
        return this.knex.schema.createTable('productos', table => {
          table.string('title', 25).notNullable();
          table.integer('price');
          table.string('thumbnail', 50);
          table.increments('id').primary().notNullable();
        })
      })
  };

  listById(id) {
    // const product = this.products.find(product => product.id == id);
    // if (product) {
    //   return product;
    // } else {
    //   return { error: 'producto no encontrado' };
    // }
  };

  listAll() {
    // return [...this.products];
  };

  addProduct(product) {
    const newProduct = this.knex('productos').insert(product);
    console.log('product', product);
    console.log('newProduct', newProduct)
  };

  modifyById(product, id) {
    // const newProduct = { id: Number(id), ...product };
    // const index = this.products.findIndex(p => p.id == id);
    // if (index !== -1) {
    //   this.products[index] = newProduct;
    //   return newProduct;
    // } else {
    //   return { error: 'producto no encontrado' };
    // }
  };

  deleteById(id) {
    // const index = this.products.findIndex(product => product.id == id);
    // if (index !== -1) {
    //   return this.products.splice(index, 1);
    // } else {
    //   return { error: 'producto no encontrado' };
    // }
  }
};

module.exports = ProductsDb;
