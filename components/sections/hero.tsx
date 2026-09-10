"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/ui/animated-text";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Hero() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoContainerRef = React.useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = React.useState(true);
  const [muted, setMuted] = React.useState(true);
  const [volume, setVolume] = React.useState(0.6);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [hasVideo, setHasVideo] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start loading immediately
    video.preload = "auto";
    video.load();

    const onTimeUpdate = () => setProgress(video.currentTime);
    const onLoadedMeta = () => {
      setDuration(video.duration || 0);
      setHasVideo(true);
      setIsLoading(false);
      setError(null);
      console.log("Video loaded successfully");
    };
    const onError = (e: Event) => {
      const videoElement = e.target as HTMLVideoElement;
      const errorCode = videoElement.error?.code;
      const errorMessage = videoElement.error?.message || "Unknown error";
      setError(`Video error (${errorCode}): ${errorMessage}`);
      setHasVideo(false);
      setIsLoading(false);
      console.error("Video error:", errorCode, errorMessage);
    };
    const onCanPlay = () => {
      console.log("Video can play");
      setHasVideo(true);
      setIsLoading(false);
      setError(null);
    };
    const onWaiting = () => {
      setIsLoading(true);
    };
    const onPlaying = () => {
      setIsLoading(false);
      setHasVideo(true);
    };

    // Listen for fullscreen changes
    const onFullscreenChange = () => {
      const isFull = !!document.fullscreenElement;
      setIsFullscreen(isFull);
      if (isFull) {
        // When fullscreen, make sure video is playing
        video.play().catch(() => { });
        setPlaying(true);
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMeta);
    video.addEventListener("error", onError);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("canplaythrough", () => {
      console.log("Video can play through");
      setIsLoading(false);
    });
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("playing", onPlaying);

    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    document.addEventListener("mozfullscreenchange", onFullscreenChange);
    document.addEventListener("MSFullscreenChange", onFullscreenChange);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMeta);
      video.removeEventListener("error", onError);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("playing", onPlaying);

      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
      document.removeEventListener("mozfullscreenchange", onFullscreenChange);
      document.removeEventListener("MSFullscreenChange", onFullscreenChange);
    };
  }, []);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch((err) => {
        console.error("Play error:", err);
        setError(err.message);
      });
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function onVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    setVolume(value);
    const video = videoRef.current;
    if (!video) return;
    video.volume = value;
    video.muted = value === 0;
    setMuted(value === 0);
  }

  function onSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    setProgress(value);
    if (videoRef.current) videoRef.current.currentTime = value;
  }

  function toggleFullscreen() {
    const videoContainer = videoContainerRef.current;
    if (!videoContainer) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => { });
    } else {
      videoContainer.requestFullscreen?.().catch(() => { });
    }
  }

  function scrollToNext() {
    const next = document.getElementById("work-preview");
    next?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-950"
    >
      {/* Background media */}
      <div ref={videoContainerRef} className="absolute inset-0">
        <video
          ref={videoRef}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-700",
            hasVideo && !isLoading ? "opacity-100" : "opacity-0"
          )}
          poster="/images/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={(e) => console.error("Video element error:", e)}
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-950">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-blue-light border-t-transparent" />
              <p className="text-sm text-ink-300">Loading video...</p>
            </div>
          </div>
        )}

        {/* Fallback gradient background when video fails */}
        {!hasVideo && !isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-blue-950 to-navy-950">
            <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10" />
          </div>
        )}

        {/* Poster image fallback - show immediately */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: "url('/images/hero-poster.jpg')",
            opacity: hasVideo && !isLoading ? 0 : 1,
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/30 to-navy-950" />
        <div className="absolute inset-0 bg-navy-950/20" />

        {/* Show error message if any */}
        {error && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 rounded-lg bg-red-900/80 px-4 py-2 text-sm text-white">
            {error}
          </div>
        )}
      </div>

      {/* Overlay content - hidden when fullscreen */}
      {!isFullscreen && (
        <>
          <div className="container-px relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-100 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
              Applied AI, engineered to ship
            </motion.span>

            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
              <AnimatedText as="span" by="words" delay={0.15}>
                {SITE.tagline}
              </AnimatedText>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-6 max-w-xl text-balance text-base leading-relaxed text-ink-300 sm:text-lg"
            >
              {SITE.name} builds intelligent systems that drive innovation and growth — from
              strategy through production.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button href="/our-work" size="lg">
                Explore Our Work
              </Button>
              <Button href="/contact" size="lg" variant="new">
                Let&rsquo;s Talk
              </Button>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <button
            type="button"
            onClick={scrollToNext}
            aria-label="Scroll to next section"
            className="absolute bottom-28 left-1/2 z-10 -translate-x-1/2 text-ink-300 transition-colors hover:text-ink-100 sm:bottom-24"
          >
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              <ChevronDown className="h-6 w-6" />
            </motion.span>
          </button>
        </>
      )}

      {/* Custom video controls - show in both normal and fullscreen */}
      <div className={cn(
        "absolute inset-x-0 z-10 px-4 pb-4 sm:px-8 sm:pb-6",
        isFullscreen ? "bottom-0 pb-8" : "bottom-0"
      )}>
        <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-full border border-white/10 bg-navy-950/50 px-3 py-2 backdrop-blur-xl sm:gap-4 sm:px-4">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause video" : "Play video"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={onVolumeChange}
            aria-label="Volume"
            className="hidden h-1 w-16 shrink-0 cursor-pointer accent-brand-blue sm:block"
          />

          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={progress}
            onChange={onSeek}
            aria-label="Seek"
            className="h-1 w-full min-w-0 cursor-pointer accent-brand-blue"
          />

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Toggle fullscreen"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}