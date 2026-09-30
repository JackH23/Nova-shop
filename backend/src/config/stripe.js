const Stripe = require("stripe");

let stripe;

function getStripe() {
  if (!stripe) {
    const secretKey = process.env.STRIPE_SECRET_KEY?.trim();

    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY is required for Stripe checkout");
    }

    stripe = new Stripe(secretKey);
  }

  return stripe;
}

module.exports = new Proxy(
  {},
  {
    get(_target, property) {
      const client = getStripe();
      const value = client[property];

      return typeof value === "function" ? value.bind(client) : value;
    },
  },
);
