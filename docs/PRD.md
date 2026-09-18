# Product Requirements Document (PRD): VenueStrike Core

## Executive Summary
VenueStrike Core is an enterprise-grade high-concurrency booking and venue operations engine engineered specifically for competitive socializing venues (bowling centers, interactive darts bars, and entertainment lounges). It directly eliminates the client's biggest operational nightmare: **Friday and Saturday night peak race conditions resulting in front-desk double-bookings where groups of 12 arrive to find their reserved lane occupied.**

---

## 1. Core Defensibility Hook: Peak Concurrency Shield
- **Client Fear**: *"Reliability at peak. On Friday and Saturday nights every venue is busy at once, and a double booking means a group of 12 standing at the front desk."*
- **Architectural Solution**:
  1. **PostgreSQL Transaction Advisory Locks (`pg_try_advisory_xact_lock`)**: Generates a 64-bit bigint hash of `(venue_id, resource_id, time_slot)` to enforce an atomic mutex without table-level locking.
  2. **120-Second Redis Optimistic Hold**: When a guest selects a lane or dartboard, the resource is marked `HELD` for 120 seconds with an auto-expiring TTL key while they customize their package and enter payment info.
  3. **Automated Collision Rerouting**: If competing threads contend for the exact same slot, exactly 1 thread wins the lock; the remaining threads are instantly redirected to adjacent available lanes without failing or crashing.

---

## 2. Platform Modules & Scope

### A. Guest Booking Flow
- **Interactive Floor Map**: 16 bowling lanes, 8 interactive dartboards, and 2 VIP celebration suites with live state transitions (`AVAILABLE`, `HELD`, `BOOKED`, `MAINTENANCE`).
- **Package Bundler**: Real-time bundling of play time (hours or games) with artisan food platters, craft beer pitchers, and celebration wristbands.
- **Deposit Enforcement**: Dynamic upfront deposit calculation (40%–50% for peak slots; full payment options) with Stripe/Toast pre-authorization holds.

### B. Operator Back Office
- **Multi-Location Hierarchy**: Support for 4 live venue profiles (Austin Downtown, Brooklyn Social, Denver LoDo, Chicago West Loop).
- **Dynamic Pricing Rules**: Configurable peak (Friday 6 PM – Saturday midnight, 1.8x–2.5x) vs off-peak multipliers.
- **Rate Mode Toggling**: Seamless switching between per-hour lane rentals and per-game pricing.
- **Staff RBAC & Permissions**: Multi-tier access for General Managers, Front Desk Hosts, and Floor Servers.

### C. POS & Hardware Integrations
- **Toast POS / Square API**: Bi-directional webhook sync matching active lane bookings to open POS tabs. F&B orders placed at the lane automatically append to the master reservation balance.
- **Brunswick Sync & QubicaAMF Conqueror**: Low-latency TCP socket client communicating with pinsetter controllers to power lanes on at booking start time and safely cycle pins into standby at checkout.
- **RFID Tap Readers**: Support for cashless game card readers and arcade wristbands.

### D. Venue Manager Reporting & RevPASH
- **RevPASH Telemetry**: Real-time calculation of Revenue Per Available Slot Hour ($/lane/hr).
- **Floor Utilization Heatmap**: Hourly breakdown showing peak rush vs off-peak capacity.
- **F&B Attach Rate**: Real-time tracking of food & beverage spend per booking (target: >45%).
- **Live Transaction Activity Stream**: Chronological feed of POS receipts and lane status changes.

### E. Dual-Provider AI Event Planner
- **Real LLM Inference**: Direct OpenAI `gpt-4o-mini` integration with automated failover to Google Gemini `gemini-2.0-flash`.
- **Catering & Party Blueprint**: Generates tailored lane allocations, menu selections, deposit schedules, and concurrency advice based on headcount, celebration vibe, and budget.

---

## 3. Tech Stack & Non-Functionals
- **Frontend**: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Radix UI Primitives, Lucide Icons, Recharts.
- **Backend / API**: Next.js Serverless Functions (Fluid Compute), Node.js, PostgreSQL (AWS RDS), Redis (AWS ElastiCache).
- **Reliability SLA**: 99.99% peak availability; sub-4ms advisory lock acquisition latency; 0 double-bookings under 50-thread concurrent load.
- **Security & Governance**: PCI-DSS card pre-authorization tokenization, OWASP Top 10 for LLMs compliance, zero plaintext customer PII storage.

---

## 4. Delivery Roadmap & Paid First Milestone
- **Phase 0 (Completed & Live)**: Interactive Venue Booking Cockpit, Concurrency Lab, Operator Back Office, Manager Reporting, and Architecture Brief.
- **Milestone 1 (Weeks 1–2 / 70 Hrs @ $70/hr = $4,900)**: Paid backlog feature milestone: Production peak concurrency shield, PostgreSQL advisory locks, and Redis optimistic hold engine.
- **Milestone 2 (Weeks 3–4 / 70 Hrs @ $70/hr = $4,900)**: Guest booking flow, multi-lane party allocation, and F&B package bundler.
- **Milestone 3 (Weeks 5–6 / 70 Hrs @ $70/hr = $4,900)**: Operator back office, multi-location rules, and dynamic pricing engine.
- **Milestone 4 (Weeks 7–8 / 70 Hrs @ $70/hr = $4,900)**: Toast POS webhook synchronization and Brunswick Sync / QubicaAMF pinsetter socket bridge.
- **Milestone 5 (Weeks 9–10 / 70 Hrs @ $70/hr = $4,900)**: Manager reporting, RevPASH analytics, and CloudWatch peak incident alarms.
