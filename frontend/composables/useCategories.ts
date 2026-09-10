"use client";

import { useEffect, useReducer } from "react";
import { categoryService } from "@/services/categoryService";
import {
  categoryReducer,
  initialCategoryState,
} from "@/reducers/categoryReducer";

export function useCategories() {
  const [state, dispatch] = useReducer(
    categoryReducer,
    initialCategoryState
  );

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
            error instanceof Error
              ? error.message
              : "Failed to get categories",
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

  return state;
}