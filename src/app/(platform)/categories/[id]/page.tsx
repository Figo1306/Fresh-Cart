import React from "react";
import { Metadata } from "next";
import CategoryDetailsScreen from "@/features/categories/screens/CategoryDetailsScreen";
import { getCategoryById } from "@/features/categories/services/getCategoryById";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await getCategoryById(id);
    const category = res?.data;
    if (category?.name) {
      return {
        title: `${category.name} | FreshCart`,
        description: `Explore products and subcategories in ${category.name} on FreshCart`,
      };
    }
  } catch {
    // Fallback if fetch fails
  }

  return {
    title: "Category Details | FreshCart",
    description: "Explore category details and subcategories on FreshCart",
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  return <CategoryDetailsScreen id={id} />;
}
