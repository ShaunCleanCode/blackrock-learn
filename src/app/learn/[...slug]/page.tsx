import { notFound } from "next/navigation";
import { getDocBySlug } from "@/content/docs";
import { DocPageClient } from "@/components/DocPageClient";

export default async function LearnDocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const joined = slug.join("/");
  const doc = getDocBySlug(joined);
  if (!doc) notFound();

  return <DocPageClient doc={doc} />;
}

