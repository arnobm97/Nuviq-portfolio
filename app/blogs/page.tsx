import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { BlogGrid } from "@/components/sections/blog-grid";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Notes on applied AI: strategy, engineering, and case studies from the Nuviq AI Studio team.",
};

export default function BlogsPage() {
  return (
    <>
      <section className="container-px mx-auto max-w-7xl pb-16 pt-32 sm:pt-40">
        <Reveal className="max-w-2xl">
          <Badge variant="brand">Blog</Badge>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl light:text-ink-900">
            Latest insights
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-300 light:text-ink-500">
            Read our latest articles on AI, technology, and innovation — the practical kind,
            not the hype kind.
          </p>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24 sm:pb-28">
        <BlogGrid />
      </section>
    </>
  );
}
