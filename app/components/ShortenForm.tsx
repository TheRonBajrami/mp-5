"use client";

import React, { useState } from "react";
import createNewUrl from "@/app/lib/createNewUrl";

export default function ShortenForm() {
  const [originalUrl, setOriginalUrl] = useState(""); // store input values
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");  // store results + errors
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedUrl = originalUrl.trim();
    const trimmedAlias = alias.trim();

    // frontend check 
    if (!trimmedUrl || !trimmedAlias) {
      setError("Please enter a URL and an alias");
      setShortUrl("");
      return;
    }

    setError("");
    setShortUrl("");

    try {
      // call backend, send data to create the shortened URL
      const result = await createNewUrl(trimmedAlias, trimmedUrl);

      const base = window.location.origin;  // build the full short URL
      setShortUrl(base + "/" + result.alias);

      // clear input boxes
      setOriginalUrl("");
      setAlias("");
    } catch (err) {

      
      if (err instanceof Error) {   // backend error message
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  }

  return (
    <div className="w-[600px] mx-auto mt-10">
  <form onSubmit={handleSubmit} className="flex flex-col">
    
    <div>
      <label className="font-semibold">URL</label>
      <input
        type="text"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        placeholder="https://example.com/long/url"
        className="w-full p-2.5 border border-gray-500 rounded-xl bg-white"
      />
    </div>

    <div className="mt-4">
      <label className="font-semibold">Alias</label>
      <input
        type="text"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        placeholder="your-own-custom-alias"
        className="w-full p-2.5 border border-gray-500 rounded-xl bg-white"
      />
    </div>

    {error && (
      <p className="text-red-600 -mt-1.5">{error}</p>
    )}

    <button
      type="submit"
      className="w-full p-3 rounded-xl bg-green-600 text-white font-semibold mt-2.5"
    >
      Shorten
    </button>
  </form>

  {shortUrl && (
    <p className="mt-4 font-semibold">
      Short URL:{" "}
      <a href={shortUrl} target="_blank" className="underline text-blue-600">
        {shortUrl}
      </a>
    </p>
  )}
</div>

  );
}
