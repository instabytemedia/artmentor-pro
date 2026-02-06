# ArtMentor Pro

> Unlock Artistic Potential

ArtMentor Pro focuses on professional artists and art schools, offering advanced AI-powered mentorship, portfolio management, and networking opportunities with galleries and collectors. The app provides in-depth analysis of artwork, suggestions for improvement, and access to exclusive art events. By targeting a more premium audience, ArtMentor Pro can offer higher-tier services and generate revenue through subscription-based models.

## Features

- Advanced AI-powered mentorship
- Portfolio management
- Networking opportunities

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Getting Started

1. Clone this repository
2. Copy `.env.example` to `.env.local` and fill in your credentials
3. Run `npm install`
4. Run `npm run dev`

## Project Structure

```
├── app/                  # Next.js App Router pages
├── components/           # React components
├── lib/                  # Utilities and helpers
├── supabase/            # Database schema
└── INSTRUCTIONS.md      # Detailed build guide for AI assistants
```

## Database

This project uses 3 main entities:
- **Idea**: A user's artistic idea or concept
- **Targeting**: The target audience for a user's artwork
- **Goodread**: A user's favorite artwork or inspiration

## Build Instructions

For detailed step-by-step build instructions, see [`INSTRUCTIONS.md`](./INSTRUCTIONS.md).

This file contains comprehensive guidance for building this project with AI coding assistants like Claude Code, Cursor, or Windsurf.

---

*Generated with [Claudery](https://claudery.io) - AI-powered blueprint generator*
