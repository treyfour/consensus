import { notFound } from "next/navigation";
import { Stub } from "@/components/Stub";

const DIRECTIONS = {
  rail: {
    letter: "A",
    name: "The Rail",
    question: "How does curation happen without leaving the thread?",
    note: "Persistent panel beside the thread holding the deduped Source set with decisions, notes, provenance and recurrence. Closest to today's IA — and the spine of the direction being built deep.",
  },
  margin: {
    letter: "B",
    name: "The Margin",
    question: "What if curation were a byproduct of reading?",
    note: "Notes live in the thread margin, anchored to the sentences and citations that produced them. The Source set is derived from what you annotated rather than what you browsed.",
  },
  board: {
    letter: "C",
    name: "The Board",
    question: "Where does understanding live, as opposed to evidence?",
    note: "Sources become cards on a canvas you arrange, fed by the thread and seeded by the Citation Graph. Most differentiated, highest build cost, considered and deferred.",
  },
  ledger: {
    letter: "D",
    name: "The Ledger",
    question: "How do you defend this set to your advisor?",
    note: "Keyboard-driven triage — Keep, Maybe, Exclude with reasons — producing a methods trail as a byproduct. Its decision vocabulary is carried into the built direction.",
  },
} as const;

export function generateStaticParams() {
  return Object.keys(DIRECTIONS).map((slug) => ({ slug }));
}

export default async function DirectionPage({
  params,
}: PageProps<"/directions/[slug]">) {
  const { slug } = await params;
  const direction = DIRECTIONS[slug as keyof typeof DIRECTIONS];
  if (!direction) notFound();

  return (
    <Stub
      eyebrow={`Direction ${direction.letter}`}
      title={`${direction.name} — ${direction.question}`}
      note={direction.note}
      slice="Slice 3"
    />
  );
}
