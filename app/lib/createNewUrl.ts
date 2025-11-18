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

  // basic alias required
  if (!cleanedAlias) {
    throw new Error("Alias is required");
  }

  // only allow safe URL characters in alias 
  if (encodeURIComponent(cleanedAlias) !== cleanedAlias) {
    throw new Error(
      "Invalid alias: You may only use valid URL characters"
    );
  }

  // basic URL syntax check
  try {
    new URL(cleanedUrl);
  } catch {
    throw new Error("Invalid URL");
  }

  //  verify the URL actually responds
  try {
    const res = await fetch(cleanedUrl);

    if (res.status < 200 || res.status >= 500) {
      throw new Error("Invalid URL: Bad response " + res.status);
    }
  } catch {
    throw new Error("Invalid URL: Could not verify URL. Please try again.");
  }

  // check for duplicate alias
  const urlCollection = await getCollection(URLS_COLLECTION);

  const existing = await urlCollection.findOne({ alias: cleanedAlias });
  if (existing) {
    throw new Error("Alias already taken");
  }

  // insert the new URL
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

