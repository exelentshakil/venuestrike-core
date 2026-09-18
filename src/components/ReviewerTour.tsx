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
  ArrowRight,
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
      id: 'ai-planner',
      badge: 'Step 1 • Revenue Generator',
      title: 'AI Event Package Recommender',
      desc: 'Turn corporate inquiries into $1,475–$2,890 event packages with 48.5% F&B margin attach, pre-paid deposits, and automated lane pairing.',
      actionLabel: 'Build Event Package',
      icon: Sparkles,
    },
    {
      id: 'concurrency',
      badge: 'Step 2 • Peak Concurrency Hook',
      title: '50-Thread Peak Rush Mutex Test',
      desc: 'Simulate 50 parallel Saturday night requests competing for the exact same lane. PostgreSQL transaction advisory locks guarantee exactly 1 winner and 0 double-bookings.',
      actionLabel: 'Run 50-Thread Test',
      icon: ShieldAlert,
    },
    {
      id: 'pricing',
      badge: 'Step 3 • Operator Yield & POS',
      title: 'Multi-Location Pricing & Hardware',
      desc: 'Configure peak (1.8x–2.5x) multipliers (+$38.4k/mo lift), per-hour vs per-game rules across 4 venues, and inspect live webhooks for Toast POS and Brunswick/QubicaAMF pinsetters.',
      actionLabel: 'Inspect Operator Rules',
      icon: Sliders,
    },
    {
      id: 'reporting',
      badge: 'Step 4 • Manager Telemetry',
      title: 'Utilization & F&B Attach Telemetry',
      desc: 'Real-time RevPASH ($194.50/hr peak), lane utilization matrix (96.2% peak), 48.5% F&B attach rates, and a live Toast POS transaction stream.',
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 text-xs font-bold text-indigo-900 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800 whitespace-nowrap shrink-0 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              Executive Evaluation Briefing
            </span>
            <span className="text-xs text-[var(--color-text-secondary)] font-mono font-semibold hidden sm:inline">
              Entertainment Venue SaaS Architecture
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
            How to Evaluate VenueStrike Core: Zero Peak Double-Bookings
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-4xl leading-relaxed font-normal">
            Engineered specifically for multi-unit entertainment venues (bowling centers, darts bars, and social clubs). Solves the core Saturday night operational risk where concurrent bookings cause double-booked lanes and front-desk walk-in collisions.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 text-xs font-semibold border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] whitespace-nowrap shrink-0 shadow-xs"
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
        <div className="mt-5">
          {/* 4 Clean, Balanced Evaluation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {evaluationPaths.map((path) => {
              const Icon = path.icon;
              return (
                <div
                  key={path.id}
                  className="group relative flex flex-col justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-5 transition-all hover:border-indigo-400 hover:bg-[var(--color-surface)] shadow-xs hover:shadow-card"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center text-xs font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-0.5 rounded-md border border-indigo-300 dark:border-indigo-800 whitespace-nowrap shrink-0 shadow-xs">
                        {path.badge}
                      </span>
                      <Icon className="h-4 w-4 text-[var(--color-text-secondary)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <h3 className="text-sm font-extrabold text-[var(--color-text-primary)] mb-2">
                      {path.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-normal">
                      {path.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[var(--color-border-subtle)]">
                    <button
                      onClick={() => onNavigate(path.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>{path.actionLabel}</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
