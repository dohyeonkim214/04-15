export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-100 px-6 py-16 text-slate-900">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 rounded-[2rem] border border-slate-200/70 bg-white/80 p-8 shadow-2xl shadow-slate-200/60 backdrop-blur md:p-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-5">
            <span className="inline-flex w-fit rounded-full bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white">
              Full Stack Portfolio
            </span>
            <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              도현의 포트폴리오에 오신 것을 환영합니다.
            </h1>
            <p className="text-base leading-8 text-slate-600 md:text-lg">
              Next.js와 Tailwind CSS를 활용해 프론트엔드와 백엔드를 함께 다루는 개발자로 성장하는 과정을 담고 있습니다.
              깔끔한 UI와 실용적인 기능 구현을 함께 보여주는 공간입니다.
            </p>
          </div>

          <div className="grid gap-4 rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-300/40 sm:grid-cols-2 lg:w-[360px] lg:grid-cols-1">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Focus</p>
              <p className="mt-2 text-2xl font-bold">React · Next.js · Node.js</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Goal</p>
              <p className="mt-2 text-lg leading-7 text-slate-200">
                사용하기 쉽고 유지보수하기 좋은 웹 서비스를 만드는 것.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">UI 구현</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              반응형 레이아웃, 컴포넌트 구조화, 사용자 경험을 고려한 화면 설계를 연습합니다.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">상태 관리</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              React 훅과 컴포넌트 흐름을 이해하고, 데이터 변화에 맞는 인터페이스를 구성합니다.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">실전 프로젝트</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              학습용 예제를 넘어 실제 포트폴리오에 담을 수 있는 결과물을 만드는 데 집중하고 있습니다.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
