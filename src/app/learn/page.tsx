"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LearnIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/learn/introduction");
  }, [router]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <p className="text-sm text-zinc-600">
        이동 중… 만약 자동으로 이동하지 않으면{" "}
        <Link href="/learn/introduction" className="font-semibold text-zinc-900">
          소개 페이지로 이동
        </Link>
        해주세요.
      </p>
    </main>
  );
}

