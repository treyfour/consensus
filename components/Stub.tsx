import Link from "next/link";

/**
 * Slice 0 placeholder. Every route in the plan exists and is reachable before
 * any of them is built, so the arc can be walked end to end while it's still
 * cheap to change. Replaced screen by screen in Slice 2 onward.
 */
export function Stub({
  eyebrow,
  title,
  note,
  slice,
}: {
  eyebrow: string;
  title: string;
  note: string;
  slice: string;
}) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-md py-xxx-lg">
      <Link
        href="/"
        className="font-mono text-xx-sm uppercase tracking-widest text-fg-muted transition-colors hover:text-fg-base"
      >
        ← Index
      </Link>

      <p className="mt-xx-lg font-mono text-xx-sm uppercase tracking-widest text-accent-fg">
        {eyebrow}
      </p>
      <h1 className="mt-x-sm text-h-sm font-bold tracking-tight">{title}</h1>
      <p className="mt-sm max-w-xl text-base text-fg-muted">{note}</p>

      <p className="mt-xx-lg inline-flex w-fit items-center gap-xx-sm rounded-circle border border-border-base bg-bg-mist px-sm py-xxx-sm font-mono text-xx-sm text-fg-muted">
        Not built yet · {slice}
      </p>
    </main>
  );
}
