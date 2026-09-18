# RCKT LATAM Deployment Guide

## Overview

RCKT LATAM is a sibling project of RCKT Spain (rckt-web-builder). Both share the same technical foundation but maintain separate regional configurations, content, and business logic.

**Shared Foundation:**

- TanStack Start + React 19 + TypeScript
- Vite build system
- Tailwind CSS 4
- Nitro server (SSR)
- FastAPI AI service (internal)
- Supabase backend
- Bun package manager

**Regional Separation:**

- Configuration layer: `src/config/`
- Market-specific content
- Regional compliance & features
- Localized contact & support channels

## Architecture

```
Internet
  ↓
Nitro (Port 10000)  ← Public SSR frontend
  ↓
FastAPI (127.0.0.1:8000)  ← Internal AI service
  ↓
OpenRouter / Anthropic Claude  ← LLM providers
```

## Prerequisites

### Local Development

- **Bun** 1.2+ (https://bun.sh)
- **Node.js** 20+ (optional, for fallback)
- **Python** 3.11+ (for services/ai)
- **Git**

### Production (Render.com or similar)

- Docker support
- Environment variable configuration
- Health check endpoints

## Local Development

### 1. Install Dependencies

```bash
# Frontend dependencies
bun install

# Backend dependencies (optional, for local testing)
cd services/ai
pip install -e .
cd ../..
```

### 2. Configure Environment

```bash
# Copy example files
cp .env.example .env
cp services/ai/.env.example services/ai/.env

# Edit and fill in your values
# Required for local dev:
#   - VITE_SUPABASE_URL & VITE_SUPABASE_PUBLISHABLE_KEY
#   - SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY
#   - ANTHROPIC_API_KEY (for FastAPI)
```

### 3. Run Development Server

```bash
# Frontend only (fastest for UI development)
bun run dev

# Or run both services locally:
# Terminal 1 - Frontend
bun run dev

# Terminal 2 - AI Service
cd services/ai
python -m uvicorn app.main:app --reload
```

Access: `http://localhost:5173`

### 4. Build Verification

```bash
# Check frontend build
bun run build

# Check backend syntax
python -m compileall services/ai -q
```

## Production Deployment

### Docker Build & Run

```bash
# Build
docker build -t rckt-latam:latest .

# Run locally
docker run -p 10000:10000 \
  -e PORT=10000 \
  -e VITE_SUPABASE_URL=<url> \
  -e VITE_SUPABASE_PUBLISHABLE_KEY=<key> \
  -e SUPABASE_URL=<url> \
  -e SUPABASE_SERVICE_ROLE_KEY=<key> \
  -e ANTHROPIC_API_KEY=<key> \
  -e AI_SERVICE_URL=http://127.0.0.1:8000 \
  rckt-latam:latest
```

### Render.com Deployment

1. **Connect Repository**
   - GitHub: rckt-workspace/rckt-latam
   - Branch: main (or feature/latam-foundation)

2. **Configure Web Service**
   - Build: `docker build -t rckt-latam:latest .`
   - Start: Uses Dockerfile CMD

3. **Environment Variables**

   ```
   PORT=10000
   VITE_SUPABASE_URL=<production-url>
   VITE_SUPABASE_PUBLISHABLE_KEY=<production-key>
   SUPABASE_URL=<production-url>
   SUPABASE_SERVICE_ROLE_KEY=<production-key>
   ANTHROPIC_API_KEY=<production-key>
   AI_SERVICE_URL=http://127.0.0.1:8000
   ```

4. **Health Check**
   - Path: `/`
   - Port: 10000
   - Interval: 30s

## Configuration

### Market Configuration

Edit `src/config/market.ts` for LATAM-specific settings:

```typescript
export const marketConfig = {
  region: "latam",
  brand: {
    domain: "rckt.latam",
    email: "hola@rckt.latam",
    phone: "+1-XXX-XXX-XXXX",
  },
  // ... more settings
};
```

### SEO Configuration

`src/config/seo.ts` for search engine optimization:

- Meta tags
- Schema markup
- Sitemap configuration
- Geographic targeting

### Contact Configuration

`src/config/contact.ts` for support channels:

- Email addresses
- Phone numbers
- Business hours
- Lead capture settings

### Feature Flags

`src/config/features.ts` controls which features are enabled:

```typescript
export const featuresConfig = {
  core: {
    advisorChat: true, // AI chat on landing page
    leadCapture: true, // Contact forms
  },
  advanced: {
    performanceMetrics: false, // Enable when dashboard ready
    adminPanel: false, // Enable when operations ready
  },
  // ... more flags
};
```

## Verification Checklist

### Before Committing

- [ ] `bun install` completes without errors
- [ ] `bun run build` succeeds
- [ ] `python -m compileall services/ai -q` passes
- [ ] No TypeScript errors: `tsc --noEmit`
- [ ] ESLint check: `bun run lint`

### Before Deploying

- [ ] Environment variables configured
- [ ] Supabase project created and keys added
- [ ] Anthropic API key obtained
- [ ] Docker build succeeds locally
- [ ] Health check endpoints respond
- [ ] Both FastAPI and Nitro start in container

## Troubleshooting

### Build Issues

**Error: Vite configuration not found**

- Ensure `vite.config.ts` exists in root
- Check `@lovable.dev/vite-tanstack-config` is installed

**Error: Nitro build fails**

- Clear `.output/` directory
- Run `bun run build` again
- Check `src/server.ts` and `src/start.ts` exist

### Runtime Issues

**FastAPI not starting**

- Check Python version: `python --version` (need 3.11+)
- Verify dependencies: `pip list | grep fastapi`
- Check `.env` file in `services/ai/`

**Port conflicts**

- Default port: 10000 (can override with PORT env var)
- FastAPI uses 127.0.0.1:8000 internally
- Check: `netstat -an | grep LISTEN`

**Health check failing**

- Verify Nitro is responding: `curl http://localhost:10000/`
- Check logs for startup errors
- Increase `start-period` in Dockerfile if needed

## Regional Customization

### Add LATAM-Specific Features

1. Create feature flag in `src/config/features.ts`
2. Import in your component: `import { featuresConfig } from '@/config'`
3. Conditionally render: `{featuresConfig.core.advisorChat && <AdvisorChat />}`

### Localize Content

1. Keep Spanish text content in `src/components/rckt/` (Spain uses Spanish too)
2. Use `src/config/contact.ts` for contact information
3. Update `src/config/seo.ts` for region-specific SEO

### Add LATAM Business Logic

1. Create region-specific utilities: `src/lib/latam/`
2. Import region config: `import { marketConfig } from '@/config'`
3. Use `marketConfig.region === 'latam'` for conditional logic

## Monitoring & Observability

### Logs

- Frontend: Browser console + Sentry (if enabled)
- Backend: FastAPI logs in container
- Nitro: Server logs in container

### Health Checks

- Public: `GET http://localhost:10000/`
- AI Service: `GET http://127.0.0.1:8000/healthz`
- Supabase: Connection status in admin panel

### Metrics

- Configure Langfuse (optional): Set `LANGFUSE_PUBLIC_KEY` and `LANGFUSE_SECRET_KEY`
- Track API usage in `services/ai/app/services/usage_tracker.py`

## Security Notes

1. **API Keys**
   - NEVER commit `.env` files
   - Use Render secrets for production
   - Rotate keys regularly

2. **CORS**
   - FastAPI CORS configured in `services/ai/app/main.py`
   - Update allowed origins for production

3. **Database**
   - Supabase handles encryption at rest
   - Use service role key only on server-side
   - Public key exposed to frontend is fine (scoped by Supabase policies)

4. **AI Provider Keys**
   - Anthropic/OpenRouter keys must stay server-side
   - Never expose to frontend
   - Validate requests in FastAPI

## Support & Troubleshooting

For issues:

1. Check logs: `docker logs <container-id>`
2. Verify environment variables
3. Check Render deployment logs
4. Compare with Spain project (rckt-web-builder) if similar features work there

## Next Steps

1. **Regional Content**: Add LATAM-specific copy and branding
2. **Advisor Chat**: Enable and configure AI agent for LATAM
3. **Metrics Dashboard**: Integrate performance tracking
4. **Admin Panel**: Set up operations & management interface
5. **Analytics**: Configure GA4 and other tracking
