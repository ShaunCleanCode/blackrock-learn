"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { SidebarNav } from "@/components/SidebarNav";
import { ChatPanel } from "@/components/ChatPanel";
import { LearnContextProvider, useLearnContext } from "@/components/LearnContext";
import type { DocNavItem } from "@/content/docs";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

function ChatPanelWithContext() {
  const { docTitle, docSlug, selectionText } = useLearnContext();
  return (
    <ChatPanel
      contextTitle={docTitle}
      contextSlug={docSlug}
      selectionText={selectionText}
    />
  );
}

export function LearnShell({
  children,
  navTree,
}: {
  children: ReactNode;
  navTree: DocNavItem[];
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  return (
    <LearnContextProvider>
      <div className="h-dvh bg-[var(--background)]">
        {/* Top bar (mobile-first). Apple-ish: translucent + subtle border */}
        <div className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/70 backdrop-blur-xl">
          <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-[var(--br-black)] px-2.5 py-1 text-[11px] font-black tracking-tight text-[var(--br-yellow)]">
                BlackRock.
              </span>
              <span className="text-xs font-black tracking-[0.14em] text-[color:var(--foreground)]">
                2026 GLOBAL OUTLOOK
              </span>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setMobileNavOpen(true)}
              >
                목차
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setMobileChatOpen(true)}
              >
                Ask AI
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto grid h-[calc(100dvh-56px)] max-w-[1440px] grid-cols-1 lg:h-[calc(100dvh-56px)] lg:grid-cols-[280px_1fr_360px]">
          <aside className="hidden h-full border-r border-[var(--border)] bg-[var(--card)] lg:block">
            <SidebarNav tree={navTree} />
          </aside>

          <main className="h-full overflow-auto bg-[var(--background)]">
            <div className="pointer-events-none absolute inset-x-0 top-14 h-40 bg-gradient-to-b from-white/70 to-transparent" />
            {children}
          </main>

          <aside className="hidden h-full bg-[var(--card)] lg:block">
            <ChatPanelWithContext />
          </aside>
        </div>

        {/* Mobile drawers */}
        <div
          className={cn(
            "fixed inset-0 z-50 lg:hidden",
            (mobileNavOpen || mobileChatOpen) ? "pointer-events-auto" : "pointer-events-none",
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity",
              (mobileNavOpen || mobileChatOpen) ? "opacity-100" : "opacity-0",
            )}
            onClick={() => {
              setMobileNavOpen(false);
              setMobileChatOpen(false);
            }}
          />

          {/* Left nav */}
          <div
            className={cn(
              "absolute left-0 top-0 h-full w-[82%] max-w-[340px] border-r border-[var(--border)] bg-[var(--card)] shadow-2xl transition-transform",
              mobileNavOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
              <div className="text-sm font-semibold text-[color:var(--foreground)]">
                목차
              </div>
              <Button variant="ghost" size="sm" onClick={() => setMobileNavOpen(false)}>
                닫기
              </Button>
            </div>
            <SidebarNav tree={navTree} />
          </div>

          {/* Right chat */}
          <div
            className={cn(
              "absolute right-0 top-0 h-full w-[92%] max-w-[420px] border-l border-[var(--border)] bg-[var(--card)] shadow-2xl transition-transform",
              mobileChatOpen ? "translate-x-0" : "translate-x-full",
            )}
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
              <div className="text-sm font-semibold text-[color:var(--foreground)]">
                Ask AI
              </div>
              <Button variant="ghost" size="sm" onClick={() => setMobileChatOpen(false)}>
                닫기
              </Button>
            </div>
            <ChatPanelWithContext />
          </div>
        </div>
      </div>
    </LearnContextProvider>
  );
}

