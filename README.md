# QB Hackathon 2025, Team Pathway

Create conversational AI assistants for customer interactions—no code required. Business teams can design flows in Quickbase, and customers can chat to select products, submit requests, renew contracts, and more.

![Demo](https://github.com/atorov/shrd-qb-hackathon-25-pathway/blob/master/public/demo.gif)

## Overview

This project enables companies running on Quickbase to deploy AI-powered chat assistants that:

- **Follow structured flows** stored in Quickbase tables with context-adaptive responses
- **Understand customer sentiment** and track it throughout conversations
- **Execute tools** for calculations, document generation, and external integrations via Pipelines
- **Generate summaries** for both customers (with download/print options) and internal teams
- **Provide analytics** through Quickbase dashboards showing flow usage, sentiment distribution, completion rates, and session clustering

All conversation data and insights are stored in Quickbase for visualization and analysis.

## Quick Start

**Prerequisites:** Node.js 18+, [Ollama](https://docs.ollama.com/quickstart), Quickbase account

### 1. Install Ollama and AI model

```bash
# Follow: https://docs.ollama.com/quickstart
ollama pull gemma3n
```

### 2. Setup environment

```bash
cp .env.example .env
# Edit .env and add: VITE_API_TOKEN=your_quickbase_token
```

### 3. Install dependencies

```bash
npm install
npm run cert
```

### 4. Start development

```bash
npm run dev
```

Open [https://localhost:9001/](https://localhost:9001/)

## Configuration

Key environment variables in `.env`:

- `VITE_API_TOKEN` - Your Quickbase API token (required)
- `VITE_REALM_ID` - Quickbase realm ID
- `VITE_APP_ID` - Quickbase application ID

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run cert` - Generate SSL certificates
