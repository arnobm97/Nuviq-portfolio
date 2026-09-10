import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-px mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center text-center">
      <span className="font-display text-sm font-medium tracking-[0.3em] text-brand-blue-light">
        404
      </span>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl light:text-ink-900">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-ink-300 light:text-ink-500">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <Button href="/" className="mt-8">
        Back to home
      </Button>
      <p className="mt-6 text-sm text-ink-300 light:text-ink-500">
        Or head to{" "}
        <Link href="/our-work" className="text-brand-blue-light hover:underline">
          our work
        </Link>{" "}
        or{" "}
        <Link href="/blogs" className="text-brand-blue-light hover:underline">
          the blog
        </Link>
        .
      </p>
    </div>
  );
}
