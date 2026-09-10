import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { ContactCTA } from "@/components/sections/contact-cta";
import { BLOG_POSTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image, width: 1000, height: 700, alt: post.title }],
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article className="container-px mx-auto max-w-3xl pb-20 pt-32 sm:pt-40">
        <Reveal>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-300 transition-colors hover:text-ink-100 light:text-ink-500 light:hover:text-ink-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All posts
          </Link>

          <div className="mt-6 flex items-center gap-3 text-xs text-ink-300 light:text-ink-500">
            <Badge variant="brand">{post.category}</Badge>
            <time dateTime={post.date} className="font-mono">
              {formatDate(post.date)}
            </time>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink-100 sm:text-4xl light:text-ink-900">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-300 light:text-ink-500">
            {post.excerpt}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 light:border-ink-900/10">
          <Image src={post.image} alt={post.title} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </Reveal>

        <Reveal delay={0.15} className="mt-10 space-y-5">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-ink-300 light:text-ink-700">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </article>

      {related.length > 0 && (
        <section className="border-t border-white/[0.06] py-20 light:border-ink-900/[0.05]">
          <div className="container-px mx-auto max-w-3xl">
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-100 light:text-ink-900">
              Keep reading
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blogs/${p.slug}`}
                  className="card-surface block p-5 transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-white/[0.14] light:hover:border-ink-900/[0.12]"
                >
                  <p className="font-display text-base font-medium tracking-tight text-ink-100 light:text-ink-900">
                    {p.title}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-ink-300 light:text-ink-500">
                    {p.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCTA />
    </>
  );
}
