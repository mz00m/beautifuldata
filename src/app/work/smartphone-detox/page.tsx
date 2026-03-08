"use client";

import { useState, useEffect } from "react";

/* ─────────────── animated number ─────────────── */

function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 1200,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value, duration]);
  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ─────────────── donut chart ─────────────── */

function DonutChart({
  percentage,
  size = 180,
  strokeWidth = 14,
  color = "#0d9488",
  label,
  sublabel,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label: string;
  sublabel?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="-mt-[116px] mb-[46px] text-center">
        <p className="text-3xl font-bold text-slate-800">
          {percentage}%
        </p>
      </div>
      <p className="mt-1 text-center text-sm font-semibold text-slate-700">
        {label}
      </p>
      {sublabel && (
        <p className="mt-0.5 text-center text-xs text-slate-400">
          {sublabel}
        </p>
      )}
    </div>
  );
}

/* ─────────────── pill stat ─────────────── */

function PillStat({
  value,
  label,
  color = "bg-teal-50 text-teal-700",
}: {
  value: string;
  label: string;
  color?: string;
}) {
  return (
    <div className="text-center">
      <span
        className={`inline-block rounded-full px-5 py-2 text-xl font-bold ${color}`}
      >
        {value}
      </span>
      <p className="mt-2 text-sm text-slate-500">{label}</p>
    </div>
  );
}

/* ─────────────── simple horizontal bar ─────────────── */

function SimpleBar({
  label,
  value,
  maxValue,
  unit,
  color,
  annotation,
}: {
  label: string;
  value: number;
  maxValue: number;
  unit: string;
  color: string;
  annotation?: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-sm text-slate-600">{label}</span>
        <span className="text-lg font-bold text-slate-800">
          {value} <span className="text-sm font-normal text-slate-400">{unit}</span>
        </span>
      </div>
      <div className="h-8 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="flex h-full items-center rounded-full transition-all duration-700"
          style={{
            width: `${(value / maxValue) * 100}%`,
            backgroundColor: color,
          }}
        />
      </div>
      {annotation && (
        <p className="mt-1 text-xs text-slate-400">{annotation}</p>
      )}
    </div>
  );
}

/* ─────────────── icon row (person icons) ─────────────── */

function PersonGrid({
  total,
  highlighted,
  color = "#0d9488",
}: {
  total: number;
  highlighted: number;
  color?: string;
}) {
  return (
    <div className="flex flex-wrap gap-[3px]">
      {Array.from({ length: total }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 16 16">
          <circle
            cx="8"
            cy="5"
            r="3"
            fill={i < highlighted ? color : "#e2e8f0"}
          />
          <path
            d="M 2 14 Q 2 9 8 9 Q 14 9 14 14"
            fill={i < highlighted ? color : "#e2e8f0"}
          />
        </svg>
      ))}
    </div>
  );
}

/* ─────────────── page ─────────────── */

