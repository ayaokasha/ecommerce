"use client";

import { CategoryI } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CategoriesContext = createContext<{
  categories: CategoryI[] | null;
  setCategories: (value: CategoryI[] | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getCategories: () => void;
}>({
  categories: null,
  setCategories: () => {},
  isLoading: false,
  setIsLoading: () => {},
  getCategories: () => {},
});

export default function CategoriesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [categories, setCategories] = useState<CategoryI[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getCategories() {
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      const res = await response.json();
      setCategories(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        setCategories,
        isLoading,
        setIsLoading,
        getCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
