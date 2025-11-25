# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Senda** is an integral wellness platform that combines AI technology with professional human support (trainers, nutritionists, kinesiologists) to help people live better lives.

### Core Principles (WHY-HOW-WHAT)

- **WHY:** Help people live better by putting our knowledge and experience at their service
- **HOW:** Combine intelligent technology (AI) with human professional support
- **WHAT:** An integral wellness platform where users find personalized tools for training, nutrition, meditation, and overall wellbeing

**Key Platform Principle:** Zero manual tasks for users - everything should come pre-solved.

## Architecture Philosophy

- **WHY:** Core and unchanging
- **HOW:** Core but can undergo modifications
- **WHAT:** Dynamic and must be easy to adapt

The platform must be built with modularity in mind to allow easy addition/modification of features.

## Tech Stack

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos y diseño responsivo (CSS Grid, Flexbox)
- **JavaScript (Vanilla)** - Interactividad y lógica del cliente
- No frameworks - Código nativo del navegador

### Backend (Futuro)
- Node.js con Express (APIs REST simples)
- JSON files o SQLite para inicio
- Migración futura a PostgreSQL según necesidad

### Librerías Mínimas Permitidas
- **Chart.js** - Para dashboards y gráficos
- **Day.js** - Manejo de fechas (ligero)
- **Fetch API** - Llamadas HTTP nativas

### Integraciones (Fase posterior)
- APIs de wearables (Garmin, Apple Health, Google Fit)
- OpenAI API o Claude API para planes con AI
- Servicios de terceros vía APIs REST

## Core Modules

1. **Training Module**
   - AI-generated or trainer-assigned plans
   - Connect users with trainers by location/specialty
   - Wearable integrations
   - Group training sessions

2. **Nutrition Module**
   - AI or nutritionist-based meal plans
   - Weekly meal planning with shopping lists
   - Step-by-step recipes
   - Meal tracking

3. **Meditation Module**
   - Daily guided meditations
   - Breathing exercises
   - Required daily practice tracking

4. **Community Module**
   - Connect users by location and sport
   - Training groups
   - Social features

5. **Additional Modules** (Future phases)
   - Kinesiology
   - Sleep analysis
   - Marketplace
   - Preventive health

## Daily User Experience

Each day, users see three main components:
1. Training plan for the day
2. Meals for the day with recipes
3. Meditation session for the day

## Development Phases

See [PLAN_DE_ACCION.md](PLAN_DE_ACCION.md) for detailed development roadmap.

- **Phase 1:** Planning and architecture (Weeks 1-2)
- **Phase 2:** MVP - Core modules (Weeks 3-12)
- **Phase 3:** Wearables + Community (Weeks 13-24)
- **Phase 4:** Advanced features + Marketplace (Weeks 25-40)
- **Phase 5:** Optimization and scaling (Week 41+)

## Repository Structure (Planned)

```
senda-web/
├── frontend/          # Next.js application
├── backend/           # NestJS microservices
└── mobile/            # React Native app (future)
```

## Key Considerations

- **Mobile-first:** Expect 80% of usage on mobile devices
- **Privacy:** GDPR/LGPD compliance, health data encryption
- **Performance:** Dashboard must load in < 2 seconds
- **Onboarding:** Must be completed in < 3 minutes
- **Data-driven:** All user data should feed into dynamic dashboards

## Current Status

Project is in initial planning phase. Review [PLAN_DE_ACCION.md](PLAN_DE_ACCION.md) for complete action plan and next steps.
