import { redirect } from "next/navigation";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q =
    typeof params.keyword === "string"
      ? params.keyword
      : typeof params.q === "string"
      ? params.q
      : "";

  if (q.trim()) {
    redirect(`/products?keyword=${encodeURIComponent(q.trim())}`);
  }

  redirect("/products");
}