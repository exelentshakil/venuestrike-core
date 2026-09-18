'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { ReviewerTour } from '@/components/ReviewerTour';
import { BentoGrid } from '@/components/BentoGrid';
import { BookingFlowSimulator } from '@/components/BookingFlowSimulator';
import { OperatorBackOffice } from '@/components/OperatorBackOffice';
import { VenueUtilizationReporting } from '@/components/VenueUtilizationReporting';
import { AiPackageRecommender } from '@/components/AiPackageRecommender';
import { RoiCostCalculator } from '@/components/RoiCostCalculator';
import { BlueprintExporter } from '@/components/BlueprintExporter';
import { ChaosSimulatorModal } from '@/components/ChaosSimulatorModal';
import { AiGovernanceDrawer } from '@/components/AiGovernanceDrawer';
import { ExecutionLogDrawer } from '@/components/ExecutionLogDrawer';
import { CommandMenu } from '@/components/CommandMenu';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('briefing');
  const [chaosModalOpen, setChaosModalOpen] = useState(false);
  const [governanceDrawerOpen, setGovernanceDrawerOpen] = useState(false);
  const [logsDrawerOpen, setLogsDrawerOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  // Anti-flicker programmatic navigation lock
  const isNavigatingRef = useRef(false);
  const navTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavigate = (sectionId: string) => {
    // 1. Immediately pin target active state so the clicked menu item illuminates instantly
    setActiveSection(sectionId);

    // 2. Lock observer updates so intermediate sections during smooth scrolling cannot cause menu flickering
    isNavigatingRef.current = true;
    if (navTimeoutRef.current) {
      clearTimeout(navTimeoutRef.current);
    }

    if (sectionId === 'briefing') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        const headerOffset = 64; // Sticky header height allowance
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = Math.max(0, elementPosition + window.scrollY - headerOffset);
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }

    // 3. Release observer lock once smooth scroll completes
    const releaseLock = () => {
      isNavigatingRef.current = false;
      window.removeEventListener('scrollend', releaseLock);
    };

    if ('onscrollend' in window) {
      window.addEventListener('scrollend', releaseLock, { once: true });
    } else {
      navTimeoutRef.current = setTimeout(() => {
        isNavigatingRef.current = false;
      }, 700);
    }
  };

  // ScrollSpy with IntersectionObserver
  useEffect(() => {
    const sectionIds = [
      'briefing',
      'bookings',
      'concurrency',
      'pricing',
      'integrations',
      'reporting',
      'ai-planner',
      'metrics',
      'roi',
      'blueprints',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigatingRef.current) return;
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      { rootMargin: '-15% 0px -60% 0px', threshold: 0.1 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenChaosModal={() => setChaosModalOpen(true)}
        onOpenGovernanceDrawer={() => setGovernanceDrawerOpen(true)}
        onOpenLogsDrawer={() => setLogsDrawerOpen(true)}
        onOpenCommandMenu={() => setCommandMenuOpen(true)}
      />

      <main className="w-full max-w-full min-w-0 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-8">
          {/* Executive Briefing & Reviewer Tour */}
          <section id="briefing" className="scroll-mt-20">
            <ReviewerTour
              onNavigate={handleNavigate}
              onOpenChaosModal={() => setChaosModalOpen(true)}
            />
          </section>

          {/* 1. Guest Booking Flow: 16 Lanes, 8 Dartboards, 2 VIP Lounges, 120s Holds */}
          <section id="bookings" className="scroll-mt-20">
            <div id="concurrency" className="scroll-mt-20">
              <BookingFlowSimulator />
            </div>
          </section>

          {/* 2. Operator Back Office: Pricing Rules & POS / Scoring Integrations */}
          <section id="pricing" className="scroll-mt-20">
            <div id="integrations" className="scroll-mt-20">
              <OperatorBackOffice />
            </div>
          </section>

          {/* 3. Venue Utilization & F&B Attach Reporting */}
          <section id="reporting" className="scroll-mt-20">
            <VenueUtilizationReporting />
          </section>

          {/* 4. Real Dual-Provider AI Event Package Builder */}
          <section id="ai-planner" className="scroll-mt-20">
            <AiPackageRecommender />
          </section>

          {/* 5. Production Concurrency & Throughput Telemetry */}
          <section id="metrics" className="scroll-mt-20">
            <BentoGrid />
          </section>

          {/* 6. Venue Economics & Cloud Infrastructure Costs */}
          <section id="roi" className="scroll-mt-20">
            <RoiCostCalculator />
          </section>

          {/* 7. Turnkey Architecture Schemas & Integration Contracts */}
          <section id="blueprints" className="scroll-mt-20">
            <BlueprintExporter />
          </section>
        </div>
      </main>

      <Footer />

      <ChaosSimulatorModal
        open={chaosModalOpen}
        onOpenChange={setChaosModalOpen}
      />

      <AiGovernanceDrawer
        open={governanceDrawerOpen}
        onOpenChange={setGovernanceDrawerOpen}
      />

      <ExecutionLogDrawer
        open={logsDrawerOpen}
        onOpenChange={setLogsDrawerOpen}
      />

      <CommandMenu
        open={commandMenuOpen}
        onOpenChange={setCommandMenuOpen}
        onOpenChaos={() => {
          setCommandMenuOpen(false);
          setChaosModalOpen(true);
        }}
        onOpenGovernance={() => {
          setCommandMenuOpen(false);
          setGovernanceDrawerOpen(true);
        }}
        onOpenLogs={() => {
          setCommandMenuOpen(false);
          setLogsDrawerOpen(true);
        }}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
