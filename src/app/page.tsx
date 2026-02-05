export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">
          BlackRock 2026 Global Outlook (학습형 요약)
        </h1>
        <p className="text-zinc-600">
          Cursor Learn 스타일로 번역/요약/퀴즈/챗봇을 붙인 문서형 사이트 프로토타입입니다.
        </p>
        <a
          href="/learn/introduction"
          className="inline-flex h-11 w-fit items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800"
        >
          학습 시작하기
        </a>
      </div>
    </main>
  );
}
