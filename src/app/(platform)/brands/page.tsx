import React from "react";
import { Metadata } from "next";
import BrandsScreen from "@/features/brands/screens/BrandsScreen";

export const metadata: Metadata = {
  title: "Top Brands | FreshCart",
  description: "Shop from your favorite top brands at FreshCart",
};

export default function BrandsPage() {
  return <BrandsScreen />;
}