import Link from "next/link";

const DIRECTIONS = [
  {
    slug: "rail",
    letter: "A",
    name: "The Rail",
    question: "How does curation happen without leaving the thread?",
  },
  {
    slug: "margin",
    letter: "B",
    name: "The Margin",
    question: "What if curation were a byproduct of reading?",
  },
  {
    slug: "board",
    letter: "C",
    name: "The Board",
    question: "Where does understanding live, as opposed to evidence?",
  },
  {
    slug: "ledger",
    letter: "D",
    name: "The Ledger",
    question: "How do you defend this set to your advisor?",
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-md py-xxx-lg">
      <p className="font-mono text-xx-sm uppercase tracking-widest text-fg-muted">
        Design challenge
      </p>
      <h1 className="mt-x-sm text-h-base font-bold tracking-tight">
        Rethinking the Research Thread
      </h1>
      <p className="mt-sm max-w-xl text-base text-fg-muted">
        Consensus remembers papers. It doesn&rsquo;t remember research.
      </p>

      <nav className="mt-xxx-lg flex flex-col gap-x-sm">
        <Link
          href="/deck"
          className="flex items-baseline justify-between rounded-md border border-border-base bg-bg-mist px-md py-sm transition-colors hover:border-border-emphasis"
        >
          <span className="text-base font-medium">Presentation</span>
          <span className="text-x-sm text-fg-muted">
            problem, process, directions, concept
          </span>
        </Link>
        <Link
          href="/thread"
          className="flex items-baseline justify-between rounded-md border border-accent-border-muted bg-accent-bg-subtle px-md py-sm transition-colors hover:border-accent-border"
        >
          <span className="text-base font-medium text-accent-fg">
            The built experience
          </span>
          <span className="text-x-sm text-fg-muted">five key states</span>
        </Link>
      </nav>

      <h2 className="mt-xxx-lg text-h-xx-sm font-bold">Directions explored</h2>
      <ul className="mt-md grid gap-x-sm sm:grid-cols-2">
        {DIRECTIONS.map((d) => (
          <li key={d.slug}>
            <Link
              href={`/directions/${d.slug}`}
              className="flex h-full flex-col rounded-md border border-border-base px-md py-sm transition-colors hover:bg-bg-mist"
            >
              <span className="font-mono text-xx-sm text-fg-muted">
                {d.letter}
              </span>
              <span className="mt-xxx-sm text-base font-medium">{d.name}</span>
              <span className="mt-xx-sm text-x-sm text-fg-muted">
                {d.question}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <footer className="mt-xxx-lg border-t border-border-base pt-md">
        <p className="text-x-sm text-fg-muted">
          Built on Consensus&rsquo;s own design language — 145 CDL tokens
          extracted from the live product. Figtree substitutes for the licensed
          CircularXXWeb; Reddit Mono is exact.
        </p>
      </footer>
    </main>
  );
}
