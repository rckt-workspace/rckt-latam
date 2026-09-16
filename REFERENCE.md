# Spanish References Found in Codebase

This document catalogs all found references to Spain/Spanish market and their classification for LATAM regionalization.

## Classification

- **SHARED**: Generic content/logic that applies to both Spain and LATAM
- **SPAIN_ONLY**: Specific to Spain market, should not be copied
- **NEEDS_LATAM_VALUE**: Placeholder or region-specific value that needs LATAM update
- **LATAM_ADAPTED**: Already updated for LATAM market

## Contact Information

| Type | Value | Location | Classification | LATAM Status |
|------|-------|----------|-----------------|-------------|
| Domain | rckt.es | SEO schema, config | SPAIN_ONLY | ✅ [market.ts] TODO |
| Email (General) | hola@rckt.es | SEO schema, config | SPAIN_ONLY | ✅ [market.ts] TODO |
| Email (Sales) | - | - | NEEDS_LATAM_VALUE | ⏳ Pending |
| Email (Support) | - | - | NEEDS_LATAM_VALUE | ⏳ Pending |
| Phone | - | - | NEEDS_LATAM_VALUE | ⏳ Pending |

## Content References

### Landing Page Text
| Content | Location | Classification | Status |
|---------|----------|-----------------|--------|
| "Sistemas de crecimiento con IA para negocios de habla hispana" | src/routes/index.tsx | SHARED | ✅ Works for both |
| "Diseñamos, operamos y escalamos..." | src/routes/index.tsx | SHARED | ✅ Works for both |
| Business model description (pricing, results-linked) | src/routes/index.tsx | SHARED | ✅ Works for both |
| Service descriptions (Auditoría, Snapshot, Media, Creative) | src/components/rckt/Services.tsx | SHARED | ✅ Works for both |

### Components with Regional Content
| Component | Content | Classification | LATAM Status |
|-----------|---------|-----------------|-------------|
| src/components/rckt/Hero.tsx | Hero copy | NEEDS_LATAM_VALUE | ⏳ Pending custom design |
| src/components/rckt/Services.tsx | Service descriptions | SHARED | ✅ Reusable |
| src/components/rckt/Footer.tsx | Footer links, contact | SPAIN_ONLY | ⏳ Update needed |
| src/components/rckt/Nav.tsx | Navigation | SHARED | ✅ Reusable |
| src/components/rckt/Pillars.tsx | Pillar descriptions | SHARED | ✅ Reusable |

### Legal Documents
| Document | Path | Reference | Status |
|----------|------|-----------|--------|
| Privacy Policy | src/routes/privacidad.tsx | Spanish specific | ⏳ LATAM version needed |
| Terms of Service | src/routes/aviso-legal.tsx | Spanish specific | ⏳ LATAM version needed |
| Cookies Policy | src/routes/cookies.tsx | Spanish specific | ⏳ LATAM version needed |

## Configuration Files

| File | Key | Current Value | LATAM Status |
|------|-----|----------------|-------------|
| src/config/market.ts | domain | rckt.latam | ✅ Configured |
| src/config/market.ts | email | hola@rckt.latam | ✅ Configured (TODO in code) |
| src/config/market.ts | phone | +1-XXX-XXX-XXXX | ⏳ Update with LATAM number |
| src/config/market.ts | currency | USD | ✅ Configured |
| src/config/market.ts | timezone | America/Bogota | ✅ Configured (TODO review) |
| src/config/seo.ts | siteUrl | https://rckt.latam | ✅ Configured (TODO in code) |
| src/config/contact.ts | support email | soporte@rckt.latam | ✅ Configured (TODO in code) |
| src/config/contact.ts | businessHours | 8-6 America/Bogota | ✅ Configured |

## Code References (Not Content)

### Safe for Both Regions (SHARED)
- ✅ Supabase integration (database-agnostic)
- ✅ FastAPI LLM service (generic AI service)
- ✅ TanStack router structure
- ✅ UI component library (shadcn/ui)
- ✅ Error handling & observability
- ✅ Authentication middleware
- ✅ API route patterns
- ✅ Configuration injection pattern

### Region-Agnostic Code
- ✅ services/ai/ (all backend code)
- ✅ src/lib/utils.ts
- ✅ src/lib/error-capture.ts
- ✅ src/integrations/supabase/
- ✅ src/components/ui/ (design system)

## Regionalization Strategy

### Phase 1: Foundation ✅ (Complete)
- [x] Copy technical architecture from Spain
- [x] Create configuration layer (src/config/)
- [x] Update documentation
- [x] Placeholder LATAM values in configs

### Phase 2: Content (Pending)
- [ ] Customize hero section for LATAM
- [ ] Update footer with LATAM contact info
- [ ] Create LATAM-specific legal documents
- [ ] Add LATAM business addresses (if applicable)
- [ ] Localize any region-specific copy

### Phase 3: Features (Pending)
- [ ] Enable/disable advisor chat per region
- [ ] Configure AI agent knowledge base (shared vs. LATAM)
- [ ] Set up LATAM-specific metrics
- [ ] Configure admin panel for LATAM ops

### Phase 4: Business Logic (Pending)
- [ ] Implement LATAM payment methods
- [ ] Add region-specific pricing rules
- [ ] Configure LATAM compliance checks
- [ ] Set up LATAM support channels

## Environment Variables

All production environment variables should be LATAM-specific:

```env
# These will be set during deployment
VITE_SUPABASE_URL=              # LATAM Supabase project
SUPABASE_URL=                   # LATAM Supabase project
ANTHROPIC_API_KEY=              # Can be shared or region-specific
AI_SERVICE_URL=                 # Points to LATAM AI service instance
```

## Notes for Migration

1. **Never copy .env files** - Use .env.example template
2. **Image assets** - Reuse from Spain if generic, create LATAM versions for branded content
3. **Fonts & Design** - Share the same design system (Tailwind 4)
4. **Legal compliance** - LATAM may have different requirements than Spain; update docs accordingly
5. **AI knowledge base** - Can share base knowledge, add LATAM-specific context

## To-Do Before Public Launch

- [ ] Update all TODO items in src/config/*.ts
- [ ] Obtain LATAM domain and email addresses
- [ ] Create LATAM legal documents (privacidad, aviso-legal, cookies)
- [ ] Configure production Supabase project
- [ ] Obtain LATAM phone number for support
- [ ] Set up LATAM support email addresses
- [ ] Update footer links and contact info
- [ ] Test all regional configurations
- [ ] Set up CI/CD for LATAM deployment
- [ ] Create LATAM-specific email templates (if applicable)

---

**Last Updated:** September 16, 2026
**Status:** Foundation complete, content customization pending
