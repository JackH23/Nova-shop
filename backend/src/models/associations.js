const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Delivery = require("./Delivery");
const Payment = require("./Payment");
const Return = require("./Return");
const ReturnItem = require("./ReturnItem");

// Order → Order Items
Order.hasMany(OrderItem, {
  foreignKey: "order_id",
  as: "items",
});

OrderItem.belongsTo(Order, {
  foreignKey: "order_id",
  as: "order",
});

// Order → Delivery
Order.hasOne(Delivery, {
  foreignKey: "order_id",
  as: "delivery",
});

Delivery.belongsTo(Order, {
  foreignKey: "order_id",
  as: "order",
});

// Order → Payment
Order.hasOne(Payment, {
  foreignKey: "order_id",
  as: "payment",
});

Payment.belongsTo(Order, {
  foreignKey: "order_id",
  as: "order",
});

// Order → Returns
Order.hasMany(Return, {
  foreignKey: "order_id",
  as: "returns",
});

Return.belongsTo(Order, {
  foreignKey: "order_id",
  as: "order",
});

// Return → Return Items
Return.hasMany(ReturnItem, {
  foreignKey: "return_id",
  as: "items",
});

ReturnItem.belongsTo(Return, {
  foreignKey: "return_id",
  as: "return",
});

// Order Item → Return Items
OrderItem.hasMany(ReturnItem, {
  foreignKey: "order_item_id",
  as: "return_items",
});

ReturnItem.belongsTo(OrderItem, {
  foreignKey: "order_item_id",
  as: "order_item",
});

module.exports = {
  Order,
  OrderItem,
  Delivery,
  Payment,
  Return,
  ReturnItem,
};