"use client";

import { useState } from "react";
import createNewUrl from "@/app/lib/createNewUrl";

export default function ShortenForm() {
  const [originalUrl, setOriginalUrl] = useState(""); // store input values
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");  // store results + errors
  const [error, setError] = useState("");

  async function handleSubmit(e) {
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
    <div style={{ width: "600px", margin: "0 auto", marginTop: "40px" }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column"}}
      >
        <div>
          <label style={{ fontWeight: 600 }}>URL</label>
          <input
            type="text"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com/long/url"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid gray",
              borderRadius: "10px",
              backgroundColor: "white",
            }}
          />
        </div>

        <div>
          <label style={{ fontWeight: 600 }}>Alias</label>
          <input
            type="text"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="your-own-custom-alias"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid gray",
              borderRadius: "10px",
              backgroundColor: "white",

            }}
          />
        </div>

       
        {error && (
          <p style={{ color: "red", marginTop: "-6px" }}>{error}</p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            backgroundColor: "green",
            color: "white",
            fontWeight: 600,
            marginTop: "10px",
          }}
        >
          Shorten
        </button>
      </form>

      {shortUrl && (
        <p style={{ marginTop: "15px", fontWeight: 600 }}>
          Short URL:{" "}
          <a href={shortUrl} target="_blank">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
