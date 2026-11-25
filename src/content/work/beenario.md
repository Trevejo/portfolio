---
title: Beenario
publishDate: 2025-05-01 00:00:00
img: /assets/beenario/beenario.jpg
img_alt: Beenario multiplayer binary conversion game interface featuring a black and yellow bee theme
description: |
  A Kahoot-inspired real-time multiplayer game for practicing binary and decimal conversions, built with Go microservices, ConnectRPC streaming, Valkey, and a Next.js TypeScript frontend.
tags:
- Full Stack
- Microservices
- Go & ConnectRPC
- Kubernetes & GitOps
---

## Real-time multiplayer learning for binary conversions

> Bees have two colors—black and yellow. A fitting metaphor for a game built around ones and zeros.

Beenario (a.k.a. BinaryGame) is a web-based, real-time multiplayer educational game hosted publicly on <a href="https://gitlab.com/binarygame">GitLab</a>. Inspired by Kahoot, the platform helps students practice converting numbers between decimal and binary formats by turning study sessions into timed, head-to-head races where the fastest player to finish wins.

From the ground up, the project was engineered around simplicity and minimal latency so every answer and leaderboard update feels instantaneous. Rather than relying on heavy JSON payloads, Beenario uses binary serialization and Protocol Buffers streaming over ConnectRPC to keep network overhead as small as possible during competitive matches.

<img src="/assets/beenario/home-page.png" alt="Beenario home page screen" style="width: 100%; height: auto;" />

### Responsive web experience and contract-driven clients

The web frontend is built with **Next.js**, **React**, **TypeScript**, and **Material UI**, running on Node.js and taking advantage of server-side rendering and static site generation for fast initial loads. Combined with React's efficient rendering and streaming RPC updates, players get a responsive, lag-free interface tailored for quick-thinking timed rounds.

Because all client-server interactions are strictly defined through **Protocol Buffers** contracts published to the <a href="https://buf.build/binarygame/gateway">Buf Schema Registry</a>, building alternative clients requires zero backend changes. To take advantage of this architecture, the project also explores a terminal user interface (TUI) built in **Go** with **Charm** tooling, consuming the exact same APIs as the browser app.

### Low-latency Go microservices and GitOps delivery

On the backend, Beenario separates concerns across clean, modular **Golang** microservices sitting behind a dedicated **API Gateway**. Inter-service communication runs over **ConnectRPC** for low-latency binary transport, while **Valkey** (an open-source Redis fork) serves as an in-memory data store to keep active match state instantly accessible.

Builds and deployments are fully automated through custom **Earthly** CI/CD pipelines. Pushing a semantic-versioned Git tag builds container images into **GitLab's internal Docker Registry** and reconciles them onto a **K3s Kubernetes** cluster via **Flux GitOps**. A dedicated pipeline on the API Gateway automatically pushes updated Protobuf definitions to the Buf Schema Registry, generating ready-to-use client libraries across languages.

<img src="/assets/beenario/bee-arquitetura.png" alt="Beenario microservices and infrastructure architecture" style="width: 100%; height: auto;" />

#### Technical highlights

- **Gamified CS fundamentals:** Real-time, Kahoot-style races focused on timed binary-to-decimal and decimal-to-binary conversions.
- **Instant-feel networking:** Protocol Buffers streaming over ConnectRPC paired with an in-memory Valkey datastore to minimize latency and bandwidth.
- **Multi-client architecture:** Next.js, TypeScript, and Material UI web frontend alongside an experimental Go + Charm TUI sharing identical Buf-published API contracts.
- **Automated GitOps pipelines:** Reproducible builds with Earthly and Docker, semantic-versioned releases via Flux on K3s, and automated schema publishing to Buf Schema Registry.
