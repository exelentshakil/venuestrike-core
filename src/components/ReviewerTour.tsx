'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  ShieldAlert,
  Sliders,
  BarChart3,
  ShieldCheck,
  Activity,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewerTourProps {
  onNavigate: (sectionId: string) => void;
  onOpenChaosModal: () => void;
}

export function ReviewerTour({ onNavigate, onOpenChaosModal }: ReviewerTourProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const evaluationPaths = [
    {
      id: 'bookings',
      badge: 'Step 1 • Guest Booking Flow',
      title: 'Real-Time Floor Map & Holds',
      desc: '16 bowling lanes, 8 dartboards, and 2 VIP lounges with 120-second optimistic checkout holds and automatic F&B bundle attachments.',
      actionLabel: 'Explore Floor Map',
      icon: LayoutGrid,
    },
    {
      id: 'concurrency',
      badge: 'Step 2 • Peak Reliability Hook',
      title: '50-Thread Peak Rush Mutex Test',
      desc: 'Simulate 50 parallel Saturday night requests competing for the exact same lane. PostgreSQL transaction advisory locks guarantee exactly 1 winner and 0 double-bookings.',
      actionLabel: 'Run 50-Thread Test',
      icon: ShieldAlert,
    },
    {
      id: 'pricing',
      badge: 'Step 3 • Operator Rules & POS',
      title: 'Multi-Location Pricing & Hardware',
      desc: 'Configure peak (1.8x–2.5x) multipliers, per-hour vs per-game rules across 4 venues, and inspect live webhooks for Toast POS and Brunswick/QubicaAMF pinsetters.',
      actionLabel: 'Inspect Operator Rules',
      icon: Sliders,
    },
    {
      id: 'reporting',
      badge: 'Step 4 • Manager Reporting',
      title: 'Utilization & F&B Attach Telemetry',
      desc: 'Real-time RevPASH ($138/hr peak), lane utilization matrix (94.2% peak), 48.5% F&B attach rates, and a live Toast POS transaction stream.',
      actionLabel: 'View Manager Reports',
      icon: BarChart3,
    },
  ];

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6 shadow-xs transition-all">
      {/* Top Banner Header with Problem-Solution Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 text-xs font-semibold text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 whitespace-nowrap shrink-0 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              Executive Evaluation Briefing
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono font-medium hidden sm:inline">
              Entertainment Venue SaaS Architecture
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
            How to Evaluate VenueStrike Core: Zero Peak Double-Bookings
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-4xl leading-relaxed">
            Engineered specifically for entertainment venues (bowling centers, darts bars, and social clubs). Solves the core Saturday night nightmare where 12 guests arrive at the front desk due to concurrent race conditions.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 text-xs font-medium border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] whitespace-nowrap shrink-0 shadow-xs"
          >
            {isCollapsed ? (
              <>
                <ChevronDown className="h-3.5 w-3.5 mr-1" />
                Expand Briefing
              </>
            ) : (
              <>
                <ChevronUp className="h-3.5 w-3.5 mr-1" />
                Collapse Briefing
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Collapsible Evaluation Paths */}
      {!isCollapsed && (
        <div className="mt-5 space-y-4">
          {/* 4 Interactive Evaluation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {evaluationPaths.map((path) => {
              const Icon = path.icon;
              return (
                <div
                  key={path.id}
                  className="group relative flex flex-col justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 transition-all hover:border-slate-400 hover:bg-[var(--color-surface)] shadow-xs hover:shadow-card"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="inline-flex items-center text-xs font-semibold text-indigo-800 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800 whitespace-nowrap shrink-0 shadow-xs">
                        {path.badge}
                      </span>
                      <Icon className="h-4 w-4 text-[var(--color-text-muted)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-1.5">
                      {path.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {path.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-[var(--color-border-subtle)]">
                    <button
                      onClick={() => onNavigate(path.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>{path.actionLabel}</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* High-Contrast Command Console Summary Strip */}
          <div className="rounded-xl bg-slate-950 text-white p-3.5 sm:p-4 shadow-card border border-slate-800 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
            {/* Header on mobile */}
            <div className="sm:hidden flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-xs">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="font-mono font-bold text-indigo-300 uppercase tracking-wider text-[11px] whitespace-nowrap shrink-0">
                Peak Reliability Standards
              </span>
            </div>

            {/* Content Area */}
            <div className="flex items-stretch justify-between gap-3 sm:items-center sm:gap-3.5 flex-1 min-w-0">
              {/* Left Side: Desktop Header + Micro-Pills */}
              <div className="space-y-1.5 sm:space-y-0 sm:flex sm:items-center sm:gap-3 flex-1 min-w-0">
                <div className="hidden sm:flex items-center gap-2.5 shrink-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-xs">
                    <ShieldCheck className="h-4.5 w-4.5" />
                  </div>
                  <span className="font-mono font-bold text-indigo-300 uppercase tracking-wider text-[11px] whitespace-nowrap shrink-0">
                    Peak Reliability Standards
                  </span>
                </div>

                {/* Standards Micro-Pills */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1.5 text-xs">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-200 text-[10px] sm:text-[11px] font-mono whitespace-nowrap w-fit">
                    Postgres Advisory Locks
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-200 text-[10px] sm:text-[11px] font-mono whitespace-nowrap w-fit">
                    120s TTL Optimistic Holds
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-200 text-[10px] sm:text-[11px] font-mono whitespace-nowrap w-fit">
                    Toast POS Webhook Sync
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-indigo-950/40 border border-indigo-800/50 text-indigo-300 text-[10px] sm:text-[11px] font-mono font-semibold whitespace-nowrap w-fit">
                    Zero Peak Double-Bookings
                  </span>
                </div>
              </div>

              {/* Right Side: SLA Trust Blurb */}
              <div className="flex flex-col items-center justify-center p-2.5 sm:px-3 sm:py-0 sm:h-9 rounded-xl sm:rounded-lg bg-gradient-to-b from-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-xs shrink-0 w-28 sm:w-auto text-center self-stretch sm:self-auto sm:flex-row sm:gap-2.5">
                <div className="relative flex h-8 w-8 sm:h-6 sm:w-6 items-center justify-center rounded-lg sm:rounded-md bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 mb-1 sm:mb-0 shrink-0">
                  <Activity className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-indigo-400" />
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <div className="space-y-0.5 sm:space-y-0 sm:text-left flex flex-col justify-center">
                  <div className="text-[10px] sm:text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-wider leading-none">
                    Peak SLA
                  </div>
                  <div className="text-xs sm:text-[11px] font-mono font-extrabold text-white leading-tight">
                    99.99%
                  </div>
                  <div className="text-[9px] font-mono text-indigo-300/80 leading-none sm:hidden">
                    Guaranteed
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Button
              size="sm"
              onClick={() => onNavigate('concurrency')}
              className="h-9 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs whitespace-nowrap shrink-0 border border-indigo-500/40 w-full sm:w-auto px-3.5 rounded-lg justify-center inline-flex items-center gap-1.5"
            >
              <Zap className="h-3.5 w-3.5 text-indigo-200 shrink-0" />
              <span>Simulate Peak Rush</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
