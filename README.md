# AI ShopAssist

A full-stack AI-powered shopping assistant application.

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install pnpm](#2-install-pnpm)
  - [3. Setup and Run the API](#3-setup-and-run-the-api)
  - [4. Setup and Run the Client](#4-setup-and-run-the-client)
- [Project Structure](#project-structure)
- [License](#license)

## Overview
AI ShopAssist is an AI-powered shopping assistant web application. It consists of an API backend and a React frontend client.

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (see below for installation)
- Git

## Getting Started

### 1. Clone the Repository
```zsh
git clone <your-repo-url>
cd ai-shopassist
```

### 2. Install pnpm
If you don't have pnpm installed, run:
```zsh
npm install -g pnpm
```

### 3. Setup and Run the API
```zsh
cd api
pnpm install
```

#### Configure Environment Variable
You need a Google Generative AI API key. Set it in your shell:
```zsh
export GOOGLE_GENERATIVE_AI_API_KEY="your-api-key-here"
```

#### Start the API server
```zsh
pnpm run dev
```
The API server will start (default: http://localhost:3000 or as configured).

### 4. Setup and Run the Client
Open a new terminal, then:
```zsh
cd client
pnpm install
pnpm run dev
```

The client will be available at [http://localhost:5173](http://localhost:5173).

## Project Structure
- `api/` - Backend API (Node.js)
- `client/` - Frontend (React + Vite)
- `plan.md` - Project planning notes



---

**Note:**
- Make sure both API and client are running for full functionality.
- For any issues, check the respective `README.md` in `api/` or `client/` if available, or open an issue in the repository.