export default function SmartphoneDetoxStudy() {
  const [activeSection] = useState(0);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#fafbfc", color: "#1e293b" }}
    >
      {/* Nav */}
      <nav
        className="fixed top-0 z-50 w-full border-b backdrop-blur-lg"
        style={{
          backgroundColor: "rgba(250,251,252,0.85)",
          borderColor: "#e2e8f0",
        }}
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <a href="/" className="text-lg font-semibold text-slate-800">
            Beautiful<span className="font-normal text-teal-600">Data</span>
          </a>
          <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Case Study
          </span>
        </div>
      </nav>

      {/* ━━━━━ HERO ━━━━━ */}
      <section className="px-6 pb-16 pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-teal-600">
            Research Visualization
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            What happens when you turn off
            <br />
            your phone&apos;s internet for two weeks?
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-500">
            Researchers gave 467 people a simple challenge: block the internet
            on your smartphone for 14 days. The results were striking.
          </p>
        </div>
      </section>

      {/* ━━━━━ THE BIG NUMBER ━━━━━ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div
            className="overflow-hidden rounded-3xl px-8 py-14 text-center"
            style={{ backgroundColor: "#f0fdfa" }}
          >
            <p className="text-8xl font-extrabold text-teal-600 sm:text-9xl">
              91%
            </p>
            <p className="mt-4 text-xl font-medium text-teal-800">
              of participants improved on at least one outcome
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm text-teal-600/70">
              Well-being, mental health, or the ability to focus — nearly
              everyone got better at something.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━━━ SCREEN TIME BEFORE & AFTER ━━━━━ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">
            Phone use dropped in half
          </h2>
          <p className="mt-3 max-w-xl text-base text-slate-500">
            Participants went from over 5 hours of daily screen time to under
            3 — and even after the block was lifted, they didn&apos;t fully
            bounce back.
          </p>

          <div className="mt-10 space-y-8">
            <SimpleBar
              label="Before the intervention"
              value={314}
              maxValue={360}
              unit="min/day"
              color="#94a3b8"
            />
            <SimpleBar
              label="During the intervention"
              value={161}
              maxValue={360}
              unit="min/day"
              color="#0d9488"
              annotation="49% less daily screen time"
            />
            <SimpleBar
              label="Two weeks after"
              value={265}
              maxValue={360}
              unit="min/day"
              color="#5eead4"
              annotation="Still 16% below baseline"
            />
          </div>
        </div>
      </section>

      {/* ━━━━━ THREE BIG WINS ━━━━━ */}
      <section className="px-6 py-16" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">
            Three things got better
          </h2>
          <p className="mt-3 max-w-xl text-base text-slate-500">
            The researchers measured well-being, mental health, and focused
            attention — all three improved significantly during the internet
            block.
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {/* Well-being */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
              <div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
                style={{ backgroundColor: "#fef3c7" }}
              >
                <span role="img" aria-label="sunshine">&#9728;&#65039;</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-800">
                Well-Being
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Life satisfaction and positive feelings went up
              </p>
              <div className="mt-4 rounded-xl bg-amber-50 px-4 py-3">
                <p className="text-2xl font-extrabold text-amber-600">73%</p>
                <p className="text-xs text-amber-700/70">felt better</p>
              </div>
            </div>

            {/* Mental Health */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
              <div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
                style={{ backgroundColor: "#dbeafe" }}
              >
                <span role="img" aria-label="brain">&#129504;</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-800">
                Mental Health
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Less anxiety, depression, and anger
              </p>
              <div className="mt-4 rounded-xl bg-blue-50 px-4 py-3">
                <p className="text-2xl font-extrabold text-blue-600">71%</p>
                <p className="text-xs text-blue-700/70">improved</p>
              </div>
            </div>

            {/* Attention */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
              <div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
                style={{ backgroundColor: "#d1fae5" }}
              >
                <span role="img" aria-label="target">&#127919;</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-800">
                Focus
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Objectively measured ability to sustain attention
              </p>
              <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3">
                <p className="text-2xl font-extrabold text-emerald-600">59%</p>
                <p className="text-xs text-emerald-700/70">scored higher</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━ STRIKING COMPARISONS ━━━━━ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">
            How big were the effects?
          </h2>
          <p className="mt-3 max-w-xl text-base text-slate-500">
            To put these numbers in context, researchers compared them to
            well-known benchmarks. The results surprised even the authors.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {/* Mental health comparison */}
            <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Mental health improvement
              </p>
              <div className="mt-6 space-y-5">
                <div>
                  <div className="mb-1 flex items-baseline justify-between">
                    <span className="text-sm text-slate-600">
                      This intervention
                    </span>
                    <span className="text-sm font-bold text-teal-700">
                      larger
                    </span>
                  </div>
                  <div className="h-6 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "80%",
                        backgroundColor: "#0d9488",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-baseline justify-between">
                    <span className="text-sm text-slate-600">
                      Antidepressants
                    </span>
                    <span className="text-sm font-medium text-slate-400">
                      (meta-analysis)
                    </span>
                  </div>
                  <div className="h-6 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "46%",
                        backgroundColor: "#cbd5e1",
                      }}
                    />
                  </div>
                </div>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-slate-400">
                The effect on depression symptoms was larger than the average
                effect of antidepressant medication across clinical trials.
              </p>
            </div>

            {/* Attention comparison */}
            <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Attention improvement
              </p>
              <div className="mt-6 flex items-center gap-6">
                <div className="text-center">
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-full"
                    style={{ backgroundColor: "#f0fdfa" }}
                  >
                    <span className="text-3xl font-extrabold text-teal-600">
                      10
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-600">
                    years
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-slate-500">
                  The boost in sustained attention was equivalent to reversing
                  <strong className="text-slate-700">
                    {" "}10 years of age-related decline
                  </strong>
                  , as measured by the same cognitive test.
                </p>
              </div>
              <div className="mt-6 rounded-xl bg-slate-50 px-5 py-4">
                <p className="text-xs leading-relaxed text-slate-500">
                  It also closed about <strong className="text-slate-700">25%</strong> of the gap
                  between healthy adults and those with ADHD on the same
                  attention task.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━ HOW PEOPLE SPENT THEIR TIME ━━━━━ */}
      <section className="px-6 py-16" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">
            Where did the time go?
          </h2>
          <p className="mt-3 max-w-xl text-base text-slate-500">
            Without mobile internet, people didn&apos;t just sit around. They
            replaced screen time with activities that are known to improve
            well-being.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {/* Went up */}
            <div className="rounded-2xl bg-teal-50/60 p-6">
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-teal-700">
                Went up
              </p>
              {[
                { activity: "Socializing in person", icon: "&#128101;" },
                { activity: "Exercise", icon: "&#127939;" },
                { activity: "Time in nature", icon: "&#127795;" },
                { activity: "Hobbies", icon: "&#127912;" },
                { activity: "Reading books", icon: "&#128218;" },
                { activity: "Sleep", icon: "&#128164;" },
              ].map((item) => (
                <div
                  key={item.activity}
                  className="flex items-center gap-3 border-b border-teal-100 py-3 last:border-0"
                >
                  <span
                    className="text-xl"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                  <span className="text-sm font-medium text-teal-800">
                    {item.activity}
                  </span>
                  <svg
                    className="ml-auto h-4 w-4 text-teal-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              ))}
            </div>

            {/* Went down */}
            <div className="rounded-2xl bg-slate-50 p-6">
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                Went down
              </p>
              {[
                { activity: "Watching YouTube", icon: "&#128250;" },
                { activity: "Scrolling news", icon: "&#128240;" },
                { activity: "Watching TV & movies", icon: "&#127910;" },
              ].map((item) => (
                <div
                  key={item.activity}
                  className="flex items-center gap-3 border-b border-slate-200 py-3 last:border-0"
                >
                  <span
                    className="text-xl"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                  <span className="text-sm font-medium text-slate-600">
                    {item.activity}
                  </span>
                  <svg
                    className="ml-auto h-4 w-4 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              ))}
              <div className="mt-5 rounded-xl bg-white px-4 py-3">
                <p className="text-xs text-slate-400">
                  Texting and calling were <strong>not</strong> blocked and
                  stayed the same — the intervention only targeted internet
                  access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━ THE CHAIN: WHY IT WORKS ━━━━━ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">
            The chain reaction
          </h2>
          <p className="mt-3 max-w-xl text-base text-slate-500">
            Blocking mobile internet triggered a cascade of positive changes.
            Each link in the chain contributed to better well-being and mental
            health.
          </p>

          <div className="mt-10">
            <svg viewBox="0 0 700 220" className="w-full">
              {/* Step 1 */}
              <rect
                x={0}
                y={75}
                width={120}
                height={70}
                rx={16}
                fill="#f0fdfa"
                stroke="#99f6e4"
                strokeWidth={1.5}
              />
              <text
                x={60}
                y={105}
                textAnchor="middle"
                fill="#0f766e"
                fontSize={12}
                fontWeight={700}
              >
                Block mobile
              </text>
              <text
                x={60}
                y={122}
                textAnchor="middle"
                fill="#0f766e"
                fontSize={12}
                fontWeight={700}
              >
                internet
              </text>

              {/* Arrow 1 */}
              <path
                d="M 125 110 L 160 110"
                stroke="#99f6e4"
                strokeWidth={2}
                markerEnd="url(#arrowhead)"
              />

              {/* Step 2 */}
              <rect
                x={165}
                y={75}
                width={120}
                height={70}
                rx={16}
                fill="#fff7ed"
                stroke="#fed7aa"
                strokeWidth={1.5}
              />
              <text
                x={225}
                y={100}
                textAnchor="middle"
                fill="#9a3412"
                fontSize={11}
                fontWeight={600}
              >
                Screen time
              </text>
              <text
                x={225}
                y={117}
                textAnchor="middle"
                fill="#9a3412"
                fontSize={11}
                fontWeight={600}
              >
                drops 49%
              </text>
              <text
                x={225}
                y={134}
                textAnchor="middle"
                fill="#c2410c"
                fontSize={10}
              >
                314 → 161 min
              </text>

              {/* Arrow 2 */}
              <path
                d="M 290 110 L 325 110"
                stroke="#fed7aa"
                strokeWidth={2}
                markerEnd="url(#arrowhead2)"
              />

              {/* Step 3: branch */}
              {[
                { y: 10, label: "More time outdoors", fill: "#d1fae5", stroke: "#6ee7b7", textColor: "#065f46" },
                { y: 70, label: "Better self-control", fill: "#e0e7ff", stroke: "#a5b4fc", textColor: "#3730a3" },
                { y: 130, label: "Stronger social ties", fill: "#fce7f3", stroke: "#f9a8d4", textColor: "#9d174d" },
                { y: 190, label: "More sleep", fill: "#fef9c3", stroke: "#fde047", textColor: "#854d0e" },
              ].map((item, i) => (
                <g key={i}>
                  <path
                    d={`M 330 110 Q 345 ${item.y + 22} 360 ${item.y + 22}`}
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth={1.5}
                  />
                  <rect
                    x={360}
                    y={item.y}
                    width={140}
                    height={44}
                    rx={12}
                    fill={item.fill}
                    stroke={item.stroke}
                    strokeWidth={1}
                  />
                  <text
                    x={430}
                    y={item.y + 27}
                    textAnchor="middle"
                    fill={item.textColor}
                    fontSize={11}
                    fontWeight={600}
                  >
                    {item.label}
                  </text>
                  <path
                    d={`M 500 ${item.y + 22} Q 520 ${item.y + 22} 540 110`}
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth={1.5}
                  />
                </g>
              ))}

              {/* Arrow 3 */}
              <path
                d="M 545 110 L 570 110"
                stroke="#99f6e4"
                strokeWidth={2}
                markerEnd="url(#arrowhead)"
              />

              {/* Step 4 */}
              <rect
                x={575}
                y={75}
                width={120}
                height={70}
                rx={16}
                fill="#0d9488"
              />
              <text
                x={635}
                y={105}
                textAnchor="middle"
                fill="white"
                fontSize={12}
                fontWeight={700}
              >
                Better mental
              </text>
              <text
                x={635}
                y={122}
                textAnchor="middle"
                fill="white"
                fontSize={12}
                fontWeight={700}
              >
                health & SWB
              </text>

              {/* Arrowhead defs */}
              <defs>
                <marker
                  id="arrowhead"
                  viewBox="0 0 10 10"
                  refX={10}
                  refY={5}
                  markerWidth={6}
                  markerHeight={6}
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#99f6e4" />
                </marker>
                <marker
                  id="arrowhead2"
                  viewBox="0 0 10 10"
                  refX={10}
                  refY={5}
                  markerWidth={6}
                  markerHeight={6}
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#fed7aa" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* ━━━━━ WHO BENEFITS MOST ━━━━━ */}
      <section className="px-6 py-16" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">
            Who benefited the most?
          </h2>
          <p className="mt-3 max-w-xl text-base text-slate-500">
            People who felt the most &ldquo;Fear of Missing Out&rdquo; (FoMO)
            before the study saw the biggest improvements — perhaps because the
            phone itself was fueling that anxiety.
          </p>

          <div className="mt-10 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <div className="flex flex-col items-center gap-8 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <svg viewBox="0 0 300 180" className="w-full">
                  {/* Gradient bar */}
                  <defs>
                    <linearGradient id="fomo-bar" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ccfbf1" />
                      <stop offset="100%" stopColor="#0d9488" />
                    </linearGradient>
                  </defs>

                  {/* Axis */}
                  <line
                    x1={30}
                    y1={130}
                    x2={270}
                    y2={130}
                    stroke="#e2e8f0"
                    strokeWidth={1}
                  />
                  <text x={30} y={155} fill="#94a3b8" fontSize={10}>
                    Low FoMO
                  </text>
                  <text x={270} y={155} textAnchor="end" fill="#94a3b8" fontSize={10}>
                    High FoMO
                  </text>

                  {/* Rising line */}
                  <path
                    d="M 40 110 Q 150 95 260 40"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth={3}
                    strokeLinecap="round"
                  />

                  {/* Confidence band */}
                  <path
                    d="M 40 120 Q 150 108 260 55 L 260 25 Q 150 82 40 100 Z"
                    fill="#0d9488"
                    opacity={0.08}
                  />

                  {/* Y label */}
                  <text
                    x={15}
                    y={75}
                    fill="#94a3b8"
                    fontSize={9}
                    transform="rotate(-90, 15, 75)"
                  >
                    Improvement
                  </text>
                </svg>
              </div>

              <div className="w-full sm:w-1/2">
                <p className="text-sm leading-relaxed text-slate-600">
                  The relationship was consistent: the more FoMO someone felt at
                  the start, the more their well-being and mental health
                  improved when mobile internet was blocked.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  This held true across the entire range — even people with low
                  FoMO still benefited, just less dramatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━ COMPLIANCE ━━━━━ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">
            Sticking with it was hard
          </h2>
          <p className="mt-3 max-w-xl text-base text-slate-500">
            Only about 1 in 4 participants fully complied for the whole two
            weeks. But here&apos;s the thing: <strong className="text-slate-700">
            even the non-compliant participants improved</strong>. Just reducing
            internet use helped.
          </p>

          <div className="mt-10">
            {/* Funnel */}
            <div className="mx-auto max-w-sm space-y-3">
              {[
                { label: "Signed up", value: 467, pct: 100, color: "#e2e8f0" },
                {
                  label: "Installed the blocking app",
                  value: 266,
                  pct: 57,
                  color: "#99f6e4",
                },
                {
                  label: "Fully compliant (14 days)",
                  value: 119,
                  pct: 25.5,
                  color: "#0d9488",
                },
              ].map((step) => (
                <div key={step.label} className="text-center">
                  <div
                    className="mx-auto flex h-12 items-center justify-center rounded-2xl"
                    style={{
                      width: `${step.pct}%`,
                      backgroundColor: step.color,
                      minWidth: "120px",
                    }}
                  >
                    <span
                      className={`text-sm font-bold ${
                        step.color === "#0d9488" ? "text-white" : "text-slate-700"
                      }`}
                    >
                      {step.value}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{step.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━ MOOD OVER TIME ━━━━━ */}
      <section className="px-6 py-16" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">
            Mood kept improving day by day
          </h2>
          <p className="mt-3 max-w-xl text-base text-slate-500">
            Participants texted how they were feeling four times per week.
            Those blocking the internet felt progressively better — and the
            benefits <strong className="text-slate-700">persisted even after the block was lifted</strong>.
          </p>

          <div className="mt-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <svg viewBox="0 0 600 220" className="w-full">
              {/* Grid */}
              {[5.8, 6.2, 6.6, 7.0].map((val) => {
                const y = 190 - ((val - 5.6) / 1.6) * 170;
                return (
                  <g key={val}>
                    <line
                      x1={45}
                      y1={y}
                      x2={570}
                      y2={y}
                      stroke="#f1f5f9"
                      strokeWidth={1}
                    />
                    <text
                      x={38}
                      y={y + 4}
                      textAnchor="end"
                      fill="#94a3b8"
                      fontSize={10}
                    >
                      {val.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {/* Phase divider */}
              <line
                x1={305}
                y1={10}
                x2={305}
                y2={200}
                stroke="#e2e8f0"
                strokeWidth={1}
                strokeDasharray="4,4"
              />
              <text x={170} y={210} textAnchor="middle" fill="#94a3b8" fontSize={10}>
                Weeks 1–2
              </text>
              <text x={440} y={210} textAnchor="middle" fill="#94a3b8" fontSize={10}>
                Weeks 3–4
              </text>

              {/* Intervention group - Phase 1 (blocked) */}
              {(() => {
                const data = [6.3, 6.4, 6.5, 6.55, 6.6, 6.7, 6.75, 6.8];
                const points = data
                  .map((v, i) => {
                    const x = 55 + i * 32;
                    const y = 190 - ((v - 5.6) / 1.6) * 170;
                    return `${x},${y}`;
                  })
                  .join(" ");
                return (
                  <g>
                    <polyline
                      points={points}
                      fill="none"
                      stroke="#0d9488"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {data.map((v, i) => (
                      <circle
                        key={i}
                        cx={55 + i * 32}
                        cy={190 - ((v - 5.6) / 1.6) * 170}
                        r={3.5}
                        fill="#0d9488"
                      />
                    ))}
                  </g>
                );
              })()}

              {/* Control group - Phase 1 */}
              {(() => {
                const data = [6.1, 6.05, 6.0, 6.0, 5.95, 6.0, 6.05, 6.0];
                const points = data
                  .map((v, i) => {
                    const x = 55 + i * 32;
                    const y = 190 - ((v - 5.6) / 1.6) * 170;
                    return `${x},${y}`;
                  })
                  .join(" ");
                return (
                  <g>
                    <polyline
                      points={points}
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {data.map((v, i) => (
                      <circle
                        key={i}
                        cx={55 + i * 32}
                        cy={190 - ((v - 5.6) / 1.6) * 170}
                        r={3.5}
                        fill="#cbd5e1"
                      />
                    ))}
                  </g>
                );
              })()}

              {/* Intervention group - Phase 2 (normal, maintained) */}
              {(() => {
                const data = [6.8, 6.75, 6.78, 6.76, 6.75, 6.78, 6.74, 6.76];
                const points = data
                  .map((v, i) => {
                    const x = 315 + i * 32;
                    const y = 190 - ((v - 5.6) / 1.6) * 170;
                    return `${x},${y}`;
                  })
                  .join(" ");
                return (
                  <g>
                    <polyline
                      points={points}
                      fill="none"
                      stroke="#0d9488"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="6,4"
                    />
                    {data.map((v, i) => (
                      <circle
                        key={i}
                        cx={315 + i * 32}
                        cy={190 - ((v - 5.6) / 1.6) * 170}
                        r={3.5}
                        fill="#0d9488"
                        opacity={0.5}
                      />
                    ))}
                  </g>
                );
              })()}

              {/* Control group - Phase 2 (now blocked) */}
              {(() => {
                const data = [6.0, 6.1, 6.15, 6.2, 6.3, 6.35, 6.45, 6.55];
                const points = data
                  .map((v, i) => {
                    const x = 315 + i * 32;
                    const y = 190 - ((v - 5.6) / 1.6) * 170;
                    return `${x},${y}`;
                  })
                  .join(" ");
                return (
                  <g>
                    <polyline
                      points={points}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {data.map((v, i) => (
                      <circle
                        key={i}
                        cx={315 + i * 32}
                        cy={190 - ((v - 5.6) / 1.6) * 170}
                        r={3.5}
                        fill="#f59e0b"
                      />
                    ))}
                  </g>
                );
              })()}
            </svg>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap justify-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-1 w-6 rounded-full bg-teal-600" />
                <span className="text-slate-500">Internet blocked</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="h-1 w-6 rounded-full"
                  style={{
                    background:
                      "repeating-linear-gradient(90deg, #0d9488 0 4px, transparent 4px 8px)",
                  }}
                />
                <span className="text-slate-500">After block lifted</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1 w-6 rounded-full bg-slate-300" />
                <span className="text-slate-500">Control (normal use)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1 w-6 rounded-full bg-amber-400" />
                <span className="text-slate-500">
                  Control (now blocked)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━ STUDY AT A GLANCE ━━━━━ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">
            The study at a glance
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                q: "Who participated?",
                a: "467 American and Canadian iPhone users, average age 32. Most wanted to reduce their phone use.",
              },
              {
                q: "What was blocked?",
                a: "All mobile internet (Wi-Fi and cellular data on the phone). Texts, calls, and internet on laptops/tablets still worked.",
              },
              {
                q: "How long?",
                a: "Two weeks of blocked internet, with measurements before, during, and two weeks after.",
              },
              {
                q: "How was it tracked?",
                a: 'The "Freedom" app blocked internet access and tracked whether the block was active each day.',
              },
            ].map((item) => (
              <div key={item.q} className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
                <p className="text-sm font-bold text-slate-800">{item.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━ BOTTOM LINE ━━━━━ */}
      <section className="px-6 py-16" style={{ backgroundColor: "#f0fdfa" }}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-teal-900">The bottom line</h2>
          <p className="mt-4 text-lg leading-relaxed text-teal-800">
            Constant access to the internet through our phones comes at a real
            cost to our attention, mental health, and happiness. Even a partial
            reduction in mobile internet use can help — you don&apos;t have to
            go cold turkey.
          </p>
          <div className="mx-auto mt-8 h-px w-16 bg-teal-300" />
          <p className="mt-8 text-sm text-teal-600/80">
            Castelo, N., Kushlev, K., Ward, A. F., Esterman, M., &amp; Reiner,
            P. B. (2025). Blocking mobile internet on smartphones improves
            sustained attention, mental health, and subjective well-being.{" "}
            <em>PNAS Nexus</em>, 4(2), pgaf017.
          </p>
          <a
            href="https://academic.oup.com/pnasnexus/article/4/2/pgaf017/8016017"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
          >
            Read the full paper
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-6 py-10">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <a href="/" className="text-base font-semibold text-slate-800">
            Beautiful<span className="font-normal text-teal-600">Data</span>
          </a>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
