'use client';

import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Compass,
  FileText,
  LayoutGrid,
  ShieldAlert,
  Sliders,
  Cpu,
  BarChart3,
  Sparkles,
  Calculator,
  FileJson,
  Zap,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenChaos: () => void;
  onOpenGovernance: () => void;
  onOpenLogs: () => void;
  onNavigate?: (sectionId: string) => void;
}

export function CommandMenu({
  open,
  onOpenChange,
  onOpenChaos,
  onOpenGovernance,
  onOpenLogs,
  onNavigate,
}: CommandMenuProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const handleNavigate = (id: string) => {
    onOpenChange(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-[var(--color-text-primary)]">
        <DialogHeader className="border-b border-[var(--color-border)] pb-2 mb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-sm font-bold flex items-center gap-2">
              <Compass className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              VenueStrike Command Palette (⌘K)
            </DialogTitle>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              ESC to close
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
          {/* Section Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono mb-2">
              Jump to Architecture Module
            </h4>
            <div className="space-y-1">
              {[
                { id: 'briefing', label: 'Executive Briefing & Evaluation Paths', icon: FileText },
                { id: 'bookings', label: 'Real-Time Floor Map & 120s Holds', icon: LayoutGrid },
                { id: 'concurrency', label: '50-Thread Peak Rush Mutex Test', icon: ShieldAlert },
                { id: 'pricing', label: 'Multi-Location Operator Pricing Rules', icon: Sliders },
                { id: 'integrations', label: 'Toast POS & Pinsetter Hardware Bridge', icon: Cpu },
                { id: 'reporting', label: 'Utilization & F&B Attach Telemetry', icon: BarChart3 },
                { id: 'ai-planner', label: 'Real Dual-Provider AI Event Builder', icon: Sparkles },
                { id: 'metrics', label: 'Peak Concurrency & Floor Metrics', icon: BarChart3 },
                { id: 'roi', label: 'Revenue Protected vs Cloud Infra Costs', icon: Calculator },
                { id: 'blueprints', label: 'Postgres DDL & Webhook Blueprints', icon: FileJson },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[var(--color-panel-subtle)] text-xs text-left transition-colors"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <Icon className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
                      {item.label}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)] font-mono">
                      #{item.id}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Direct Actions */}
          <div className="border-t border-[var(--color-border)] pt-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono mb-2">
              System Operations &amp; Audits
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onOpenChange(false);
                  onOpenChaos();
                }}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[var(--color-panel-subtle)] text-xs text-left text-amber-600 dark:text-amber-400 font-medium"
              >
                <span className="flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5" />
                  Run Peak Stress / Chaos Failover Test
                </span>
                <span className="text-xs font-mono">Modal</span>
              </button>

              <button
                onClick={() => {
                  onOpenChange(false);
                  onOpenGovernance();
                }}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[var(--color-panel-subtle)] text-xs text-left text-emerald-600 dark:text-emerald-400 font-medium"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  AWS RDS Security &amp; Compliance Posture
                </span>
                <span className="text-xs font-mono">Drawer</span>
              </button>

              <button
                onClick={() => {
                  onOpenChange(false);
                  onOpenLogs();
                }}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[var(--color-panel-subtle)] text-xs text-left text-indigo-600 dark:text-indigo-400 font-medium"
              >
                <span className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5" />
                  Live Hardware Socket &amp; Webhook Traces
                </span>
                <span className="text-xs font-mono">Logs</span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
