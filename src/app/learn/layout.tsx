import type { ReactNode } from "react";
import { LearnShell } from "@/components/LearnShell";
import { navTree } from "@/content/docs";

export default function LearnLayout({ children }: { children: ReactNode }) {
  return <LearnShell navTree={navTree}>{children}</LearnShell>;
}

