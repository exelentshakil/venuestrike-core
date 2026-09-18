'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Layers,
  Cpu,
  Zap,
  TrendingUp,
  ShieldCheck,
  Flame,
  CheckCircle2,
  DollarSign,
  Clock,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

// ==========================================
// 1. PEAK RUSH BOOKING CONCURRENCY (AreaChart)
// ==========================================
const peakThroughputConfig = {
  bookings: {
    label: 'Guest Requests (req/min)',
    color: '#6366f1',
  },
} satisfies ChartConfig;

const peakThroughputData = [
  { time: '17:00', bookings: 140, lockLatency: 2 },
  { time: '18:00', bookings: 320, lockLatency: 3 },
  { time: '19:00', bookings: 780, lockLatency: 3 },
  { time: '20:00', bookings: 1240, lockLatency: 4 }, // Peak rush
  { time: '21:00', bookings: 1180, lockLatency: 3 },
  { time: '22:00', bookings: 860, lockLatency: 3 },
  { time: '23:00', bookings: 340, lockLatency: 2 },
];

// ==========================================
// 2. MULTI-VENUE RevPASH (BarChart)
// ==========================================
const revpashConfig = {
  revpash: {
    label: 'RevPASH ($/lane/hr)',
    color: '#10b981',
  },
} satisfies ChartConfig;

const revpashData = [
  { venue: 'Austin', revpash: 138, fill: '#6366f1' },
  { venue: 'Brooklyn', revpash: 154, fill: '#8b5cf6' },
  { venue: 'Denver', revpash: 118, fill: '#06b6d4' },
  { venue: 'Chicago', revpash: 126, fill: '#10b981' },
];

// ==========================================
// 3. F&B REVENUE ATTACH MIX (PieChart)
// ==========================================
const fnbMixData = [
  { name: 'Artisan Sliders & Platters', value: 38, fill: '#6366f1' },
  { name: 'Craft Beer Pitchers', value: 32, fill: '#10b981' },
  { name: 'Cocktail Wristbands', value: 18, fill: '#f59e0b' },
  { name: 'Game Cards & Arcades', value: 12, fill: '#ec4899' },
];

// ==========================================
// 4. HARDWARE PINSETTER & POS LATENCY (LineChart)
// ==========================================
const hardwareConfig = {
  latency: {
    label: 'Socket Latency (ms)',
    color: '#8b5cf6',
  },
} satisfies ChartConfig;

const hardwareData = [
  { system: 'Toast POS', latency: 14 },
  { system: 'Brunswick Sync', latency: 8 },
  { system: 'QubicaAMF', latency: 11 },
  { system: 'Stripe Terminal', latency: 18 },
  { system: 'RFID Card Tap', latency: 6 },
];

