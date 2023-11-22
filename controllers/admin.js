const Product = require("../models/product");

const getAddProduct = (req, res, next) => {
  res.render("admin/add-products", {
    pageTitle: "Add Products",
    path: "/admin/add-product",
    activeAddProduct: true,
    productCSS: true,
    formsCSS: true,
  });
};

const postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/product-list", {
      prods: products,
      pageTitle: "Admin Products",
      path: "admin/products",
    });
  });
};

module.exports = { getAddProduct, postAddProduct, getProducts };
