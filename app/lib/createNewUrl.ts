"use server";

import getCollection, { URLS_COLLECTION } from "@/db";
import { UrlProps } from "./../types/UrlProps";

export default async function createNewUrl(
  alias: string,
  originalUrl: string
): Promise<UrlProps> {
  console.log("Creating the new URL");

  const cleanedAlias = alias.trim().toLowerCase();
  const cleanedUrl = originalUrl.trim();

  
  try {
    new URL(cleanedUrl);
  } catch {
    throw new Error("Invalid URL");
  }

  const urlCollection = await getCollection(URLS_COLLECTION);

  const existing = await urlCollection.findOne({ alias: cleanedAlias });
  if (existing) {
    throw new Error("Alias already taken");
  }

  const urlD = {
    alias: cleanedAlias,
    originalUrl: cleanedUrl,
  };

  const result = await urlCollection.insertOne(urlD);

  if (!result.acknowledged) {
    throw new Error("Database insert failed");
  }

  return {
    ...urlD,
    id: result.insertedId.toHexString(),
  };
}
