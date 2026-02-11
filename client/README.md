# Vicki — Full Stack Web Developer Portfolio

A modern portfolio website showcasing full-stack development projects, services, and expertise in React & Node.js.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn UI
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Testing**: Vitest
- **Package Manager**: Bun

## Getting Started

### Prerequisites
- Node.js 16+ or Bun
- npm, yarn, or Bun package manager

### Installation

```bash
# Install dependencies
bun install
# or
npm install
```

### Development

```bash
# Start development server
bun run dev
# or
npm run dev
```

The site will be available at `http://localhost:8080`

### Build

```bash
# Build for production
bun run build
# or
npm run build
```

### Preview

```bash
# Preview production build
bun run preview
# or
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Shadcn UI components
│   ├── AboutSection.tsx
│   ├── ContactSection.tsx
│   ├── PortfolioSection.tsx
│   ├── ServicesSection.tsx
│   ├── TechStackSection.tsx
│   └── ... other sections
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── App.tsx             # Main app component
```

## Features

- Responsive design for all devices
- Dark mode support
- Smooth animations and transitions
- Contact form with validation
- Portfolio showcase
- Services section
- Technology stack display

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint
- `bun run test` - Run tests
- `bun run test:watch` - Run tests in watch mode

## License

© 2025 Vicki. All rights reserved.
