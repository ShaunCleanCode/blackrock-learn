import { Fragment } from "react";

/**
 * Minimal rich text renderer:
 * - Supports **bold** segments, rendered as BlackRock-style highlighted terms.
 * - Keeps everything else as plain text.
 */
export function RichText({ text }: { text: string }) {
  // Split by **...** segments
  const parts: Array<{ kind: "text" | "bold"; value: string }> = [];
  const re = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ kind: "text", value: text.slice(lastIndex, match.index) });
    }
    parts.push({ kind: "bold", value: match[1] ?? "" });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({ kind: "text", value: text.slice(lastIndex) });
  }

  return (
    <>
      {parts.map((p, idx) => (
        <Fragment key={`${p.kind}-${idx}`}>
          {p.kind === "bold" ? (
            <span className="font-black text-[color:var(--foreground)] border-b-2 border-[var(--br-yellow)] px-0.5 inline-block">
              {p.value}
            </span>
          ) : (
            p.value
          )}
        </Fragment>
      ))}
    </>
  );
}

