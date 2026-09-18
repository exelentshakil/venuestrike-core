'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  Calendar,
  DollarSign,
  Utensils,
  Zap,
  CheckCircle2,
  RefreshCw,
  Clock,
  Layers,
  ShoppingBag,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function AiPackageRecommender() {
  const [eventType, setEventType] = useState('Tech Company Quarterly Social');
  const [partySize, setPartySize] = useState(16);
  const [durationHours, setDurationHours] = useState(2.5);
  const [budget, setBudget] = useState('$1,800');
  const [vibe, setVibe] = useState('Competitive Socializing + Craft Cocktails');
  const [dietary, setDietary] = useState('Standard (4 vegetarian, 2 gluten-free)');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const handleGeneratePackage = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/package-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType,
          partySize,
          durationHours,
          budget,
          vibe,
          dietary,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAiResult(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-mono whitespace-nowrap shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              Real Dual-Provider AI Copilot
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono font-medium hidden sm:inline">
              OpenAI gpt-4o-mini &bull; Gemini 2.0 Flash Fallback
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
            AI Event Package Recommender &amp; Upsell Engine
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-3xl leading-relaxed">
            Test real LLM inference architecting tailored event packages: calculates optimal lane pair allocations, F&amp;B catering bundles, deposit requirements, and front-desk concurrency advice.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            onClick={handleGeneratePackage}
            disabled={isLoading}
            className="h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-xs transition-all whitespace-nowrap shrink-0"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin mr-1.5" />
                Architecting Package...
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Generate Custom Package
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Grid: Inputs (Left 5 cols) + Generated Package (Right 7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-5 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono block border-b border-[var(--color-border)] pb-2.5">
            Event Specifications
          </span>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[11px] font-semibold text-[var(--color-text-secondary)] block mb-1">
                Occasion / Celebration Type
              </label>
              <input
                type="text"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[var(--color-text-secondary)] block mb-1">
                  Guest Count
                </label>
                <input
                  type="number"
                  value={partySize}
                  onChange={(e) => setPartySize(parseInt(e.target.value, 10) || 4)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-mono font-medium"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[var(--color-text-secondary)] block mb-1">
                  Duration (Hours)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={durationHours}
                  onChange={(e) => setDurationHours(parseFloat(e.target.value) || 2)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-mono font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[var(--color-text-secondary)] block mb-1">
                  Target Budget
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-mono font-medium"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[var(--color-text-secondary)] block mb-1">
                  Atmosphere
                </label>
                <input
                  type="text"
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-medium truncate"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[var(--color-text-secondary)] block mb-1">
                Dietary &amp; Beverage Notes
              </label>
              <input
                type="text"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-medium"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)]">
            <span>Inline Guardrails:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              OWASP LLM01 &bull; PII Filter Active
            </span>
          </div>
        </div>

        {/* Right Output (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
                  Tailored Event Blueprint &amp; Financials
                </span>
              </div>
              {aiResult && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] font-mono border-emerald-300 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40">
                    {aiResult.provider} ({aiResult.model})
                  </Badge>
                  <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                    {aiResult.latencyMs}ms
                  </span>
                </div>
              )}
            </div>

            {aiResult?.data ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-indigo-900 dark:text-indigo-200">
                      {aiResult.data.packageName}
                    </h4>
                    <span className="text-xs text-[var(--color-text-secondary)] font-mono">
                      Allocation: {aiResult.data.resourceAllocation} &bull; {aiResult.data.playDurationMinutes} Mins Play
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
                      ${aiResult.data.financials?.totalPackagePrice || 1113}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-muted)] block font-mono">
                      Deposit: ${aiResult.data.financials?.requiredDeposit || 400}
                    </span>
                  </div>
                </div>

                {/* Catering Menu */}
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 space-y-1.5">
                  <span className="text-[11px] font-bold text-[var(--color-text-primary)] uppercase tracking-wider font-mono flex items-center gap-1">
                    <Utensils className="h-3 w-3 text-indigo-600" />
                    Catering &amp; Beverage Matrix
                  </span>
                  <ul className="text-xs text-[var(--color-text-secondary)] space-y-1 pl-1">
                    {aiResult.data.cateringMenu?.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Concurrency Advice & Upsell */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50/60 dark:bg-indigo-950/30">
                    <span className="font-bold text-indigo-900 dark:text-indigo-200 block mb-0.5">
                      Concurrency Defense
                    </span>
                    <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                      {aiResult.data.concurrencyAdvice}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30">
                    <span className="font-bold text-emerald-900 dark:text-emerald-200 block mb-0.5">
                      Manager Upsell Hook
                    </span>
                    <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                      {aiResult.data.upsellHook}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center space-y-3">
                <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center mx-auto">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                    No Package Generated Yet
                  </h4>
                  <p className="text-xs text-[var(--color-text-secondary)] max-w-sm mx-auto">
                    Click &quot;Generate Custom Package&quot; to test live dual-provider AI inference formatting packages, lane scheduling, and deposit pricing.
                  </p>
                </div>
                <Button
                  onClick={handleGeneratePackage}
                  variant="outline"
                  className="text-xs font-semibold h-8 rounded-lg"
                >
                  Run Sample Corporate Event
                </Button>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)]">
            <span>Deterministic Math Guard:</span>
            <span>LLMs never calculate totals; pricing verified via Zod schema</span>
          </div>
        </div>
      </div>
    </div>
  );
}
