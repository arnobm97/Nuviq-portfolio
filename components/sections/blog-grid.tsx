"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

const PAGE_SIZE = 4;

export function BlogGrid() {
  const [visible, setVisible] = React.useState(PAGE_SIZE);
  const posts = BLOG_POSTS.slice(0, visible);
  const hasMore = visible < BLOG_POSTS.length;

  return (
    <div>
      <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <RevealItem key={post.slug}>
            <Link
              href={`/blogs/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-navy-800/60 shadow-card transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-white/[0.14] light:border-ink-900/[0.06] light:bg-white light:hover:border-ink-900/[0.12]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-3 text-xs text-ink-300 light:text-ink-500">
                  <Badge variant="outline" size="sm">
                    {post.category}
                  </Badge>
                  <time dateTime={post.date} className="font-mono">
                    {formatDate(post.date)}
                  </time>
                </div>
                <h3 className="mt-3 font-display text-lg font-medium tracking-tight text-ink-100 light:text-ink-900">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 line-clamp-3 text-sm leading-relaxed text-ink-300 light:text-ink-500">
                  {post.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-blue-light">
                  Read more
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <Button variant="outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load more posts
          </Button>
        </div>
      )}
    </div>
  );
}
