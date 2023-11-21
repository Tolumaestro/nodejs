const Product = require("../models/product");

const getAddProduct = (req, res, next) => {
  res.render("add-products", {
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
    res.render("shop", {
      prods: products,
      pageTitle: "My Shop",
      path: "/",
      activeShop: true,
      shopCSS: true,
    });
  });
};

const page404 = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: null });
};

module.exports = { getAddProduct, postAddProduct, getProducts, page404 };
