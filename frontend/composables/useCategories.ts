"use client";

import { useEffect, useReducer, useState } from "react";
import { useSearchParams } from "next/navigation";
import { categoryService } from "@/services/categoryService";
import {
  categoryReducer,
  initialCategoryState,
} from "@/reducers/categoryReducer";

export function useCategories() {
  const searchParams = useSearchParams();

  const categoryIdFromUrl = searchParams.get("category_id");

  const initialCategoryId = categoryIdFromUrl
    ? Number(categoryIdFromUrl)
    : null;

  const [categoryId, setCategoryId] = useState<number | null>(
    initialCategoryId,
  );

  const [state, dispatch] = useReducer(categoryReducer, initialCategoryState);

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch({
        type: "SET_LOADING",
        value: true,
      });

      try {
        const response = await categoryService.getCategories();

        dispatch({
          type: "SET_CATEGORIES",
          categories: response.categories,
        });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          value:
            error instanceof Error ? error.message : "Failed to get categories",
        });
      } finally {
        dispatch({
          type: "SET_LOADING",
          value: false,
        });
      }
    };

    fetchCategories();
  }, []);

  const selectedCategory = state.categories.find(
    (category) => category.id === categoryId,
  );

  return {
    ...state,
    categoryId,
    setCategoryId,
    selectedCategory,
  };
}
