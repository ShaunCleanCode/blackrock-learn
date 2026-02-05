"use client";

import type { DocBlock } from "@/content/docs";
import { QuizBlock } from "@/components/QuizBlock";
import { RichText } from "@/components/RichText";
import { cn } from "@/lib/cn";

export function DocRenderer({ blocks }: { blocks: DocBlock[] }) {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="flex flex-col gap-5">
        {blocks.map((b, idx) => (
          <Block key={`${b.type}-${idx}`} block={b} />
        ))}
      </div>
    </article>
  );
}

function Block({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "h1":
      return (
        <div className="pt-2">
          {block.kicker && (
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--br-black)] px-3 py-1 text-[10px] font-black tracking-[0.18em] text-[var(--br-yellow)]">
              {block.kicker}
            </div>
          )}
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[color:var(--foreground)]">
            {block.text}
          </h1>
        </div>
      );
    case "h2":
      return (
        <h2 className="mt-8 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-5 text-xl font-semibold tracking-tight text-[color:var(--foreground)]">
          {block.text}
        </h3>
      );
    case "lead":
      return (
        <p className="text-lg leading-8 text-[color:var(--muted-foreground)]">
          <RichText text={block.text} />
        </p>
      );
    case "p":
      return (
        <p className="text-[15px] leading-7 text-zinc-700">
          <RichText text={block.text} />
        </p>
      );
    case "ul":
      return (
        <ul className="mt-1 space-y-3">
          {block.items.map((item, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--br-yellow)] shadow-[0_0_10px_rgba(255,209,0,0.35)]" />
              <span className="text-[15px] leading-7 text-zinc-700">
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "divider":
      return <hr className="my-4 border-[var(--border)]" />;
    case "callout":
      return (
        <div
          className={cn(
            "rounded-2xl border border-[color-mix(in_srgb,var(--br-yellow)_35%,var(--border))] bg-[color-mix(in_srgb,var(--br-yellow)_10%,white)] p-5",
          )}
        >
          <div className="text-sm font-semibold text-[color:var(--foreground)]">
            <RichText text={block.title} />
          </div>
          <div className="mt-2 text-sm leading-6 text-[color:var(--muted-foreground)]">
            <RichText text={block.body} />
          </div>
        </div>
      );
    case "quiz":
      return (
        <QuizBlock
          id={block.id}
          question={block.question}
          choices={block.choices}
          correctChoiceId={block.correctChoiceId}
          explanation={block.explanation}
        />
      );
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

