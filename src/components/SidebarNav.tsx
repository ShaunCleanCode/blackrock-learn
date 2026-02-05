"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DocNavItem } from "@/content/docs";
import { cn } from "@/lib/cn";

function isDoc(item: DocNavItem): item is Extract<DocNavItem, { type: "doc" }> {
  return item.type === "doc";
}

function flattenDocs(items: DocNavItem[]): Extract<DocNavItem, { type: "doc" }>[] {
  const out: Extract<DocNavItem, { type: "doc" }>[] = [];
  for (const item of items) {
    if (isDoc(item)) out.push(item);
    else out.push(...flattenDocs(item.items));
  }
  return out;
}

export function SidebarNav({ tree }: { tree: DocNavItem[] }) {
  const pathname = usePathname();
  const activeSlug =
    pathname?.startsWith("/learn/") ? pathname.replace("/learn/", "") : "";

  const all = flattenDocs(tree);

  return (
    <nav className="flex h-full flex-col gap-6">
      <div className="px-4 pt-4">
        <Link href="/" className="inline-flex items-center gap-3">
          <span className="rounded-md bg-[var(--br-black)] px-2.5 py-1 text-[11px] font-black tracking-tight text-[var(--br-yellow)]">
            BlackRock.
          </span>
          <span className="text-sm font-semibold text-[color:var(--foreground)]">
            2026 Global Outlook
          </span>
        </Link>
      </div>

      <div className="px-3">
        <input
          placeholder="Search docs… (coming soon)"
          className="h-9 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[color:var(--foreground)] placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-[var(--ring)]"
          disabled
        />
      </div>

      <div className="flex-1 overflow-auto px-2 pb-6">
        <ul className="flex flex-col gap-2">
          {tree.map((node) => (
            <SidebarNode key={`${node.type}-${node.title}`} node={node} activeSlug={activeSlug} />
          ))}
        </ul>
      </div>

      <div className="border-t border-zinc-200 px-4 py-3 text-xs text-zinc-500">
        <div className="flex items-center justify-between">
          <span>Prototype</span>
          <span>{all.length} docs</span>
        </div>
      </div>
    </nav>
  );
}

function SidebarNode({
  node,
  activeSlug,
}: {
  node: DocNavItem;
  activeSlug: string;
}) {
  if (node.type === "group") {
    return (
      <li className="mt-2">
        <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-zinc-500">
          {node.title}
        </div>
        <ul className="flex flex-col gap-1">
          {node.items.map((child) => (
            <SidebarNode
              key={`${child.type}-${child.title}`}
              node={child}
              activeSlug={activeSlug}
            />
          ))}
        </ul>
      </li>
    );
  }

  const isActive = activeSlug === node.slug;
  return (
    <li>
      <Link
        href={`/learn/${node.slug}`}
        className={cn(
          "block rounded-xl px-3 py-2 text-sm transition-all",
          "hover:-translate-y-[1px]",
          isActive
            ? "bg-[var(--br-black)] text-white shadow-sm"
            : "text-zinc-700 hover:bg-[var(--muted)] hover:text-[color:var(--foreground)]",
        )}
      >
        <span className="inline-flex items-center gap-2">
          {isActive && (
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--br-yellow)] shadow-[0_0_10px_rgba(255,209,0,0.35)]" />
          )}
          {node.title}
        </span>
      </Link>
    </li>
  );
}

