---
title: CaronaShow
publishDate: 2026-12-01 00:00:00
img: /assets/caronashow/caronashow.png
img_alt: CaronaShow corporate carpooling interface showing an interactive map with optimized shared routes and driver recommendations
description: |
  A corporate carpooling platform combining a two-stage PVS-ALNS route optimization engine, institutional trust controls, and a GitOps-managed microservices architecture.
tags:
- Full Stack
- Route Optimization
- Kubernetes & GitOps
- UX/UI
---

## Computational intelligence for corporate carpooling

> Low car occupancy fuels urban congestion and emissions—yet carpooling adoption stalls without trust among commuters.

<a href="https://carona.show">CaronaShow</a> is a web and mobile corporate carpooling platform developed as a Computer Engineering capstone project at Faculdade Engenheiro Salvador Arena (FESA), with its codebase publicly hosted on <a href="https://gitlab.com/caronashow">GitLab</a>. Restricted to verified institutional email domains, the platform replaces the friction of riding with strangers with a closed organizational network covering intelligent ride recommendations, ride requests and approvals, linked in-app chat, and gamification.

To bridge transparency gaps in existing mobility platforms, CaronaShow exposes both its declared emission factors and an interactive step-by-step proof of concept at <a href="https://carona.show/map">carona.show/map</a>. Designed around Nielsen's heuristics and progressive disclosure, the interface keeps sensitive driver details hidden until a connection is accepted, supports women-only ride preferences within the organization, and enforces versioned LGPD consent workflows.

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; align-items: start;">
  <img src="/assets/caronashow/inicio-passageiro.png" alt="CaronaShow passenger home screen" style="width: 100%; height: auto;" />
  <img src="/assets/caronashow/detalhe-carona.png" alt="CaronaShow ride details screen" style="width: 100%; height: auto;" />
  <img src="/assets/caronashow/conversa.png" alt="CaronaShow ride chat screen" style="width: 100%; height: auto;" />
</div>

### The PVS-ALNS matching and routing engine

Built as an independent Python service operating in production with OSRM and OpenStreetMap road data, the matching engine solves one-to-many return commutes in two stages. First, **Path Vector Similarity (PVS)** clusters commuters departing within a 10-minute window whose destination vectors share a cosine similarity of at least 0.5. Second, **Adaptive Large Neighborhood Search (ALNS)** optimizes vehicle assignments and drop-off sequences over 100 iterations using adaptive destroy-and-repair operators and Metropolis acceptance criteria, strictly enforcing vehicle capacity, a maximum 1.5x detour limit, and route shape similarity (DSPD ≥ 0.8).

Benchmarked on synthetic commuting data from Atlanta, the engine reduced total travel by 420.7 km and eliminated 72 vehicles in a 100-person sample—raising average occupancy to 3.6 people per vehicle compared to Brazil's 1.5 average, with an estimated 63.5 kg of avoided CO₂. In controlled experiments scaling up to 1,000 users, it published recommendations for 96.1% of requests and kept median incremental latency at 0.66 s in dense clusters, while revealing cold-start simultaneous-arrival bottlenecks earmarked for future optimization.

<img src="/assets/caronashow/poc-rotas-otimizadas.jpg" alt="CaronaShow POC map screenshot" style="width: 100%; height: auto;" />

### Microservices, cloud-native stack, and quality

CaronaShow uses a single React, Vite, and Capacitor codebase for web and mobile, backed by Go microservices (core rides and LGPD/admin operations) and the Python matching engine. Services communicate through 12 Connect/Protobuf RPC services (58 endpoints) behind a Kubernetes Gateway API (Traefik), while NATS JetStream powers asynchronous job queues, caching, notifications, and real-time chat. Spatial and relational data live in PostgreSQL with PostGIS (55 tables), object storage runs on S3-compatible SeaweedFS, and authentication is centralized via Keycloak with OpenID Connect SSO.

The entire platform runs on two single-node K3s Kubernetes clusters (development and production) hosted on Oracle Cloud's free ARM tier (4 vCPUs, 24 GB RAM each) and reconciled continuously from GitLab via Flux GitOps, which automated 547 of 784 infrastructure updates. Reliability is backed by roughly 1,470 automated tests across repositories: 816 frontend unit tests, 105 Playwright UI tests, 523 Go backend tests, and 29 Python engine tests.

<img src="/assets/caronashow/arquitetura.png" alt="CaronaShow's arquitecture schema" style="width: 100%; height: auto;" />

#### Validation and academic recognition

- **Real-world pilot (FESA):** 16 of 24 respondents (67%) stated they would use the app, 10 of 12 car owners were willing to offer rides, 88% confirmed safety influences carpool choices, and post-use feedback averaged 4.5 out of 5 across four rated evaluations.
- **CONIC-SEMESP 2026:** Accepted and presented a paper analyzing CaronaShow's interface and usability decisions.
- **SBCARS 2026 (CBSoft):** Submitted an experience report on the free-tier, single-node K3s GitOps architecture, incorporating peer reviews directly into the platform's evolution.
- **Next roadmap milestones:** Expanding beyond connection and chat into dated trip logging, live route tracking, emergency alerts, many-to-one morning commute matching, and an organizational ESG dashboard.
