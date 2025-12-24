# mohdamzar.com - Personal Website

A modern, modular personal website built with React, TypeScript, and Vite. Features a terminal-based interface, config-driven content management, and Docker support.

## Features

- **Config-Driven Content**: All personal data centralized in a single YAML file
- **Modular Architecture**: Clean, maintainable folder structure
- **Docker Support**: Production-ready containerization with optimized caching
- **Comprehensive Testing**: Test suite with Vitest
- **Terminal Interface**: Interactive command-line themed homepage
- **Developer Utilities**: Built-in tools for developers
- **Dark Mode**: Full dark mode support with multiple themes
- **Responsive Design**: Mobile-first approach

## Quick Start

```bash
make install
make dev
```

Visit `http://localhost:5173`

## Configuration

All personal data is centralized in `public/config.yaml`. Simply update this file to customize your site:

### Profile Information
```yaml
profile:
  name: Your Name
  pronouns: he/him
  title: Your Title
  email: your@email.com
  location: Your City, Country
  image: https://your-image-url.com/photo.png
  start_year: 2019
```

### Social Links
```yaml
social:
  github: https://github.com/username
  linkedin: https://linkedin.com/in/username
  stackoverflow: https://stackoverflow.com/users/id
  behance: https://behance.net/username
```

### Experience
```yaml
experience:
  - title: Job Title
    company: Company Name
    period: Jan 2020 - Present
    location: City, Country
    technologies:
      - Python
      - AWS
      - Docker
```

### Projects
```yaml
projects:
  - title: Project Name
    description: Project description
    technologies:
      - React
      - TypeScript
    status: Production
    link: https://project-url.com
```

## Available Commands

```bash
make help          Show available commands
make install       Install dependencies
make dev          Start development server
make build        Build for production
make test         Run tests
make test-ui      Run tests with UI
make lint         Run linter
make typecheck    Run TypeScript type checking
make clean        Remove build artifacts
make docker-build Build Docker image
make docker-run   Run Docker container
make docker-stop  Stop Docker container
```

## Docker

Build and run with Docker:

```bash
make docker-build
make docker-run
```

The application will be available at `http://localhost:3000`

### Docker Features

- **Multi-stage builds** for optimized image size
- **Layer caching** for faster rebuilds
- **Production-ready** with serve static files
- **Minimal footprint** using Alpine Linux

## Project Structure

```
src/
├── config/           # Config loader and utilities
│   └── loader.ts     # YAML config loader
├── types/            # TypeScript type definitions
│   └── config.ts     # Config types
├── hooks/            # Custom React hooks
│   ├── useTheme.ts
│   ├── useConfig.ts
│   └── useScrollAnimation.ts
├── components/
│   ├── common/       # Reusable UI components
│   │   ├── Section.tsx
│   │   ├── Icons.tsx
│   │   └── Loading.tsx
│   ├── sections/     # Config-driven page sections
│   │   ├── HeroSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── ContactSection.tsx
│   ├── Terminal.tsx  # Terminal interface
│   ├── Header.tsx
│   └── Footer.tsx
├── pages/            # Page components
│   ├── Home.tsx      # Config-driven home page
│   └── Utils.tsx     # Developer utilities
└── App.tsx           # Main app with routing

tests/
└── __tests__/        # Test files
    ├── config.test.ts
    └── hooks.test.tsx

public/
└── config.yaml       # Site configuration file

Dockerfile            # Production Docker image
.dockerignore        # Docker build exclusions
Makefile             # Build automation
vitest.config.ts     # Test configuration
```

## Routes

- `/` - Terminal interface (interactive CLI theme)
- `/home` - Traditional home page (config-driven)
- `/utils` - Developer utilities

## Testing

Run tests with:

```bash
npm run test        # Run in watch mode
npm run test:run    # Run once
npm run test:ui     # Run with UI
```

All tests are located in `tests/__tests__/`

## Technology Stack

### Frontend
- **React 19** - Latest React with modern features
- **TypeScript 5.8** - Type safety and better DX
- **Tailwind CSS 3.4** - Utility-first CSS
- **React Router 7** - Client-side routing

### Build Tools
- **Vite 7** - Next-gen frontend tooling
- **PostCSS** - CSS transformations
- **Autoprefixer** - Automatic vendor prefixes

### Testing
- **Vitest 4** - Fast unit testing
- **Testing Library** - React testing utilities
- **Happy DOM** - Lightweight DOM implementation

### Development
- **ESLint 9** - Code quality
- **TypeScript ESLint** - TS-specific linting
- **js-yaml** - YAML config parsing

## Building for Production

```bash
make build
```

Build artifacts will be in the `dist/` directory and can be served with any static file server.

## Environment Requirements

- Node.js >= 22.0.0
- npm or compatible package manager
- Docker (optional, for containerization)

## Development Workflow

1. **Update Configuration**: Edit `public/config.yaml` with your details
2. **Install Dependencies**: Run `make install`
3. **Start Dev Server**: Run `make dev`
4. **Run Tests**: Run `make test` to ensure everything works
5. **Build**: Run `make build` to create production build
6. **Deploy**: Use Docker or deploy `dist/` to any static host

## License

MIT