export function BentoGrid() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-mono whitespace-nowrap shrink-0">
              <Activity className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              Venue SaaS Telemetry
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono font-medium hidden sm:inline">
              AWS us-east-1 &bull; PostgreSQL Advisory Locks
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Peak Concurrency &amp; Floor Utilization Metrics
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-3xl leading-relaxed">
            Live telemetry verifying zero double-bookings under Friday &amp; Saturday peak rush, multi-venue revenue per available slot hour, and sub-15ms hardware socket round-trips.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-xs font-mono">
            <span className="text-[var(--color-text-muted)]">Active Locks: </span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">16 / 16 Lanes Protected</span>
          </div>
        </div>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        {/* 1. PEAK RUSH BOOKING CONCURRENCY (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-indigo-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
                  Peak Saturday Rush Ingestion vs. Lock Latency
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                0 Double-Bookings
              </span>
            </div>

            <div className="flex items-baseline justify-between mb-2">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--color-text-primary)]">
                  1,240
                </span>
                <span className="text-xs text-[var(--color-text-muted)] font-mono ml-1.5">
                  req / min (8 PM Peak)
                </span>
              </div>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">
                Avg Lock Acquire: <strong className="text-indigo-600">3.4ms</strong>
              </span>
            </div>

            <div className="h-[140px] w-full">
              {mounted ? (
                <ChartContainer config={peakThroughputConfig} className="aspect-auto h-[140px] w-full">
                  <AreaChart data={peakThroughputData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="peakRushGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="time"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 10, fill: 'var(--color-text-muted)', fontFamily: 'monospace' }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 10, fill: 'var(--color-text-muted)', fontFamily: 'monospace' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="bookings"
                      stroke="#6366f1"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#peakRushGradient)"
                    />
                  </AreaChart>
                </ChartContainer>
              ) : (
                <div className="h-[140px] w-full bg-[var(--color-panel-subtle)] animate-pulse rounded-lg" />
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)]">
            <span>PostgreSQL: Advisory Mutex Active</span>
            <span>Redis: 120s TTL Key Eviction</span>
          </div>
        </div>

        {/* 2. MULTI-VENUE RevPASH (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
                  RevPASH by Location ($/hr)
                </span>
              </div>
              <span className="text-xs font-mono text-indigo-600 font-bold">
                Avg: $134/hr
              </span>
            </div>

            <div className="h-[140px] w-full">
              {mounted ? (
                <ChartContainer config={revpashConfig} className="aspect-auto h-[140px] w-full">
                  <BarChart data={revpashData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis
                      dataKey="venue"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 10, fill: 'var(--color-text-muted)', fontFamily: 'monospace' }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 10, fill: 'var(--color-text-muted)', fontFamily: 'monospace' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revpash" radius={[4, 4, 0, 0]} barSize={24}>
                      {revpashData.map((entry, index) => (
                        <Cell key={`bar-cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              ) : (
                <div className="h-[140px] w-full bg-[var(--color-panel-subtle)] animate-pulse rounded-lg" />
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)]">
            <span>Peak Dynamic Multiplier: 1.8x - 2.5x</span>
            <span>Target: &gt; $110/hr</span>
          </div>
        </div>

        {/* 3. F&B CATERING ATTACH MIX (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
                F&amp;B Catering Attach Mix
              </span>
              <span className="text-xs font-mono text-indigo-600 font-semibold">
                48.5% Attach
              </span>
            </div>

            <div className="h-[130px] w-full flex items-center justify-center">
              {mounted ? (
                <PieChart width={160} height={130}>
                  <Pie
                    data={fnbMixData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {fnbMixData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              ) : (
                <div className="h-[130px] w-full bg-[var(--color-panel-subtle)] animate-pulse rounded-lg" />
              )}
            </div>

            <div className="grid grid-cols-2 gap-1.5 mt-2 text-[10px] font-mono">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                <span className="truncate">Sliders (38%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="truncate">Pitchers (32%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="truncate">Cocktails (18%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-pink-500" />
                <span className="truncate">Game Cards (12%)</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--color-border)] text-[11px] font-mono text-[var(--color-text-muted)] text-center">
            Toast POS Lane Tab Sync Active
          </div>
        </div>

        {/* 4. HARDWARE & PINSETTER WEBHOOK LATENCY (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
                Hardware Bridge Latency (ms)
              </span>
              <span className="text-xs font-mono text-purple-600 font-bold">
                Avg: 11.4ms
              </span>
            </div>

            <div className="h-[130px] w-full">
              {mounted ? (
                <ChartContainer config={hardwareConfig} className="aspect-auto h-[130px] w-full">
                  <LineChart data={hardwareData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis
                      dataKey="system"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 8.5, fill: 'var(--color-text-muted)', fontFamily: 'monospace' }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 9.5, fill: 'var(--color-text-muted)', fontFamily: 'monospace' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="latency"
                      stroke="#8b5cf6"
                      strokeWidth={2.5}
                      dot={{ fill: '#8b5cf6', r: 3 }}
                    />
                  </LineChart>
                </ChartContainer>
              ) : (
                <div className="h-[130px] w-full bg-[var(--color-panel-subtle)] animate-pulse rounded-lg" />
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)]">
            <span>Brunswick Sync: 8ms</span>
            <span>QubicaAMF: 11ms</span>
          </div>
        </div>

        {/* 5. ZERO DOUBLE-BOOKING GUARANTEE (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 mb-3">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
                  Peak SLA &amp; Isolation
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600">
                100% Strict
              </span>
            </div>

            <div className="space-y-2.5 py-1">
              <div className="flex items-center justify-between text-xs font-mono p-2 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)]">
                <span className="text-[var(--color-text-secondary)]">PostgreSQL Advisory Lock</span>
                <span className="font-bold text-emerald-600">Active (Mutex)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono p-2 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)]">
                <span className="text-[var(--color-text-secondary)]">Redis Hold Expiration</span>
                <span className="font-bold text-indigo-600">120s Auto-Release</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono p-2 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)]">
                <span className="text-[var(--color-text-secondary)]">Front-Desk Collision</span>
                <span className="font-bold text-emerald-600">0.00% Defended</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)]">
            <span className="text-emerald-600 font-semibold">Production Ready</span>
            <span>AWS RDS Postgres 16</span>
          </div>
        </div>
      </div>
    </div>
  );
}
