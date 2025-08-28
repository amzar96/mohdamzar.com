.PHONY: install dev build preview clean lint typecheck format deploy-local deploy-vercel help

NODE_MODULES = node_modules

help:
	@echo "Available commands:"
	@echo "  install        - Install dependencies"
	@echo "  dev           - Start development server"
	@echo "  build         - Build for production"
	@echo "  preview       - Preview production build"
	@echo "  clean         - Clean build artifacts"
	@echo "  lint          - Run ESLint"
	@echo "  typecheck     - Run TypeScript type checking"
	@echo "  format        - Format code with Prettier"
	@echo "  deploy-local  - Start local development server"
	@echo "  deploy-vercel - Deploy to Vercel"

install:
	@echo "Installing dependencies..."
	@npm install

dev: $(NODE_MODULES)
	@echo "Starting development server..."
	@npm run dev

build: $(NODE_MODULES)
	@echo "Building for production..."
	@npm run build

preview: build
	@echo "Starting preview server..."
	@npm run preview

clean:
	@echo "Cleaning build artifacts..."
	@rm -rf dist
	@rm -rf node_modules/.vite
	@echo "Clean complete"

lint: $(NODE_MODULES)
	@echo "Running ESLint..."
	@npm run lint

typecheck: $(NODE_MODULES)
	@echo "Running TypeScript type checking..."
	@npx tsc --noEmit

format: $(NODE_MODULES)
	@echo "Formatting code..."
	@npx prettier --write src/**/*.{ts,tsx,js,jsx,css,md}

deploy-local: dev

deploy-vercel:
	@echo "Deploying to Vercel..."
	@npx vercel --prod

$(NODE_MODULES): package.json
	@echo "Dependencies not found. Installing..."
	@npm install
