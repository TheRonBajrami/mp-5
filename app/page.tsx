import ShortenForm from "./components/ShortenForm";

export default function Home() {
  return (
    <main className="p-8 text-center">
  <h1 className="mb-4 text-2xl font-semibold">Shorten a URL</h1>
  <div className="inline-block">
    <ShortenForm />
  </div>
</main>
  );
}
