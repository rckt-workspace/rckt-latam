# RCKT LATAM

**Sibling project of [RCKT Spain](https://github.com/rckt-workspace/rckt-web-builder)**

RCKT LATAM is a regional adaptation of RCKT's growth AI platform, tailored for Latin American markets. While sharing the same technical foundation as RCKT Spain, RCKT LATAM maintains independent configuration, content, business logic, and regional compliance.

## About RCKT

RCKT es un sistema de crecimiento con IA para empresas de habla hispana. Diseñamos, operamos y escalamos sistemas de marketing con un modelo de precio ligado a resultados, no a horas.

**Live app:** https://rckt-latam.lovable.app (development)

---

## 🏗️ Architecture Foundation

RCKT LATAM and RCKT Spain share the same technical stack but maintain complete regional separation:

### Shared Technical Stack

- **Frontend**: TanStack Start + React 19 + TypeScript
- **Build**: Vite 7 + Tailwind CSS 4
- **Server**: Nitro (SSR)
- **Backend AI Service**: FastAPI (Python 3.12)
- **Database**: Supabase (PostgreSQL)
- **Package Manager**: Bun
- **Deployment**: Docker + Render

### Regional Separation

Each region has its own:

- **Configuration**: `src/config/` (market, SEO, contact, features)
- **Content**: Region-specific copy, branding, images
- **Business Logic**: Regional features and compliance
- **Knowledge Base**: AI agent knowledge separated by region
- **Compliance**: Regional legal and privacy requirements

---

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Open browser
open http://localhost:5173
```

### With AI Service

```bash
# Terminal 1: Frontend
bun run dev

# Terminal 2: AI Service (requires Python 3.11+)
cd services/ai
pip install -e .
python -m uvicorn app.main:app --reload

# Access frontend
open http://localhost:5173
```

### Environment Setup

```bash
# Copy environment files
cp .env.example .env
cp services/ai/.env.example services/ai/.env

# Edit and configure
# Required:
#   - SUPABASE_URL & SUPABASE_PUBLISHABLE_KEY
#   - ANTHROPIC_API_KEY (for AI service)
```

---

## 📁 Project Structure

```
rckt-latam/
├── src/
│   ├── config/                    # Regional configuration layer
│   │   ├── market.ts             # Market/brand settings
│   │   ├── seo.ts                # SEO & meta configuration
│   │   ├── contact.ts            # Contact & support channels
│   │   ├── features.ts           # Feature flags
│   │   └── index.ts              # Barrel export
│   ├── components/               # React components
│   │   ├── rckt/                 # RCKT-specific components
│   │   └── ui/                   # shadcn/ui components
│   ├── routes/                   # TanStack Router pages
│   │   ├── api/                  # API endpoints
│   │   ├── __root.tsx            # Root layout
│   │   └── index.tsx             # Landing page
│   ├── lib/                      # Utilities
│   ├── integrations/             # External integrations
│   │   └── supabase/             # Supabase client & middleware
│   └── styles.css
├── services/
│   └── ai/                       # FastAPI AI service
│       ├── app/
│       │   ├── api/              # API endpoints
│       │   ├── agents/           # AI agent definitions
│       │   ├── llm/              # LLM providers
│       │   ├── schemas/          # Pydantic schemas
│       │   └── services/         # Business logic
│       ├── tests/                # Test suite
│       ├── pyproject.toml
│       └── Dockerfile
├── scripts/
│   └── start-production.sh       # Production entrypoint
├── Dockerfile                     # Multi-stage build
├── .env.example                   # Environment template
├── DEPLOYMENT.md                  # Deployment guide
└── README.md (this file)
```

---

## ⚙️ Configuration

All regional settings are controlled through `src/config/`:

### Market Configuration (`src/config/market.ts`)

```typescript
marketConfig.brand.domain; // LATAM domain
marketConfig.brand.email; // Support email
marketConfig.business.currency; // Currency (USD, etc.)
marketConfig.api.aiServiceUrl; // AI service URL
```

### SEO Configuration (`src/config/seo.ts`)

```typescript
seoConfig.siteUrl; // LATAM website URL
seoConfig.organization; // Organization details
seoConfig.geo.regions; // Geographic targeting
```

### Contact Configuration (`src/config/contact.ts`)

```typescript
contactConfig.contacts.sales; // Sales email/phone
contactConfig.businessHours; // LATAM business hours
contactConfig.channels; // Communication channels
```

### Feature Flags (`src/config/features.ts`)

```typescript
featuresConfig.core.advisorChat; // Enable AI chat
featuresConfig.admin.adminPanel; // Admin interface
featuresConfig.integrations.supabase; // Backend integration
```

---

## 🏭 Development vs. Production

### Development Build

```bash
bun run build:dev
```

### Production Build

```bash
bun run build
```

### Docker Build & Run

```bash
docker build -t rckt-latam:latest .
docker run -p 10000:10000 -e PORT=10000 rckt-latam:latest
```

---

## 🧪 Testing & Validation

```bash
# Frontend build
bun run build

# Backend syntax check
python -m compileall services/ai -q

# Type checking
tsc --noEmit

# Linting
bun run lint

# Run tests (if available)
cd services/ai
pytest tests/
```

---

## 📚 Key Differences from Spain

| Aspect         | Spain                  | LATAM                   |
| -------------- | ---------------------- | ----------------------- |
| Domain         | rckt.es                | rckt.latam              |
| Email          | hola@rckt.es           | hola@rckt.latam         |
| Language       | Spanish                | Spanish                 |
| Compliance     | GDPR + Spanish regs    | LATAM local regs        |
| Features       | Full feature set       | Configurable per region |
| Content        | Spain-specific         | LATAM-specific          |
| Knowledge Base | Spain market knowledge | LATAM market knowledge  |

---

## 🔄 Staying in Sync with Spain Foundation

Both projects share the same technical foundation but can diverge on features and content:

1. **Architecture Changes**: Both projects should adopt simultaneously (Nitro, FastAPI versions, etc.)
2. **Bugfixes**: Core framework bugs should be fixed in both
3. **New Features**: Can be enabled/disabled via `src/config/features.ts`
4. **Content**: Completely independent per region

---

## 🚢 Deployment

### Render.com (Recommended)

1. Connect GitHub: `rckt-workspace/rckt-latam`
2. Set environment variables (see `.env.example`)
3. Docker build will run automatically
4. Service starts with health check

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 🔐 Security

- **API Keys**: Never commit `.env` files; use service secrets
- **Supabase Keys**: Public key OK (scoped by RLS), service key private
- **AI Provider Keys**: Always server-side only (FastAPI)
- **CORS**: Configured per environment

---

## 📖 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment & configuration guide
- [services/ai/README.md](./services/ai/README.md) - AI service documentation
- [src/config/index.ts](./src/config/index.ts) - Configuration structure

---

## 🛠️ Technology Stack

| Layer           | Technology            | Version         |
| --------------- | --------------------- | --------------- |
| Frontend        | React                 | 19.2.0          |
| Router          | TanStack Router       | 1.170+          |
| Framework       | TanStack Start        | 1.168+          |
| Styling         | Tailwind CSS          | 4.2.1           |
| Build Tool      | Vite                  | 7.3.1           |
| Package Manager | Bun                   | 1.2+            |
| Server          | Nitro                 | 3.0.260603-beta |
| Backend API     | FastAPI               | 0.141.1         |
| Database        | Supabase (PostgreSQL) | Latest          |
| Python          | Python                | 3.11+           |
| Container       | Docker                | Latest          |

---

## 🤝 Contributing

### Before You Commit

```bash
# Ensure no errors
bun run build
python -m compileall services/ai -q
tsc --noEmit
bun run lint
```

### Creating a Feature

1. Create feature flag in `src/config/features.ts`
2. Use in components: `import { featuresConfig } from '@/config'`
3. Test locally, commit to feature branch
4. Create PR to `main`

---

## 📝 License

Built with [Lovable](https://lovable.dev).

---

## 📞 Support

For RCKT LATAM specific issues:

- Email: hola@rckt.latam (TODO: Update)
- Sales: ventas@rckt.latam (TODO: Update)

For technical architecture questions, see [rckt-workspace/rckt-web-builder](https://github.com/rckt-workspace/rckt-web-builder).

---

**Last Updated:** September 16, 2026
**Status:** Foundation Phase - Technical architecture complete, awaiting content and regional configuration
