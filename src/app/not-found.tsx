import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="font-display text-7xl text-forest/20">404</span>
      <h1 className="mt-4 font-display text-3xl text-charcoal">
        This page wandered off
      </h1>
      <p className="mt-3 max-w-sm text-stone">
        Like a milkfish with all its bones still in, this page is a bit hard
        to navigate. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-forest-dark"
      >
        Back to Home
      </Link>
    </div>
  );
}
