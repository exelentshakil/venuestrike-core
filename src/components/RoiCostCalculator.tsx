'use client';

import React, { useState } from 'react';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Cpu,
  Layers,
  Database,
  CheckCircle2,
  Zap,
  ShieldCheck,
} from 'lucide-react';

export function RoiCostCalculator() {
  const [monthlyBookings, setMonthlyBookings] = useState<number>(1800);
  const [avgBookingValue, setAvgBookingValue] = useState<number>(185);
  const [fnbAttachRate, setFnbAttachRate] = useState<number>(48);
  const [preventedCollisions, setPreventedCollisions] = useState<number>(18);

  // Financial calculations
  const grossMonthlyVolume = monthlyBookings * avgBookingValue;
  const fnbRevenue = grossMonthlyVolume * (fnbAttachRate / 100);
  // Average cost of a double-booking incident (group of 12 refund, $100 comped bar tab, staff crisis management) = ~$350
  const monthlyDisasterLossPrevented = preventedCollisions * 350;

  // Real Cloud Infrastructure costs on AWS & Vercel
  const awsRdsPostgres = 75; // db.t4g.medium Multi-AZ
  const awsElastiCacheRedis = 35; // cache.t4g.micro for 120s TTL holds
  const vercelFluidCompute = 40; // Fluid compute with sub-second execution
  const totalMonthlyInfra = awsRdsPostgres + awsElastiCacheRedis + vercelFluidCompute;

  const netValueGenerated = monthlyDisasterLossPrevented + (fnbRevenue * 0.22); // margin on F&B

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono whitespace-nowrap shrink-0">
              <Calculator className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              Venue Economics &amp; Cloud Infra
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono font-medium hidden sm:inline">
              Itemized AWS + Redis + Vercel Compute
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Revenue Protected vs. Monthly Infrastructure Cost
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-3xl leading-relaxed">
            Quantify the exact dollar value of eliminating Friday/Saturday front-desk walkouts and maximizing F&amp;B catering attach rates across your entertainment venues.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-xs font-mono">
            <span className="text-[var(--color-text-muted)]">Infra Cost: </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">${totalMonthlyInfra} / mo</span>
          </div>
        </div>
      </div>

      {/* Grid: Inputs (Left) + Economics & Cloud Itemization (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-5 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono block border-b border-[var(--color-border)] pb-2.5">
            Venue Operations Parameters
          </span>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[var(--color-text-secondary)]">Monthly Bookings per Venue</span>
                <span className="font-mono text-indigo-600 font-bold">{monthlyBookings.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="300"
                max="5000"
                step="100"
                value={monthlyBookings}
                onChange={(e) => setMonthlyBookings(Number(e.target.value))}
                className="w-full h-1.5 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[var(--color-text-secondary)]">Avg Booking Value (Lane + Drinks)</span>
                <span className="font-mono text-emerald-600 font-bold">${avgBookingValue}</span>
              </div>
              <input
                type="range"
                min="80"
                max="450"
                step="5"
                value={avgBookingValue}
                onChange={(e) => setAvgBookingValue(Number(e.target.value))}
                className="w-full h-1.5 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[var(--color-text-secondary)]">F&amp;B Attach Rate</span>
                <span className="font-mono text-purple-600 font-bold">{fnbAttachRate}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="2"
                value={fnbAttachRate}
                onChange={(e) => setFnbAttachRate(Number(e.target.value))}
                className="w-full h-1.5 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[var(--color-text-secondary)]">Peak Collision Incidents Prevented</span>
                <span className="font-mono text-rose-600 font-bold">{preventedCollisions} incidents / mo</span>
              </div>
              <input
                type="range"
                min="2"
                max="50"
                step="1"
                value={preventedCollisions}
                onChange={(e) => setPreventedCollisions(Number(e.target.value))}
                className="w-full h-1.5 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--color-border)] text-[11px] font-mono text-[var(--color-text-muted)] space-y-1">
            <div className="flex justify-between">
              <span>Gross Monthly Booking Volume:</span>
              <span className="font-bold text-[var(--color-text-primary)]">${grossMonthlyVolume.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Attributed F&amp;B Catering:</span>
              <span className="font-bold text-emerald-600">${Math.round(fnbRevenue).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right Outputs & Itemized Cloud Bill (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5 space-y-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono block border-b border-[var(--color-border)] pb-2.5 mb-4">
              Monthly Financial Return vs Cloud Bill
            </span>

            {/* Big Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block mb-1">
                  Walkout Losses Prevented
                </span>
                <div className="text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-300">
                  ${monthlyDisasterLossPrevented.toLocaleString()}
                  <span className="text-xs font-normal text-[var(--color-text-muted)] font-mono"> / mo</span>
                </div>
                <span className="text-[10px] text-[var(--color-text-muted)] block mt-1">
                  Saved refunds, comped drink tabs, and reputation damage
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block mb-1">
                  Net Incremental Value
                </span>
                <div className="text-2xl font-bold font-mono text-indigo-700 dark:text-indigo-300">
                  ${Math.round(netValueGenerated).toLocaleString()}
                  <span className="text-xs font-normal text-[var(--color-text-muted)] font-mono"> / mo</span>
                </div>
                <span className="text-[10px] text-[var(--color-text-muted)] block mt-1">
                  Collision prevention + F&amp;B catering margin contribution
                </span>
              </div>
            </div>

            {/* Cloud Bill Itemization */}
            <div className="space-y-2 text-xs font-mono">
              <span className="text-[11px] font-bold text-[var(--color-text-primary)] uppercase tracking-wider block">
                Itemized Production Cloud Footprint (AWS + Vercel)
              </span>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)]">
                  <div className="flex items-center gap-2">
                    <Database className="h-3.5 w-3.5 text-indigo-600" />
                    <span>AWS RDS PostgreSQL (db.t4g.medium Multi-AZ)</span>
                  </div>
                  <span className="font-bold text-[var(--color-text-primary)]">${awsRdsPostgres} / mo</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)]">
                  <div className="flex items-center gap-2">
                    <Zap className="h-3.5 w-3.5 text-purple-600" />
                    <span>AWS ElastiCache Redis (120s TTL Mutex Holds)</span>
                  </div>
                  <span className="font-bold text-[var(--color-text-primary)]">${awsElastiCacheRedis} / mo</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)]">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Vercel Fluid Compute &amp; Edge Network</span>
                  </div>
                  <span className="font-bold text-[var(--color-text-primary)]">${vercelFluidCompute} / mo</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)]">
            <span className="text-emerald-600 font-bold">ROI Ratio: {Math.round(netValueGenerated / totalMonthlyInfra)}x Return</span>
            <span>Total Monthly Cost: ${totalMonthlyInfra}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
