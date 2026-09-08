"use client";

import { useState } from "react";

export function useProductFilters(initialCategory = "all") {
  // Price filter
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  // Availability filter
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [category, setCategory] = useState("all");

  // Reset price
  const resetPrice = () => {
    setMinPrice(0);
    setMaxPrice(500);
  };

  // Reset availability
  const resetAvailability = () => {
    setInStock(false);
    setOnSale(false);
  };

  // Reset all filters
  const resetFilters = () => {
    resetPrice();
    resetAvailability();
    setCategory("all");
  };

  return {
    // Price
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,

    // Availability
    inStock,
    onSale,
    setInStock,
    setOnSale,

    // Category
    category,
    setCategory,

    // Reset
    resetPrice,
    resetAvailability,
    resetFilters,
  };
}