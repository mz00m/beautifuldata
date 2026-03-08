"use client";

import { useState } from "react";

/* ───────────────────────── data ───────────────────────── */

const screenTimeData = {
  intervention: [
    { label: "T1\nBaseline", value: 314 },
    { label: "T2\nIntervention", value: 161 },
    { label: "T3\nFollow-up", value: 265 },
  ],
  delayed: [
    { label: "T1\nBaseline", value: 336 },
    { label: "T2\nControl", value: 322 },
    { label: "T3\nIntervention", value: 190 },
  ],
};

const psychOutcomes = [
  {
    name: "Subjective Well-Being",
    key: "swb",
    unit: "index",
    intervention: [
      { label: "T1", value: 4.65 },
      { label: "T2", value: 5.05 },
      { label: "T3", value: 4.89 },
    ],
    delayed: [
      { label: "T1", value: 4.45 },
      { label: "T2", value: 4.54 },
      { label: "T3", value: 4.93 },
    ],
    effectSize: 0.45,
    pValue: "< 0.001",
  },
  {
    name: "Mental Health",
    key: "mh",
    unit: "index (higher = better)",
    intervention: [
      { label: "T1", value: 4.58 },
      { label: "T2", value: 5.22 },
      { label: "T3", value: 5.08 },
    ],
    delayed: [
      { label: "T1", value: 4.45 },
      { label: "T2", value: 4.49 },
      { label: "T3", value: 5.11 },
    ],
    effectSize: 0.56,
    pValue: "< 0.001",
  },
  {
    name: "Sustained Attention (d′)",
    key: "att",
    unit: "d-prime",
    intervention: [
      { label: "T1", value: 2.75 },
      { label: "T2", value: 2.91 },
      { label: "T3", value: 2.85 },
    ],
    delayed: [
      { label: "T1", value: 2.85 },
      { label: "T2", value: 2.81 },
      { label: "T3", value: 3.0 },
    ],
    effectSize: 0.23,
    pValue: "< 0.001",
  },
];

const mediators = [
  { label: "Offline World Time", dz: 0.7, direction: "up" as const },
  { label: "Self-Control", dz: 0.66, direction: "up" as const },
  { label: "Media Consumption", dz: 0.41, direction: "down" as const },
  { label: "Social Connectedness", dz: 0.29, direction: "up" as const },
  { label: "Sleep", dz: 0.14, direction: "up" as const },
];

const complianceFunnel = [
  { label: "Committed", value: 467 },
  { label: "Set up app", value: 266 },
  { label: "Fully compliant", value: 119 },
];

const contextComparisons = [
  {
    label: "This intervention\non depression",
    value: 0.56,
    color: "#14b8a6",
  },
  {
    label: "Antidepressants\n(meta-analysis)",
    value: 0.32,
    color: "#6b7280",
  },
  {
    label: "Cognitive behavioral\ntherapy (meta)",
    value: 0.56,
    color: "#6b7280",
  },
];

const moodTimeline = {
  intervention: [6.3, 6.4, 6.5, 6.55, 6.6, 6.7, 6.75, 6.8],
  delayed: [6.1, 6.05, 6.0, 6.0, 5.95, 6.0, 6.05, 6.0],
  phase2intervention: [6.8, 6.75, 6.78, 6.76, 6.75, 6.78, 6.74, 6.76],
  phase2delayed: [6.0, 6.1, 6.15, 6.2, 6.3, 6.35, 6.45, 6.55],
};

/* ───────────────────── chart helpers ───────────────────── */

