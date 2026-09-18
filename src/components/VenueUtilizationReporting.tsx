'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  DollarSign,
  Utensils,
  Clock,
  Sparkles,
  Layers,
  ArrowUpRight,
  Activity,
  Flame,
  CheckCircle2,
  Receipt,
  Wine,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const REVENUE_BY_HOUR = [
  { hour: '12 PM', rev: 48, util: 32 },
  { hour: '1 PM', rev: 54, util: 38 },
  { hour: '2 PM', rev: 62, util: 44 },
  { hour: '3 PM', rev: 70, util: 50 },
  { hour: '4 PM', rev: 85, util: 62 },
  { hour: '5 PM', rev: 110, util: 78 },
  { hour: '6 PM', rev: 145, util: 88 },
  { hour: '7 PM', rev: 178, util: 95 },
  { hour: '8 PM', rev: 194, util: 98 },
  { hour: '9 PM', rev: 186, util: 96 },
  { hour: '10 PM', rev: 162, util: 90 },
  { hour: '11 PM', rev: 124, util: 74 },
];

const RECENT_ORDERS = [
  { id: 'ORD-8942', lane: 'Lane 04', type: 'F&B Package', items: 'Truffle Sliders + 2 Pitchers IPA', amount: '$118.50', time: '2 mins ago', status: 'PAID' },
  { id: 'ORD-8941', lane: 'Bullseye 2', type: 'Dart Play + Nachos', items: '90 Min Darts + Loaded Nacho Bar', amount: '$84.00', time: '6 mins ago', status: 'PAID' },
  { id: 'ORD-8940', lane: 'VIP Suite A', type: 'Celebration Deposit', items: 'Champagne + Charcuterie Board', amount: '$340.00', time: '11 mins ago', status: 'HELD' },
  { id: 'ORD-8939', lane: 'Lane 11', type: 'Shoe + Drafts', items: '6x Shoe Rentals + Round of Highballs', amount: '$68.00', time: '15 mins ago', status: 'PAID' },
];

export function VenueUtilizationReporting() {
  const [selectedMetric, setSelectedMetric] = useState<'rev' | 'util'>('rev');

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono whitespace-nowrap shrink-0">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              Venue Operations Reporting
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono font-medium hidden sm:inline">
              Real-Time Yield &amp; Utilization
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Utilization per Lane &amp; Board, Revenue &amp; F&amp;B Spend
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-3xl leading-relaxed">
            Live telemetry for venue general managers: track utilization per lane and dartboard, hourly revenue lift, and food &amp; drink attach rates from Toast and Square POS.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setSelectedMetric('rev')}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
              selectedMetric === 'rev'
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
            }`}
          >
            Revenue / Hour ($)
          </button>
          <button
            onClick={() => setSelectedMetric('util')}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
              selectedMetric === 'util'
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
            }`}
          >
            Lane Utilization (%)
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 pb-2">
        <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
            <span>Peak Revenue / Lane-Hour</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
              <ArrowUpRight className="h-3 w-3" /> +28.4%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">
            $194.50<span className="text-xs text-[var(--color-text-muted)] font-normal">/hr</span>
          </div>
          <div className="text-[11px] text-[var(--color-text-secondary)]">
            Friday &amp; Saturday 7-10 PM rush across 16 lanes
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
            <span>F&amp;B Spend per Booking</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
              <ArrowUpRight className="h-3 w-3" /> +42.1%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">
            $84.20<span className="text-xs text-[var(--color-text-muted)] font-normal">/party</span>
          </div>
          <div className="text-[11px] text-[var(--color-text-secondary)]">
            Driven by pre-booked slider &amp; craft beer packages
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
            <span>Saturday Utilization Rate</span>
            <span className="text-indigo-600 font-semibold flex items-center gap-0.5">
              Nominal Capacity
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
            96.2%<span className="text-xs text-[var(--color-text-muted)] font-normal"> peak</span>
          </div>
          <div className="text-[11px] text-[var(--color-text-secondary)]">
            0 double bookings; 120s TTL holds prevented 49 collisions
          </div>
        </div>
      </div>

      {/* Chart & Live Event Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
        {/* Left Chart (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
              {selectedMetric === 'rev' ? 'Hourly Revenue Distribution ($/Hour)' : 'Floor Utilization Timeline (%)'}
            </span>
            <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
              Saturday Peak Performance
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_BY_HOUR} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="hour" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                  }}
                  formatter={(value: any) => [
                    selectedMetric === 'rev' ? `$${value}/hr` : `${value}% util`,
                    selectedMetric === 'rev' ? 'Revenue' : 'Utilization',
                  ]}
                />
                <Bar
                  dataKey={selectedMetric === 'rev' ? 'rev' : 'util'}
                  fill={selectedMetric === 'rev' ? '#635bff' : '#10b981'}
                  radius={[4, 4, 0, 0]}
                >
                  {REVENUE_BY_HOUR.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.util > 90 ? '#4f46e5' : '#818cf8'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right POS Activity Stream (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2.5 mb-3">
              <span className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Receipt className="h-3.5 w-3.5 text-indigo-600" />
                Live Toast POS &amp; Scoring Feed
              </span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Socket
              </span>
            </div>

            <div className="space-y-2">
              {RECENT_ORDERS.map((ord) => (
                <div
                  key={ord.id}
                  className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between text-xs font-mono"
                >
                  <div className="space-y-0.5 min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 dark:text-white truncate">
                        {ord.lane}
                      </span>
                      <span className="text-[10px] text-[var(--color-text-muted)]">
                        • {ord.time}
                      </span>
                    </div>
                    <div className="text-[11px] text-[var(--color-text-secondary)] truncate">
                      {ord.items}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {ord.amount}
                    </div>
                    <Badge variant="outline" className="text-[9px] px-1 py-0 border-emerald-300 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40">
                      {ord.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-[11px] font-mono text-indigo-900 dark:text-indigo-200 mt-3">
            <span className="font-bold">POS Reconciliation: </span>
            100% of open guest tabs auto-close upon pinsetter game completion or front desk checkout. Zero unbilled craft drinks.
          </div>
        </div>
      </div>
    </div>
  );
}
