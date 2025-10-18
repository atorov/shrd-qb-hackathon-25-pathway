# QB-25

AI-powered chat interface that integrates with Quickbase workflows using local Ollama models for conversation analysis and sentiment tracking.

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