function BarChart({
  data,
  maxVal,
  color,
  height = 180,
}: {
  data: { label: string; value: number }[];
  maxVal: number;
  color: string;
  height?: number;
}) {
  const barW = 48;
  const gap = 32;
  const totalW = data.length * barW + (data.length - 1) * gap;
  const padL = 40;
  const padR = 20;
  const padT = 20;
  const padB = 44;
  const svgW = totalW + padL + padR;
  const svgH = height + padT + padB;
  const chartH = height;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
      {/* y-axis gridlines */}
      {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
        const y = padT + chartH * (1 - pct);
        const val = Math.round(maxVal * pct);
        return (
          <g key={pct}>
            <line
              x1={padL}
              y1={y}
              x2={svgW - padR}
              y2={y}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth={1}
            />
            <text
              x={padL - 6}
              y={y + 3}
              textAnchor="end"
              fill="rgba(255,255,255,0.25)"
              fontSize={9}
            >
              {val}
            </text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const barH = (d.value / maxVal) * chartH;
        const x = padL + i * (barW + gap);
        const y = padT + chartH - barH;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx={4}
              fill={color}
              opacity={0.85}
            />
            <text
              x={x + barW / 2}
              y={y - 6}
              textAnchor="middle"
              fill="white"
              fontSize={11}
              fontWeight={600}
            >
              {d.value}
            </text>
            {d.label.split("\n").map((line, li) => (
              <text
                key={li}
                x={x + barW / 2}
                y={padT + chartH + 14 + li * 12}
                textAnchor="middle"
                fill="rgba(255,255,255,0.4)"
                fontSize={9}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function LineChart({
  series,
  labels,
  height = 160,
  yMin,
  yMax,
}: {
  series: { data: number[]; color: string; label: string }[];
  labels: string[];
  height?: number;
  yMin: number;
  yMax: number;
}) {
  const padL = 36;
  const padR = 20;
  const padT = 16;
  const padB = 32;
  const svgW = 360;
  const svgH = height + padT + padB;
  const chartW = svgW - padL - padR;
  const chartH = height;

  const xScale = (i: number) =>
    padL + (i / (labels.length - 1)) * chartW;
  const yScale = (v: number) =>
    padT + chartH - ((v - yMin) / (yMax - yMin)) * chartH;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
      {/* grid */}
      {[0, 0.5, 1].map((pct) => {
        const val = yMin + (yMax - yMin) * pct;
        const y = yScale(val);
        return (
          <g key={pct}>
            <line
              x1={padL}
              y1={y}
              x2={svgW - padR}
              y2={y}
              stroke="rgba(255,255,255,0.04)"
            />
            <text
              x={padL - 4}
              y={y + 3}
              textAnchor="end"
              fill="rgba(255,255,255,0.25)"
              fontSize={8}
            >
              {val.toFixed(1)}
            </text>
          </g>
        );
      })}
      {/* x labels */}
      {labels.map((l, i) => (
        <text
          key={i}
          x={xScale(i)}
          y={svgH - 6}
          textAnchor="middle"
          fill="rgba(255,255,255,0.35)"
          fontSize={8}
        >
          {l}
        </text>
      ))}
      {/* lines */}
      {series.map((s) => {
        const points = s.data.map((v, i) => `${xScale(i)},${yScale(v)}`);
        return (
          <g key={s.label}>
            <polyline
              points={points.join(" ")}
              fill="none"
              stroke={s.color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {s.data.map((v, i) => (
              <circle
                key={i}
                cx={xScale(i)}
                cy={yScale(v)}
                r={3}
                fill={s.color}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function HorizontalBar({
  items,
  maxVal,
}: {
  items: { label: string; value: number; color: string }[];
  maxVal: number;
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="whitespace-pre-line text-[13px] text-gray-400">
              {item.label}
            </span>
            <span className="ml-3 text-sm font-semibold text-white">
              d = {item.value.toFixed(2)}
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/[0.04]">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(item.value / maxVal) * 100}%`,
                backgroundColor: item.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────── page component ─────────────────── */

export default function SmartphoneDetoxStudy() {
  const [activeOutcome, setActiveOutcome] = useState(0);
  const outcome = psychOutcomes[activeOutcome];

  return (
    <main className="min-h-screen bg-surface-0 text-gray-100">
      {/* Nav bar */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-surface-0/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="/"
            className="text-lg font-semibold tracking-tight text-white"
          >
            Beautiful
            <span className="font-normal text-brand-400">Data</span>
          </a>
          <span className="text-sm text-gray-500">Case Study</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-32">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2">
          <div className="h-64 w-96 rounded-full bg-brand-500/[0.06] blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-[13px] font-medium tracking-wide text-brand-500">
            PNAS Nexus &middot; Castelo et al. 2025
          </p>
          <h1 className="mt-4 text-3xl font-light leading-tight tracking-tight sm:text-5xl">
            Blocking Mobile Internet{" "}
            <span className="font-semibold">Improves Attention,</span>{" "}
            <span className="font-semibold">Mental Health &amp; Well-Being</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-gray-400">
            A month-long randomized controlled trial (n&nbsp;=&nbsp;467) found
            that blocking smartphone internet access for two weeks significantly
            improved sustained attention, mental health, and subjective
            well-being — with 91% of participants improving on at least one
            outcome.
          </p>
        </div>

        {/* Key stats strip */}
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { value: "467", label: "Participants" },
            { value: "91%", label: "Improved on ≥1 outcome" },
            { value: "2 wk", label: "Intervention duration" },
            { value: "d = 0.56", label: "Mental health effect" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-white/[0.06] bg-surface-1 px-5 py-4 text-center"
            >
              <p className="text-xl font-semibold tabular-nums text-white">
                {s.value}
              </p>
              <p className="mt-1 text-[12px] text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px w-full bg-white/[0.06]" />
      </div>

      {/* ─── Study Design ─── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-light tracking-tight sm:text-3xl">
            Study <span className="font-semibold">Design</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-400">
            A cross-over RCT where the Intervention group blocked mobile
            internet for weeks 1–2 while the Delayed Intervention (control)
            group blocked it for weeks 3–4. All participants retained text and
            call access and could use the internet on other devices.
          </p>

          {/* Timeline diagram */}
          <div className="mt-10 overflow-x-auto">
            <svg viewBox="0 0 700 160" className="w-full min-w-[500px]">
              {/* Row labels */}
              <text
                x={10}
                y={52}
                fill="rgba(255,255,255,0.5)"
                fontSize={11}
              >
                Intervention
              </text>
              <text
                x={10}
                y={112}
                fill="rgba(255,255,255,0.5)"
                fontSize={11}
              >
                Delayed
              </text>

              {/* Intervention row */}
              <rect
                x={130}
                y={32}
                width={240}
                height={30}
                rx={6}
                fill="#14b8a6"
                opacity={0.7}
              />
              <text
                x={250}
                y={52}
                textAnchor="middle"
                fill="white"
                fontSize={11}
                fontWeight={600}
              >
                Internet Blocked
              </text>
              <rect
                x={380}
                y={32}
                width={240}
                height={30}
                rx={6}
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.08)"
              />
              <text
                x={500}
                y={52}
                textAnchor="middle"
                fill="rgba(255,255,255,0.35)"
                fontSize={11}
              >
                Normal Use
              </text>

              {/* Delayed row */}
              <rect
                x={130}
                y={92}
                width={240}
                height={30}
                rx={6}
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.08)"
              />
              <text
                x={250}
                y={112}
                textAnchor="middle"
                fill="rgba(255,255,255,0.35)"
                fontSize={11}
              >
                Normal Use (Control)
              </text>
              <rect
                x={380}
                y={92}
                width={240}
                height={30}
                rx={6}
                fill="#f59e0b"
                opacity={0.6}
              />
              <text
                x={500}
                y={112}
                textAnchor="middle"
                fill="white"
                fontSize={11}
                fontWeight={600}
              >
                Internet Blocked
              </text>

              {/* Time markers */}
              {[
                { x: 130, label: "T1" },
                { x: 370, label: "T2" },
                { x: 620, label: "T3" },
              ].map((t) => (
                <g key={t.label}>
                  <line
                    x1={t.x}
                    y1={24}
                    x2={t.x}
                    y2={132}
                    stroke="rgba(255,255,255,0.12)"
                    strokeDasharray="3,3"
                  />
                  <text
                    x={t.x}
                    y={150}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.5)"
                    fontSize={11}
                    fontWeight={600}
                  >
                    {t.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px w-full bg-white/[0.06]" />
      </div>

      {/* ─── Screen Time Impact ─── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-light tracking-tight sm:text-3xl">
            Screen Time <span className="font-semibold">Impact</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-400">
            Average daily smartphone screen time (minutes) dropped dramatically
            during the intervention period. Even after the block was lifted,
            screen time remained lower than baseline.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-white/[0.06] bg-surface-1 p-6">
              <p className="mb-4 text-[13px] font-medium text-brand-500">
                Intervention Group
              </p>
              <BarChart
                data={screenTimeData.intervention}
                maxVal={400}
                color="#14b8a6"
              />
              <p className="mt-2 text-center text-[11px] text-gray-600">
                &minus;49% screen time at T2 (d<sub>z</sub> = 2.22)
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-surface-1 p-6">
              <p className="mb-4 text-[13px] font-medium text-accent-400">
                Delayed Intervention Group
              </p>
              <BarChart
                data={screenTimeData.delayed}
                maxVal={400}
                color="#f59e0b"
              />
              <p className="mt-2 text-center text-[11px] text-gray-600">
                &minus;43% screen time at T3 (d<sub>z</sub> = 2.39)
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px w-full bg-white/[0.06]" />
      </div>

      {/* ─── Psychological Outcomes ─── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-light tracking-tight sm:text-3xl">
            Psychological <span className="font-semibold">Outcomes</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-400">
            All three preregistered outcomes improved significantly during the
            intervention. Select an outcome to explore the cross-over pattern.
          </p>

          {/* Outcome selector */}
          <div className="mt-8 flex flex-wrap gap-2">
            {psychOutcomes.map((o, i) => (
              <button
                key={o.key}
                onClick={() => setActiveOutcome(i)}
                className={`rounded-lg border px-4 py-2 text-[13px] font-medium transition-all ${
                  i === activeOutcome
                    ? "border-brand-500/40 bg-brand-500/10 text-brand-400"
                    : "border-white/[0.06] text-gray-500 hover:text-gray-300"
                }`}
              >
                {o.name}
              </button>
            ))}
          </div>

          {/* Chart area */}
          <div className="mt-8 rounded-xl border border-white/[0.06] bg-surface-1 p-6 sm:p-8">
            <div className="mb-2 flex items-baseline gap-4">
              <h3 className="text-lg font-semibold text-white">
                {outcome.name}
              </h3>
              <span className="text-[12px] text-gray-600">
                Effect: d<sub>z</sub> = {outcome.effectSize} (p{" "}
                {outcome.pValue})
              </span>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="mb-3 text-[12px] font-medium text-brand-500">
                  Intervention Group
                </p>
                <LineChart
                  series={[
                    {
                      data: outcome.intervention.map((d) => d.value),
                      color: "#14b8a6",
                      label: "Intervention",
                    },
                  ]}
                  labels={outcome.intervention.map((d) => d.label)}
                  yMin={
                    Math.min(
                      ...outcome.intervention.map((d) => d.value),
                      ...outcome.delayed.map((d) => d.value)
                    ) - 0.2
                  }
                  yMax={
                    Math.max(
                      ...outcome.intervention.map((d) => d.value),
                      ...outcome.delayed.map((d) => d.value)
                    ) + 0.2
                  }
                />
                <div className="mt-1 flex justify-center gap-1">
                  <span className="inline-block h-2 w-8 rounded-full bg-brand-500/50" />
                  <span className="text-[10px] text-gray-600">
                    Blocked T1→T2
                  </span>
                </div>
              </div>
              <div>
                <p className="mb-3 text-[12px] font-medium text-accent-400">
                  Delayed Intervention Group
                </p>
                <LineChart
                  series={[
                    {
                      data: outcome.delayed.map((d) => d.value),
                      color: "#f59e0b",
                      label: "Delayed",
                    },
                  ]}
                  labels={outcome.delayed.map((d) => d.label)}
                  yMin={
                    Math.min(
                      ...outcome.intervention.map((d) => d.value),
                      ...outcome.delayed.map((d) => d.value)
                    ) - 0.2
                  }
                  yMax={
                    Math.max(
                      ...outcome.intervention.map((d) => d.value),
                      ...outcome.delayed.map((d) => d.value)
                    ) + 0.2
                  }
                />
                <div className="mt-1 flex justify-center gap-1">
                  <span className="inline-block h-2 w-8 rounded-full bg-accent-400/50" />
                  <span className="text-[10px] text-gray-600">
                    Blocked T2→T3
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px w-full bg-white/[0.06]" />
      </div>

      {/* ─── Experience Sampling ─── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-light tracking-tight sm:text-3xl">
            Mood Over <span className="font-semibold">Time</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-400">
            Experience sampling via SMS (4&times; per week) revealed
            progressively improving mood during the intervention that persisted
            after the block was lifted.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-white/[0.06] bg-surface-1 p-6">
              <p className="mb-4 text-[13px] font-medium text-gray-400">
                Phase 1 — Weeks 1–2
              </p>
              <LineChart
                series={[
                  {
                    data: moodTimeline.intervention,
                    color: "#14b8a6",
                    label: "Intervention (blocked)",
                  },
                  {
                    data: moodTimeline.delayed,
                    color: "#f59e0b",
                    label: "Delayed (control)",
                  },
                ]}
                labels={["1", "2", "3", "4", "5", "6", "7", "8"]}
                yMin={5.7}
                yMax={7.0}
              />
              <div className="mt-3 flex justify-center gap-5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-5 rounded-full bg-brand-500" />
                  <span className="text-[10px] text-gray-500">
                    Blocked
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-5 rounded-full bg-accent-400" />
                  <span className="text-[10px] text-gray-500">
                    Control
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-surface-1 p-6">
              <p className="mb-4 text-[13px] font-medium text-gray-400">
                Phase 2 — Weeks 3–4
              </p>
              <LineChart
                series={[
                  {
                    data: moodTimeline.phase2intervention,
                    color: "#14b8a6",
                    label: "Intervention (normal)",
                  },
                  {
                    data: moodTimeline.phase2delayed,
                    color: "#f59e0b",
                    label: "Delayed (blocked)",
                  },
                ]}
                labels={["1", "2", "3", "4", "5", "6", "7", "8"]}
                yMin={5.7}
                yMax={7.0}
              />
              <div className="mt-3 flex justify-center gap-5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-5 rounded-full bg-brand-500" />
                  <span className="text-[10px] text-gray-500">
                    Post-intervention
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-5 rounded-full bg-accent-400" />
                  <span className="text-[10px] text-gray-500">
                    Now blocked
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px w-full bg-white/[0.06]" />
      </div>

      {/* ─── Mechanisms ─── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-light tracking-tight sm:text-3xl">
            Why It <span className="font-semibold">Works</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-400">
            Five mediating factors explain why blocking mobile internet improves
            well-being and mental health. Changes in time use, social
            connection, self-control, and sleep fully mediated the effects.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {/* Mediator effect sizes */}
            <div className="rounded-xl border border-white/[0.06] bg-surface-1 p-6">
              <p className="mb-5 text-[13px] font-medium text-gray-400">
                Mediator Effect Sizes (Cohen&apos;s d<sub>z</sub>)
              </p>
              <div className="space-y-5">
                {mediators.map((m) => (
                  <div key={m.label}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[13px] text-gray-300">
                        {m.direction === "up" ? "↑" : "↓"} {m.label}
                      </span>
                      <span className="text-[13px] font-semibold tabular-nums text-white">
                        {m.dz.toFixed(2)}
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(m.dz / 0.8) * 100}%`,
                          backgroundColor:
                            m.direction === "up" ? "#14b8a6" : "#f59e0b",
                          opacity: 0.8,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flow diagram */}
            <div className="rounded-xl border border-white/[0.06] bg-surface-1 p-6">
              <p className="mb-5 text-[13px] font-medium text-gray-400">
                Mediation Pathway
              </p>
              <svg viewBox="0 0 320 280" className="w-full">
                {/* Source */}
                <rect
                  x={10}
                  y={110}
                  width={90}
                  height={50}
                  rx={8}
                  fill="rgba(20,184,166,0.15)"
                  stroke="rgba(20,184,166,0.3)"
                />
                <text
                  x={55}
                  y={133}
                  textAnchor="middle"
                  fill="#14b8a6"
                  fontSize={9}
                  fontWeight={600}
                >
                  Block Mobile
                </text>
                <text
                  x={55}
                  y={146}
                  textAnchor="middle"
                  fill="#14b8a6"
                  fontSize={9}
                  fontWeight={600}
                >
                  Internet
                </text>

                {/* Mediators */}
                {[
                  "Offline Time",
                  "Self-Control",
                  "Social Connection",
                  "↓ Media Use",
                  "Sleep",
                ].map((label, i) => {
                  const y = 20 + i * 52;
                  return (
                    <g key={label}>
                      <line
                        x1={100}
                        y1={135}
                        x2={130}
                        y2={y + 14}
                        stroke="rgba(255,255,255,0.08)"
                      />
                      <rect
                        x={130}
                        y={y}
                        width={85}
                        height={28}
                        rx={6}
                        fill="rgba(255,255,255,0.04)"
                        stroke="rgba(255,255,255,0.08)"
                      />
                      <text
                        x={172}
                        y={y + 18}
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.6)"
                        fontSize={8}
                      >
                        {label}
                      </text>
                      <line
                        x1={215}
                        y1={y + 14}
                        x2={240}
                        y2={80}
                        stroke="rgba(255,255,255,0.08)"
                      />
                      <line
                        x1={215}
                        y1={y + 14}
                        x2={240}
                        y2={188}
                        stroke="rgba(255,255,255,0.08)"
                      />
                    </g>
                  );
                })}

                {/* Outcomes */}
                <rect
                  x={240}
                  y={58}
                  width={70}
                  height={40}
                  rx={8}
                  fill="rgba(20,184,166,0.1)"
                  stroke="rgba(20,184,166,0.2)"
                />
                <text
                  x={275}
                  y={76}
                  textAnchor="middle"
                  fill="#5eead4"
                  fontSize={8}
                  fontWeight={600}
                >
                  SWB
                </text>
                <text
                  x={275}
                  y={88}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.35)"
                  fontSize={7}
                >
                  d = 0.45
                </text>

                <rect
                  x={240}
                  y={165}
                  width={70}
                  height={40}
                  rx={8}
                  fill="rgba(20,184,166,0.1)"
                  stroke="rgba(20,184,166,0.2)"
                />
                <text
                  x={275}
                  y={183}
                  textAnchor="middle"
                  fill="#5eead4"
                  fontSize={8}
                  fontWeight={600}
                >
                  Mental Health
                </text>
                <text
                  x={275}
                  y={197}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.35)"
                  fontSize={7}
                >
                  d = 0.56
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px w-full bg-white/[0.06]" />
      </div>

      {/* ─── Context: Effect Size Comparisons ─── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-light tracking-tight sm:text-3xl">
            Putting Effects{" "}
            <span className="font-semibold">in Context</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-400">
            The intervention&apos;s effect on depression was larger than the
            meta-analytic effect of antidepressants and comparable to cognitive
            behavioral therapy. The attention improvement equalled approximately
            10 years of age-related decline.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-white/[0.06] bg-surface-1 p-6">
              <p className="mb-5 text-[13px] font-medium text-gray-400">
                Depression Effect Size Comparison
              </p>
              <HorizontalBar items={contextComparisons} maxVal={0.7} />
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-surface-1 p-6">
              <p className="mb-5 text-[13px] font-medium text-gray-400">
                Attention Improvement Equivalents
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-500/10">
                    <span className="text-2xl font-bold text-brand-400">
                      10
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      Years of age-related decline
                    </p>
                    <p className="text-[12px] text-gray-500">
                      Equal magnitude of improvement on gradCPT
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-500/10">
                    <span className="text-2xl font-bold text-brand-400">
                      25%
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      Of ADHD vs. healthy gap
                    </p>
                    <p className="text-[12px] text-gray-500">
                      Approximately a quarter of the difference on gradCPT
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px w-full bg-white/[0.06]" />
      </div>

      {/* ─── Compliance Funnel ─── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-light tracking-tight sm:text-3xl">
            Compliance <span className="font-semibold">Funnel</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-400">
            Complying was difficult — only 25.5% of participants who committed
            were fully compliant. Yet significant ITT effects (including
            non-compliant participants) show that even partial reduction in
            mobile internet use produces benefits.
          </p>

          <div className="mx-auto mt-10 max-w-md">
            <div className="rounded-xl border border-white/[0.06] bg-surface-1 p-6">
              {complianceFunnel.map((step, i) => {
                const widthPct = (step.value / complianceFunnel[0].value) * 100;
                return (
                  <div key={step.label} className={i > 0 ? "mt-4" : ""}>
                    <div className="mb-1.5 flex items-baseline justify-between">
                      <span className="text-[13px] text-gray-400">
                        {step.label}
                      </span>
                      <span className="text-sm font-semibold tabular-nums text-white">
                        {step.value}
                      </span>
                    </div>
                    <div className="h-8 w-full overflow-hidden rounded-lg bg-white/[0.03]">
                      <div
                        className="flex h-full items-center rounded-lg pl-3"
                        style={{
                          width: `${widthPct}%`,
                          backgroundColor:
                            i === 0
                              ? "rgba(20,184,166,0.2)"
                              : i === 1
                                ? "rgba(20,184,166,0.35)"
                                : "rgba(20,184,166,0.6)",
                        }}
                      >
                        <span className="text-[11px] font-medium text-white/60">
                          {widthPct.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px w-full bg-white/[0.06]" />
      </div>

      {/* ─── Who Benefits ─── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-light tracking-tight sm:text-3xl">
            Who <span className="font-semibold">Benefits</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-400">
            Most participants benefited. Those with higher baseline Fear of
            Missing Out (FoMO) saw larger improvements in well-being and mental
            health — perhaps because mobile internet itself exacerbates FoMO.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                pct: "73.3%",
                label: "Improved SWB",
                sub: "75% intervention vs 47% control at T2",
              },
              {
                pct: "70.5%",
                label: "Improved Mental Health",
                sub: "68% intervention vs 52% control at T2",
              },
              {
                pct: "58.5%",
                label: "Improved Attention",
                sub: "59% intervention vs 46% control at T2",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/[0.06] bg-surface-1 p-6 text-center"
              >
                <p className="text-3xl font-bold tabular-nums text-brand-400">
                  {item.pct}
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  {item.label}
                </p>
                <p className="mt-1 text-[11px] text-gray-600">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* FoMO moderation */}
          <div className="mt-8 rounded-xl border border-white/[0.06] bg-surface-1 p-6">
            <p className="mb-2 text-[13px] font-medium text-gray-400">
              FoMO Moderation Effect
            </p>
            <p className="max-w-2xl text-[14px] leading-relaxed text-gray-300">
              Higher baseline FoMO predicted larger improvements in SWB
              (F(1,304) = 8.33, p = .004) and mental health (F(1,304) = 12.43,
              p &lt; .001). No Johnson–Neyman points in the data — the
              intervention benefited participants across the entire FoMO
              spectrum.
            </p>
            <div className="mt-4">
              <svg viewBox="0 0 400 120" className="w-full max-w-md">
                {/* Gradient bar showing FoMO spectrum */}
                <defs>
                  <linearGradient
                    id="fomo-grad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.2} />
                    <stop
                      offset="100%"
                      stopColor="#14b8a6"
                      stopOpacity={0.9}
                    />
                  </linearGradient>
                </defs>
                <rect
                  x={40}
                  y={30}
                  width={320}
                  height={30}
                  rx={6}
                  fill="url(#fomo-grad)"
                />
                <text
                  x={40}
                  y={22}
                  fill="rgba(255,255,255,0.4)"
                  fontSize={9}
                >
                  Low FoMO
                </text>
                <text
                  x={360}
                  y={22}
                  textAnchor="end"
                  fill="rgba(255,255,255,0.4)"
                  fontSize={9}
                >
                  High FoMO
                </text>
                <text
                  x={200}
                  y={50}
                  textAnchor="middle"
                  fill="white"
                  fontSize={10}
                  fontWeight={600}
                >
                  Benefit increases with FoMO level
                </text>
                {/* Arrow */}
                <path
                  d="M 100 80 L 300 80"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth={1}
                  markerEnd="url(#arrow)"
                />
                <defs>
                  <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX={10}
                    refY={5}
                    markerWidth={6}
                    markerHeight={6}
                    orient="auto"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.15)" />
                  </marker>
                </defs>
                <text
                  x={100}
                  y={96}
                  fill="rgba(255,255,255,0.3)"
                  fontSize={8}
                >
                  Smaller improvement
                </text>
                <text
                  x={300}
                  y={96}
                  textAnchor="end"
                  fill="rgba(255,255,255,0.3)"
                  fontSize={8}
                >
                  Larger improvement
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px w-full bg-white/[0.06]" />
      </div>

      {/* ─── Methodology ─── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-light tracking-tight sm:text-3xl">
            Study <span className="font-semibold">Methodology</span>
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Participants",
                detail:
                  "467 iPhone users recruited via Prolific. Average age 32, 63% female. American and Canadian adults.",
              },
              {
                title: "Intervention",
                detail:
                  'Freedom app blocked all mobile internet (Wi-Fi + cellular data) for 14 days. Texts and calls remained functional — effectively creating a "dumb phone."',
              },
              {
                title: "Measures",
                detail:
                  "SWB (life satisfaction + affect), mental health (DSM-5 cross-cutting symptoms), sustained attention (gradCPT d-prime), and experience sampling via SMS.",
              },
              {
                title: "Design",
                detail:
                  "Preregistered cross-over RCT. 3 × 2 mixed ANOVAs (Time × Condition). ITT as primary analysis; TOT as secondary.",
              },
              {
                title: "Compliance Tracking",
                detail:
                  "Freedom app's Locked Mode tracked whether the block was active each day. Compliant = block active ≥10 of 14 days.",
              },
              {
                title: "Limitations",
                detail:
                  "No active placebo control. Sample was motivated to reduce use. Potential expectancy effects on self-report measures.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/[0.06] bg-surface-1 p-5"
              >
                <p className="text-[13px] font-semibold text-brand-400">
                  {item.title}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-gray-400">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px w-full bg-white/[0.06]" />
      </div>

      {/* ─── Key Takeaways ─── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-light tracking-tight sm:text-3xl">
            Key <span className="font-semibold">Takeaways</span>
          </h2>

          <div className="mt-10 space-y-6">
            {[
              "Blocking mobile internet for 2 weeks significantly improved well-being, mental health, and objectively measured sustained attention.",
              "Even non-compliant participants showed improvements — simply reducing mobile internet use (not eliminating it) produces benefits.",
              "Benefits were mediated by spending more time in the offline world, improved self-control, stronger social connections, reduced media consumption, and better sleep.",
              "Those with higher Fear of Missing Out (FoMO) at baseline benefited most — mobile internet itself may exacerbate FoMO.",
              "Effects persisted after the intervention ended, partly because participants maintained lower screen time post-intervention.",
            ].map((point, i) => (
              <div key={i} className="flex gap-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-[12px] font-semibold text-brand-400">
                  {i + 1}
                </span>
                <p className="text-[15px] leading-relaxed text-gray-300">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Source ─── */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl rounded-xl border border-white/[0.06] bg-surface-1 p-6 text-center">
          <p className="text-[13px] text-gray-500">Source</p>
          <p className="mt-2 text-[14px] leading-relaxed text-gray-300">
            Castelo, N., Kushlev, K., Ward, A. F., Esterman, M., &amp; Reiner,
            P. B. (2025). Blocking mobile internet on smartphones improves
            sustained attention, mental health, and subjective well-being.{" "}
            <span className="italic">PNAS Nexus</span>, 4(2), pgaf017.
          </p>
          <a
            href="https://academic.oup.com/pnasnexus/article/4/2/pgaf017/8016017"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-[13px] text-brand-500 transition-colors hover:text-brand-400"
          >
            Read the full paper &rarr;
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <svg className="mx-auto mb-10 h-4 w-48" viewBox="0 0 192 16">
            <path
              d="M 0 0 Q 96 16 192 0"
              fill="none"
              stroke="rgba(20,184,166,0.15)"
              strokeWidth="1"
            />
          </svg>
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <a
              href="/"
              className="text-base font-semibold text-white"
            >
              Beautiful
              <span className="font-normal text-brand-400">Data</span>
            </a>
            <p className="text-[13px] text-gray-700">
              &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
