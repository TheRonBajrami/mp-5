import { redirect } from "next/navigation";
import getCollection, { URLS_COLLECTION } from "@/db";

export default async function AliasPage({
  params,
}: {
  params: Promise<{ alias: string }>;
}) {
  const { alias } = await params;

  const collection = await getCollection(URLS_COLLECTION);
  const data = await collection.findOne({ alias }).catch(() => null);

  if (!data) {
    redirect("/");
  }

  redirect(data.originalUrl);
}
