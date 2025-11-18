import ShortenForm from "./components/ShortenForm";

export default function Home() {
  return (
    <main style={{ padding: "30px", textAlign: "center" }}>
      <h1 style={{ marginBottom: "16px" }}>Shorten a URL</h1>
      <div style={{ display: "inline-block" }}>
        <ShortenForm />
      </div>
    </main>
  );
}
