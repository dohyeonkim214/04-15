import { Button } from "@/components/ui/button";

function Section({ title, children }) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
        {title}
      </h2>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </section>
  );
}

export default function ShadcnTestPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-4xl space-y-12">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">
            Button — 모든 사용법
          </h1>
          <p className="mt-2 text-slate-500">
            shadcn/ui <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm">Button</code> 컴포넌트의 variant, size, 상태, 아이콘 등 모든 옵션을 정리한 페이지입니다.
          </p>
        </div>

        {/* ── Variants ── */}
        <Section title="Variant">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </Section>

        {/* ── Sizes ── */}
        <Section title="Size">
          <Button size="xs">XSmall</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </Section>

        {/* ── Icon sizes ── */}
        <Section title="Icon Size (아이콘 전용 정사각형)">
          <Button size="icon-xs" aria-label="icon-xs">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
            </svg>
          </Button>
          <Button size="icon-sm" aria-label="icon-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
            </svg>
          </Button>
          <Button size="icon" aria-label="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
            </svg>
          </Button>
          <Button size="icon-lg" aria-label="icon-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
            </svg>
          </Button>
        </Section>

        {/* ── With Icon (inline) ── */}
        <Section title="With Icon (텍스트 + 아이콘)">
          <Button variant="default">
            <svg data-icon="inline-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            아이콘 왼쪽
          </Button>
          <Button variant="outline">
            아이콘 오른쪽
            <svg data-icon="inline-end" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Button>
          <Button variant="secondary">
            <svg data-icon="inline-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            다운로드
          </Button>
        </Section>

        {/* ── Disabled ── */}
        <Section title="Disabled 상태">
          <Button variant="default" disabled>Default (disabled)</Button>
          <Button variant="outline" disabled>Outline (disabled)</Button>
          <Button variant="destructive" disabled>Destructive (disabled)</Button>
          <Button size="icon" disabled aria-label="disabled icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
            </svg>
          </Button>
        </Section>

        {/* ── aria-invalid ── */}
        <Section title="aria-invalid (유효성 오류 표시)">
          <Button aria-invalid="true">Default + invalid</Button>
          <Button variant="outline" aria-invalid="true">Outline + invalid</Button>
        </Section>

        {/* ── asChild ── */}
        <Section title="asChild (다른 태그로 렌더링)">
          <Button asChild variant="default">
            <a href="#">링크처럼 생긴 버튼 (asChild + &lt;a&gt;)</a>
          </Button>
          <Button asChild variant="outline">
            <a href="#" target="_blank" rel="noopener noreferrer">새 탭으로 열기</a>
          </Button>
        </Section>

        {/* ── Variant × Size matrix ── */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Variant × Size 조합
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400">
                  <th className="pb-4 pr-6 font-semibold">variant \ size</th>
                  {["xs", "sm", "default", "lg"].map((s) => (
                    <th key={s} className="pb-4 pr-4 font-semibold">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="space-y-3">
                {["default", "secondary", "outline", "ghost", "destructive", "link"].map((v) => (
                  <tr key={v}>
                    <td className="py-2 pr-6 font-mono text-xs text-slate-500">{v}</td>
                    {["xs", "sm", "default", "lg"].map((s) => (
                      <td key={s} className="py-2 pr-4">
                        <Button variant={v} size={s}>{v}</Button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
