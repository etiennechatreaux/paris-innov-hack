# Vox

Voice talent marketplace connecting professional voice actors with clients worldwide.

## Overview

Vox is a two-sided marketplace where:
- **Voice Talent** can showcase their skills, set their rates, and get hired for projects
- **Clients** can browse, filter, and request professional voice work

## Features

### For Voice Talent
- Create a professional profile with audio samples
- Set your own hourly rates
- Manage contracts and track earnings
- Referral program with rewards

### For Clients
- Browse 20,000+ voices across multiple languages
- Advanced filtering (language, gender, age, style, price)
- Voice Radar - interactive tool to find the perfect voice
- Request and manage voice projects

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase
- **i18n**: next-intl

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm

### Installation

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── (public)/      # Landing, Browse Voices, Apply
├── (dashboard)/   # Home, Explore, Earnings, Referral, Profile
components/
├── ui/            # Base UI components
├── contracts/     # Contract management
├── earnings/      # Earnings dashboard
lib/
├── data.ts        # Voice talent data
├── contracts-data.ts
```

## Key Stats

- $150/hour average voice talent pay
- 20,000+ voices available
- $150k+ daily payouts
