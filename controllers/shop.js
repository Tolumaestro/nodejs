const { Cart } = require("../models/cart");
const Product = require("../models/product");

const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

const getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    res.render("shop/product-detail", {
      product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

const getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      products,
      pageTitle: "My Shop",
      path: "/",
    });
  });
};

const getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

const postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect("/cart");
};

const getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

const page404 = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: null });
};

module.exports = {
  getIndex,
  getProducts,
  getProduct,
  getCart,
  postCart,
  getOrders,
  getCheckout,
  page404,
};
