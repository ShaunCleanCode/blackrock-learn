"use client";

import { useEffect } from "react";
import type { DocPage } from "@/content/docs";
import { DocRenderer } from "@/components/DocRenderer";
import { useLearnContext } from "@/components/LearnContext";

export function DocPageClient({ doc }: { doc: DocPage }) {
  const { setDocContext, setSelectionText } = useLearnContext();

  useEffect(() => {
    setDocContext({ docTitle: doc.title, docSlug: doc.slug });
    setSelectionText(undefined);
  }, [doc.slug, doc.title, setDocContext, setSelectionText]);

  return (
    <div
      onMouseUp={() => {
        const selection = window.getSelection?.();
        const text = selection?.toString().trim();
        if (text) setSelectionText(text);
        else setSelectionText(undefined);
      }}
      onKeyUp={(e) => {
        if (e.key === "Escape") setSelectionText(undefined);
      }}
      tabIndex={-1}
    >
      <DocRenderer blocks={doc.blocks} />
    </div>
  );
}

