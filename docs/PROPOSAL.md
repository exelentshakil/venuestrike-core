strike.

hi,

on friday and saturday nights, every entertainment venue is packed at once, and a double booking means a group of 12 standing at the front desk with nowhere to bowl. 

to prove how i solve this end to end, i built a working venue booking and peak concurrency engine you can test right now. it uses postgresql transaction advisory locks (pg_try_advisory_xact_lock) and a 120s redis hold. run the 50-thread peak rush test in the demo, and you will see 50 simultaneous requests hit the same lane with exactly 1 winner and 0 double bookings.

one feature i recently owned end to end was a high-concurrency reservation lock for a marketplace booking system. the problem was concurrent checkouts during flash drops causing overselling. on the backend, i built an atomic mutex using postgresql transaction advisory locks and redis ttl holds so only one thread could hold a slot while checking out. on the frontend, i built a real-time reservation countdown with automatic optimistic release and instant rerouting to adjacent slots if blocked. to verify it in production, i wrote k6 stress scripts simulating 200 concurrent checkout sessions and monitored p99 db lock latency (held under 4ms) with zero inventory collisions.

live demo: https://venuestrike-core.vercel.app
github: https://github.com/exelentshakil/venuestrike-core
1-min video: https://youtube.com/shorts/kK3XZd5PNOk

i have 12+ years of full-stack engineering (typescript, react, node.js, postgresql, aws), including 4 years leading engineering at legiit where we scaled to $1m arr. i have extensive experience with toast pos webhooks, payment holds, and hardware socket protocols.

my profile rate is $80/hr, but for a 30 to 40 hr/week dedicated role i am ready to start at $70/hr. we can begin with a paid 2-week backlog feature milestone so you can evaluate my code quality and delivery speed risk-free. i also have 4+ hours of daily overlap with us eastern time.

would love to take a backlog ticket and get started.

best,
shaq
