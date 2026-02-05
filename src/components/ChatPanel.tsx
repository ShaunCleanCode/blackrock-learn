"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function uid() {
  return Math.random().toString(16).slice(2);
}

export function ChatPanel({
  contextTitle,
  contextSlug,
  selectionText,
}: {
  contextTitle?: string;
  contextSlug?: string;
  selectionText?: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "안녕하세요! 읽다가 모르는 용어/개념이 있으면 바로 물어보세요. (현재는 UI 프로토타입이라 답변은 데모입니다.)",
    },
  ]);

  const header = useMemo(() => {
    const parts: string[] = [];
    if (contextTitle) parts.push(contextTitle);
    if (contextSlug) parts.push(contextSlug);
    return parts.join(" · ");
  }, [contextTitle, contextSlug]);

  if (!isOpen) {
    return (
      <div className="flex h-full items-start justify-end p-3">
        <Button
          type="button"
          onClick={() => setIsOpen(true)}
          variant="secondary"
          size="sm"
        >
          채팅 열기
        </Button>
      </div>
    );
  }

  return (
    <aside className="flex h-full flex-col border-l border-[var(--border)] bg-[var(--card)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--br-black)] px-4 py-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--br-yellow)] shadow-[0_0_14px_rgba(255,209,0,0.45)]" />
            <div className="text-xs font-black tracking-[0.14em] text-white/90">
              AI STRATEGIST
            </div>
          </div>
          {header && (
            <div className="truncate text-xs text-white/60">{header}</div>
          )}
        </div>
        <Button
          type="button"
          onClick={() => setIsOpen(false)}
          variant="ghost"
          size="sm"
          className="text-white/80 hover:bg-white/10"
        >
          접기
        </Button>
      </div>

      <div className="flex-1 overflow-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "max-w-[95%] rounded-2xl px-4 py-3 text-sm leading-6",
                m.role === "user"
                  ? "ml-auto bg-[var(--br-black)] text-white shadow-sm"
                  : "mr-auto bg-[var(--muted)] text-[color:var(--foreground)] border border-[var(--border)]",
              )}
            >
              {m.content}
            </div>
          ))}
        </div>
      </div>

      <form
        className="border-t border-[var(--border)] bg-[var(--card)] p-3"
        onSubmit={(e) => {
          e.preventDefault();
          const text = input.trim();
          if (!text) return;
          setInput("");

          const userMsg: ChatMessage = { id: uid(), role: "user", content: text };
          setMessages((prev) => [...prev, userMsg]);

          // TODO: wire to /api/chat with prompt-engineered system + page context.
          const demo: ChatMessage = {
            id: uid(),
            role: "assistant",
            content:
              selectionText
                ? `데모 응답: 선택한 텍스트("${selectionText.slice(0, 120)}${selectionText.length > 120 ? "…" : ""}")를 컨텍스트로 받아서 답변하게 만들 예정입니다.`
                : "데모 응답: 지금은 챗봇 백엔드 연결 전이라서, 다음 단계에서 페이지 컨텍스트(섹션/선택 텍스트) 기반으로 답변하도록 붙일게요.",
          };
          setMessages((prev) => [...prev, demo]);
        }}
      >
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="문서 내용에 대해 질문해보세요…"
            className="min-h-[44px] max-h-32 flex-1 resize-none rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[color:var(--foreground)] placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-[var(--ring)]"
          />
          <Button type="submit" variant="primary" size="md">
            전송
          </Button>
        </div>
        {selectionText && (
          <div className="mt-2 text-xs text-[color:var(--muted-foreground)]">
            선택 컨텍스트:{" "}
            <span className="font-medium text-[color:var(--foreground)]">
              {selectionText.length > 140
                ? `${selectionText.slice(0, 140)}…`
                : selectionText}
            </span>
          </div>
        )}
      </form>
    </aside>
  );
}

