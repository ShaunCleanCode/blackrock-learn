"use client";

import { useMemo, useState } from "react";
import type { QuizChoice } from "@/content/docs";
import { Button } from "@/components/ui/Button";
import { Surface } from "@/components/ui/Surface";
import { cn } from "@/lib/cn";

export function QuizBlock({
  id,
  question,
  choices,
  correctChoiceId,
  explanation,
}: {
  id: string;
  question: string;
  choices: QuizChoice[];
  correctChoiceId: string;
  explanation: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const isCorrect = useMemo(() => {
    if (!checked || !selected) return null;
    return selected === correctChoiceId;
  }, [checked, selected, correctChoiceId]);

  return (
    <Surface aria-label="Quiz" className="p-6" data-quiz-id={id}>
      <div className="mb-3 inline-flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[var(--br-yellow)] shadow-[0_0_14px_rgba(255,209,0,0.45)]" />
        <div className="text-[11px] font-semibold tracking-[0.18em] text-[color:var(--muted-foreground)]">
          CHECK YOUR KNOWLEDGE
        </div>
      </div>
      <div className="text-[17px] font-semibold tracking-tight text-[color:var(--foreground)]">
        {question}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {choices.map((c) => {
          const isSelected = selected === c.id;
          const showState = checked && selected;
          const isCorrectChoice = c.id === correctChoiceId;

          const borderClass = !showState
            ? isSelected
              ? "border-zinc-900"
              : "border-zinc-200"
            : isCorrectChoice
              ? "border-emerald-500"
              : isSelected
                ? "border-rose-500"
                : "border-zinc-200";

          const bgClass = !showState
            ? isSelected
              ? "bg-zinc-50"
              : "bg-white"
            : isCorrectChoice
              ? "bg-emerald-50"
              : isSelected
                ? "bg-rose-50"
                : "bg-white";

          return (
            <button
              key={c.id}
              type="button"
              className={cn(
                "text-left rounded-2xl border px-4 py-3 transition-all",
                "hover:-translate-y-[1px] hover:shadow-sm",
                borderClass,
                bgClass,
              )}
              onClick={() => {
                if (checked) return;
                setSelected(c.id);
              }}
            >
              <div className="text-sm text-[color:var(--foreground)]">{c.text}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Button
          type="button"
          variant="primary"
          size="sm"
          disabled={!selected}
          onClick={() => setChecked(true)}
        >
          Check
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => {
            setSelected(null);
            setChecked(false);
          }}
        >
          Reset
        </Button>
        {isCorrect !== null && (
          <span
            className={cn(
              "ml-1 text-sm font-medium",
              isCorrect ? "text-emerald-700" : "text-rose-700",
            )}
          >
            {isCorrect ? "정답!" : "다시 한번!"}
          </span>
        )}
      </div>

      {checked && (
        <div className="mt-5 overflow-hidden rounded-2xl border border-[var(--border)] bg-[color:var(--br-black)]">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-[var(--br-yellow)]" />
            <span className="text-xs font-semibold tracking-[0.12em] text-white/80">
              BLACKROCK INSIGHT
            </span>
          </div>
          <div className="border-l-4 border-[var(--br-yellow)] px-4 py-4 text-sm leading-6 text-zinc-200">
            {explanation}
          </div>
        </div>
      )}
    </Surface>
  );
}

