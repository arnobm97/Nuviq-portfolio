export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950">
      <div className="flex items-center gap-3 text-ink-300">
        <span className="h-2 w-2 animate-pulse-slow rounded-full bg-brand-blue" />
        <span className="h-2 w-2 animate-pulse-slow rounded-full bg-brand-indigo [animation-delay:0.2s]" />
        <span className="h-2 w-2 animate-pulse-slow rounded-full bg-brand-teal [animation-delay:0.4s]" />
      </div>
    </div>
  );
}
