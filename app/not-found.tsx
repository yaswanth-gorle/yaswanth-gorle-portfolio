import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notfound">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p className="lead">That page doesn&apos;t exist.</p>
      <Link className="btn btn-primary" href="/">
        Back to home
      </Link>
    </main>
  );
}
