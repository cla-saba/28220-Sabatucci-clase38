class ApiProducts {
  constructor() {
    this.products = []
    this.id = 0
  };

  listById(id) {
    const product = this.products.find(product => product.id == id);
    if (product) {
      return product;
    } else {
      return { error: 'producto no encontrado' };
    }
  };

  listAll() {
    return [...this.products];
  };

  addProduct(product) {
    const newProduct = { ...product, id: ++this.id };
    this.products.push(newProduct);
    return newProduct;
  };

  modifyById(product, id) {
    const newProduct = { id: Number(id), ...product };
    const index = this.products.findIndex(p => p.id == id);
    if (index !== -1) {
      this.products[index] = newProduct;
      return newProduct;
    } else {
      return { error: 'producto no encontrado' };
    }
  };

  deleteById(id) {
    const index = this.products.findIndex(product => product.id == id);
    if (index !== -1) {
      return this.products.splice(index, 1);
    } else {
      return { error: 'producto no encontrado' };
    }
  }
};

module.exports = ApiProducts;
