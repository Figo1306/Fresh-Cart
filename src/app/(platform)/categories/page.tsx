import React from "react";
import { Metadata } from "next";
import CategoriesScreen from "@/features/categories/screens/CategoriesScreen";

export const metadata: Metadata = {
  title: "Categories | FreshCart",
  description: "Browse our wide range of product categories at FreshCart",
};

export default function CategoriesPage() {
  return <CategoriesScreen />;
}