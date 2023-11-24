const fs = require("fs");
const path = require("path");

const projectPath = require("../util/path");

const p = path.join(projectPath, "data", "products.json");

const getProductFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      returncallback([]);
    }
    callback(JSON.parse(fileContent));
  });
};

class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductFromFile(callback);
  }

  static findById(id, callback) {
    getProductFromFile((products) => {
      const product = products.find((product) => product.id === id);
      callback(product);
    });
  }
}

module.exports = Product;
