"use client";
import { CategoryI } from "@/interfaces";
import React, { useEffect, useState } from "react";

interface Props {
  categoryId: string;
  selectedSub: string | null;
  setSelectedSub: (id: string | null) => void;
}

export default function SubCategories({
  categoryId,
  selectedSub,
  setSelectedSub,
}: Props) {
  const [subCategories, setSubCategories] = useState<CategoryI[]>([]);
  const [subDetail, setSubDetail] = useState<CategoryI | null>(null);

  useEffect(() => {
    async function getSubs() {
      try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
        );
        const json = await res.json();
        setSubCategories(json.data);
      } catch (err) {
        console.error("Error fetching subcategories", err);
      }
    }
    getSubs();
  }, [categoryId]);

  useEffect(() => {
    let mounted = true;
    async function getSubDetail() {
      if (selectedSub && selectedSub !== "all") {
        try {
          const response = await fetch(
            `https://ecommerce.routemisr.com/api/v1/subcategories/${selectedSub}`
          );
          const json = await response.json();
          if (mounted) {
            setSubDetail(json.data);
          }
        } catch (err) {
          console.error("Error fetching subcategory detail", err);
        }
      } else {
        setSubDetail(null);
      }
    }
    getSubDetail();
    return () => {
      mounted = false;
    };
  }, [selectedSub]);

  return (
    <div className="mb-10">
      {subCategories && subCategories.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <button
            onClick={() => setSelectedSub("all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
              !selectedSub || selectedSub === "all"
                ? "bg-amber-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            All
          </button>
          {subCategories.map((sub) => (
            <button
              key={sub._id}
              onClick={() => setSelectedSub(sub._id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                selectedSub === sub._id
                  ? "bg-amber-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}

      {subDetail && (
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold">{subDetail.name}</h2>
        </div>
      )}
    </div>
  );
}
