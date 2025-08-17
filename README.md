# mohdamzar.com - Personal Website

Modern personal website built with React, TypeScript, and Tailwind CSS featuring a beautiful purple theme and dark mode support.

## 🚀 Features

- **Modern Design**: Beautiful light purple color scheme with gradients
- **Dark Mode**: Full dark mode support with system preference detection
- **Responsive**: Mobile-first design that works on all screen sizes
- **Animations**: Smooth scroll-triggered animations and micro-interactions
- **TypeScript**: Fully typed with TypeScript for better development experience
- **Fast**: Built with Vite for lightning-fast development and builds

## 🛠️ Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next generation frontend tooling
- **Framer Motion** - Production-ready motion library for React

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd react-website

# Install dependencies
make install
# or
npm install

# Start development server
make dev
# or
npm run dev
```

## 🔧 Available Commands

All commands are available via Makefile for convenience:

```bash
make help          # Show all available commands
make install       # Install dependencies
make dev          # Start development server
make build        # Build for production
make preview      # Preview production build
make clean        # Clean build artifacts
make lint         # Run ESLint
make typecheck    # Run TypeScript type checking
make format       # Format code with Prettier
make deploy-vercel # Deploy to Vercel
```

## 🚀 Deployment

### Local Development
```bash
make dev
```
Visit `http://localhost:5173`

### Vercel Deployment
```bash
make deploy-vercel
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header with theme toggle
│   ├── Hero.tsx        # Hero section with profile
│   ├── ExperienceSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   └── Section.tsx     # Reusable section wrapper
├── hooks/              # Custom React hooks
│   ├── useTheme.ts     # Dark mode theme management
│   └── useScrollAnimation.ts # Scroll-triggered animations
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎨 Customization

### Colors
The color scheme is defined in `tailwind.config.js`:
- Primary: Purple shades (50-900)
- Secondary: Violet shades (50-900)

### Fonts
- Primary: Inter (headings and body text)
- Mono: JetBrains Mono (code blocks)

### Content
Update your personal information in:
- `src/components/Hero.tsx` - Profile and introduction
- `src/components/ExperienceSection.tsx` - Work experience
- `src/components/ProjectsSection.tsx` - Projects showcase
- `src/components/ContactSection.tsx` - Contact information
