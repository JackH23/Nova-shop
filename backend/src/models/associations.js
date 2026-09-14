const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Delivery = require("./Delivery");
const Payment = require("./Payment");

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

module.exports = {
  Order,
  OrderItem,
  Delivery,
  Payment,
};