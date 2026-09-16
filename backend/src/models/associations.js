const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Delivery = require("./Delivery");
const Payment = require("./Payment");
const Return = require("./Return");
const ReturnItem = require("./ReturnItem");

// Wishlist
const User = require("./User");
const Product = require("./Product");
const WishlistItem = require("./WishlistItem");
const PaymentMethod = require("./PaymentMethod");

// ========================================
// Order → Order Items
// ========================================

Order.hasMany(OrderItem, {
  foreignKey: "order_id",
  as: "items",
});

OrderItem.belongsTo(Order, {
  foreignKey: "order_id",
  as: "order",
});

// ========================================
// Order Item → Product
// ========================================

OrderItem.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

Product.hasMany(OrderItem, {
  foreignKey: "product_id",
  as: "orderItems",
});

// ========================================
// Order → Delivery
// ========================================

Order.hasOne(Delivery, {
  foreignKey: "order_id",
  as: "delivery",
});

Delivery.belongsTo(Order, {
  foreignKey: "order_id",
  as: "order",
});

// ========================================
// Order → Payment
// ========================================

Order.hasOne(Payment, {
  foreignKey: "order_id",
  as: "payment",
});

Payment.belongsTo(Order, {
  foreignKey: "order_id",
  as: "order",
});

// ========================================
// Order → Returns
// ========================================

Order.hasMany(Return, {
  foreignKey: "order_id",
  as: "returns",
});

Return.belongsTo(Order, {
  foreignKey: "order_id",
  as: "order",
});

// ========================================
// Return → Return Items
// ========================================

Return.hasMany(ReturnItem, {
  foreignKey: "return_id",
  as: "items",
});

ReturnItem.belongsTo(Return, {
  foreignKey: "return_id",
  as: "return",
});

// ========================================
// Order Item → Return Items
// ========================================

OrderItem.hasMany(ReturnItem, {
  foreignKey: "order_item_id",
  as: "return_items",
});

ReturnItem.belongsTo(OrderItem, {
  foreignKey: "order_item_id",
  as: "order_item",
});

// ========================================
// User → Wishlist Items
// ========================================

User.hasMany(WishlistItem, {
  foreignKey: "user_id",
  as: "wishlistItems",
});

WishlistItem.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// ========================================
// Product → Wishlist Items
// ========================================

Product.hasMany(WishlistItem, {
  foreignKey: "product_id",
  as: "wishlistItems",
});

WishlistItem.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

// ========================================
// User → Payment Methods
// ========================================

User.hasMany(PaymentMethod, {
  foreignKey: "user_id",
  as: "paymentMethods",
});

PaymentMethod.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

module.exports = {
  Order,
  OrderItem,
  Delivery,
  Payment,
  Return,
  ReturnItem,

  User,
  Product,
  WishlistItem,
};