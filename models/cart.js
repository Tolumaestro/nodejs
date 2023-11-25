const fs = require("fs");
const path = require("path");

const projectPath = require("../util/path");

const p = path.join(projectPath, "data", "cart.json");

class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, filecontent) => {
      let cart = {
        products: [],
        totalPrice: 0,
      };
      if (!err) {
        cart = JSON.parse(filecontent);
      }
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = {
          id,
          qty: 1,
        };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, filecontent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(filecontent) };
      const product = updatedCart.products.find((product) => product.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (product) => product.id !== id
      );
      updatedCart.totalPrice = (
        updatedCart.totalPrice -
        productPrice * productQty
      ).toFixed(2);

      updatedCart.totalPrice = Number(updatedCart.totalPrice);

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(callback) {
    fs.readFile(p, (err, filecontent) => {
      const cart = JSON.parse(filecontent);
      if (err) {
        callback(null);
      } else {
        callback(cart);
      }
    });
  }
}

module.exports = { Cart };
