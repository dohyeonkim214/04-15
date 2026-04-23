export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-16 text-slate-900">
      <section className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
            About Me
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            안녕하세요, AI 풀스택 개발자 도현입니다.
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-600 md:text-lg">
            사용자에게 직관적인 화면을 제공하는 프론트엔드와, 안정적으로 데이터를 다루는 백엔드를 함께 공부하고 있습니다.
            새로운 기술을 빠르게 익히고 실제 결과물로 연결하는 과정을 좋아합니다.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-950 p-6 text-white">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Strength
              </h2>
              <p className="mt-3 text-lg font-bold">기획 의도를 화면으로 구체화하는 능력</p>
            </div>
            <div className="rounded-2xl bg-sky-50 p-6 text-slate-900">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                Interest
              </h2>
              <p className="mt-3 text-lg font-bold">AI 서비스, 웹 앱, 사용자 중심 인터페이스</p>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-5 rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl shadow-slate-300 md:p-10">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Core Stack</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">Next.js</span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">React</span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">JavaScript</span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">Tailwind CSS</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Working Style</p>
            <p className="mt-3 leading-7 text-slate-200">
              작은 기능도 직접 만들어 보며 구조를 이해하고, 반복 개선을 통해 더 좋은 결과를 만드는 방식으로 학습합니다.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Message</p>
            <p className="mt-3 leading-7 text-slate-200">
              보기 좋은 화면을 넘어서 실제로 동작하고 전달력 있는 웹 경험을 만드는 개발자가 되는 것이 목표입니다.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
