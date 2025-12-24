.PHONY: help install dev build test test-ui lint typecheck clean docker-build docker-run docker-stop

help:
	@echo "install       - Install dependencies"
	@echo "dev          - Start development server"
	@echo "build        - Build for production"
	@echo "test         - Run tests"
	@echo "test-ui      - Run tests with UI"
	@echo "lint         - Run linter"
	@echo "typecheck    - Run TypeScript type checking"
	@echo "clean        - Remove build artifacts"
	@echo "docker-build - Build Docker image"
	@echo "docker-run   - Run Docker container"
	@echo "docker-stop  - Stop Docker container"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

test:
	npm run test:run

test-ui:
	npm run test:ui

lint:
	npm run lint

typecheck:
	npx tsc --noEmit

clean:
	rm -rf dist node_modules/.vite

docker-build:
	docker build -t mohdamzar-website:latest .

docker-run:
	docker run -d -p 3000:3000 --name mohdamzar-web mohdamzar-website:latest

docker-stop:
	docker stop mohdamzar-web && docker rm mohdamzar-web
