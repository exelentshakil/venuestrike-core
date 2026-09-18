'use client';

import React, { useState } from 'react';
import {
  Sliders,
  MapPin,
  Clock,
  DollarSign,
  Cpu,
  Layers,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Zap,
  Server,
  Terminal,
  Shield,
  CreditCard,
  Building,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const VENUES = [
  { id: 'atx-downtown', name: 'Austin Downtown', state: 'TX', lanes: 16, darts: 8, lounges: 2, status: 'Active Peak' },
  { id: 'bkn-social', name: 'Brooklyn Social Club', state: 'NY', lanes: 12, darts: 6, lounges: 1, status: 'Active Peak' },
  { id: 'den-ballpark', name: 'Denver Ballpark Social', state: 'CO', lanes: 20, darts: 10, lounges: 3, status: 'Active Peak' },
  { id: 'chi-river', name: 'Chicago River North', state: 'IL', lanes: 14, darts: 8, lounges: 2, status: 'Active Peak' },
];

const INTEGRATIONS = [
  {
    name: 'Toast POS Bridge',
    category: 'Food & Beverage Tabs',
    protocol: 'REST Webhook + WebSocket',
    status: 'ONLINE',
    latency: '14ms',
    metrics: '942 Tabs Synced Today',
    syncDetails: 'Automatic tab association by bowling lane / dartboard ID. Real-time split checks.',
  },
  {
    name: 'Brunswick Sync Protocol',
    category: 'Lane Pinsetter & Scoring',
    protocol: 'TCP / UDP Local Socket',
    status: 'ONLINE',
    latency: '8ms',
    metrics: '16/16 Lanes Connected',
    syncDetails: 'Pinsetter powers on automatically upon guest check-in; game scores broadcast to guest mobile web app.',
  },
  {
    name: 'QubicaAMF Conqueror',
    category: 'Legacy Scoring Bridge',
    protocol: 'Local Agent Gateway',
    status: 'STANDBY',
    latency: '18ms',
    metrics: 'Failover Bridge Ready',
    syncDetails: 'Bi-directional score extraction & game limit enforcement for legacy venue retrofits.',
  },
  {
    name: 'Stripe Terminal & Pre-Auth',
    category: 'Card Present & Online Deposits',
    protocol: 'Stripe PaymentIntents v3',
    status: 'ONLINE',
    latency: '42ms',
    metrics: '$28,450 Pre-Auths Held',
    syncDetails: 'Idempotent card holds; automatic release on cancellation > 24h; 50% forfeit rule under 6h.',
  },
  {
    name: 'RFID Game Card Tap Engine',
    category: 'Arcade & Self-Pour Beer Taps',
    protocol: 'NFC ISO 14443A / MQTT',
    status: 'ONLINE',
    latency: '6ms',
    metrics: '3,810 Card Taps/Day',
    syncDetails: 'Shared guest balance across arcade credits, dartboard play, and craft beer wall.',
  },
];

export function OperatorBackOffice() {
  const [selectedVenue, setSelectedVenue] = useState('atx-downtown');
  const [pricingMode, setPricingMode] = useState<'hourly' | 'per-game'>('hourly');
  const [peakMultiplier, setPeakMultiplier] = useState<number>(1.8);
  const [autoDepositEnforced, setAutoDepositEnforced] = useState<boolean>(true);
  const [depositThreshold, setDepositThreshold] = useState<number>(6); // >= 6 guests
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string>('All 5 Integration Gateways Nominal');

  const handleRunSyncAudit = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus('Refreshed: 16 Lanes, 8 Darts & 942 POS Tabs Synced across AWS us-east-1');
    }, 800);
  };

  const activeVenueObj = VENUES.find((v) => v.id === selectedVenue) || VENUES[0];

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-mono whitespace-nowrap shrink-0">
              <Sliders className="h-3.5 w-3.5 text-indigo-600" />
              Operator Control Center
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono font-medium hidden sm:inline">
              Multi-Location Rule Engine
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Pricing Rules, Schedules &amp; Hardware Integrations
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-3xl leading-relaxed">
            Configure dynamic pricing tiers (peak vs off-peak, per-hour vs per-game), automatic deposit thresholds, and audit live connections to Toast POS, Brunswick Sync, and RFID hardware.
          </p>
        </div>

        {/* Sync Audit Button */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            onClick={handleRunSyncAudit}
            disabled={isSyncing}
            variant="outline"
            className="h-9 px-3.5 text-xs font-semibold rounded-lg border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-panel-subtle)] whitespace-nowrap shrink-0"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1.5 text-indigo-600 ${isSyncing ? 'animate-spin' : ''}`} />
            Sync Hardware Status
          </Button>
        </div>
      </div>

      {/* Multi-Location Venue Selector Strip */}
      <div className="pt-5 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono flex items-center gap-1.5">
            <Building className="h-3.5 w-3.5 text-indigo-600" />
            Select Operating Venue
          </span>
          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            4 Locations Active
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {VENUES.map((venue) => {
            const isSelected = selectedVenue === venue.id;
            return (
              <button
                key={venue.id}
                onClick={() => setSelectedVenue(venue.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-20 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-500/20 shadow-xs'
                    : 'border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:border-slate-300 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                    {venue.name}
                  </span>
                  <Badge variant="outline" className="text-[9px] font-mono px-1.5 py-0">
                    {venue.state}
                  </Badge>
                </div>
                <div className="text-[11px] text-[var(--color-text-secondary)] font-mono">
                  {venue.lanes} Lanes • {venue.darts} Darts • {venue.lounges} VIP
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Core: Dynamic Pricing Configuration (Left) + Hardware Integrations (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
        {/* Left Column: Dynamic Pricing Engine (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
            <div>
              <span className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider font-mono flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                Dynamic Rate Engine
              </span>
              <p className="text-[11px] text-[var(--color-text-secondary)]">
                {activeVenueObj.name} Ruleset
              </p>
            </div>
            <Badge className="bg-emerald-600 text-white text-[10px] font-mono">
              Live Rules Active
            </Badge>
          </div>

          {/* Pricing Mode Toggle */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[var(--color-text-secondary)] block">
              Pricing Model
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPricingMode('hourly')}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                  pricingMode === 'hourly'
                    ? 'border-indigo-600 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
                }`}
              >
                Per Hour ($45 - $95/hr)
              </button>
              <button
                onClick={() => setPricingMode('per-game')}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                  pricingMode === 'per-game'
                    ? 'border-indigo-600 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
                }`}
              >
                Per Game ($8 - $14/game)
              </button>
            </div>
          </div>

          {/* Peak Multiplier Slider */}
          <div className="space-y-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-[var(--color-text-primary)]">Friday &amp; Saturday Peak Multiplier</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">{peakMultiplier.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="2.5"
              step="0.1"
              value={peakMultiplier}
              onChange={(e) => setPeakMultiplier(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[10px] text-[var(--color-text-muted)] font-mono">
              <span>Standard (1.0x)</span>
              <span>Fri/Sat Peak Surge (2.5x)</span>
            </div>
          </div>

          {/* Deposit Enforcement */}
          <div className="space-y-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 text-xs font-mono">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-[var(--color-text-primary)] block">Enforce Upfront 50% Deposit</span>
                <span className="text-[10px] text-[var(--color-text-muted)]">Cuts weekend no-show rate to &lt; 1%</span>
              </div>
              <Switch checked={autoDepositEnforced} onCheckedChange={setAutoDepositEnforced} />
            </div>

            <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between">
              <span className="text-[11px] text-[var(--color-text-secondary)]">Party Size Trigger</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setDepositThreshold(Math.max(2, depositThreshold - 1))}
                  className="h-6 w-6 rounded border border-[var(--color-border)] text-xs font-bold"
                >
                  -
                </button>
                <span className="font-bold px-1">&ge; {depositThreshold} Guests</span>
                <button
                  onClick={() => setDepositThreshold(Math.min(12, depositThreshold + 1))}
                  className="h-6 w-6 rounded border border-[var(--color-border)] text-xs font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-mono space-y-1">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span>Calculated Peak Lane Yield</span>
              <span>${Math.round(65 * peakMultiplier)}/hour</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Off-peak base: $52/hr • Fri 5pm-1am &amp; Sat All-Day: ${Math.round(65 * peakMultiplier)}/hr
            </div>
          </div>
        </div>

        {/* Right Column: Hardware & POS Integrations (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-indigo-600" />
              Connected On-Site Hardware &amp; API Gateways
            </span>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {syncStatus}
            </span>
          </div>

          <div className="space-y-2.5">
            {INTEGRATIONS.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[var(--color-text-primary)] font-mono">
                      {item.name}
                    </span>
                    <Badge variant="outline" className="text-[10px] font-mono px-1.5 py-0 text-[var(--color-text-muted)]">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[var(--color-text-muted)] font-mono">
                      {item.latency}
                    </span>
                    <Badge
                      className={`text-[9px] font-mono font-bold ${
                        item.status === 'ONLINE'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[var(--color-text-secondary)] gap-1 pt-1 border-t border-[var(--color-border)]/60">
                  <span className="text-[11px] font-mono text-[var(--color-text-primary)]">
                    {item.syncDetails}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                    {item.metrics}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
