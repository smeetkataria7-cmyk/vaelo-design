# Brand Brain — Specification

The **Brand Brain** is VAELO's core differentiator and primary moat. It is a
permanent, per-client knowledge base that captures everything about a brand, and
then **feeds that context automatically into every AI action** (creative
generation, proposals, status updates, onboarding).

> Why it's the moat: the longer a client stays, the richer their Brand Brain
> becomes, and the better/faster VAELO's output gets. Leaving means losing all that
> accumulated context. *"If VAELO stops using this, the agency gets slower."*

---

## 1. What it stores (per client)

| Category | Examples |
|----------|----------|
| **Identity** | Logos (variants), color palette (hex), fonts |
| **Voice** | Tone of voice, do/don't language, sample captions |
| **Market** | Target audience, positioning, competitors |
| **Product** | Product photos, descriptions, key selling points |
| **Rules** | Brand guidelines, must-use / never-use, legal lines |
| **History** | Past campaigns, what worked, approved creatives |
| **Context** | Business facts (location, offerings, status, seasonality) |

### Example (real-world shape)
For a real-estate client "Marigold Miraaya," the Brand Brain might hold:
```
- Status: OC Received
- Location: Mulund West
- Inventory: 2 / 3 / 4 BHK
- Audience: families
- Positioning: premium
- Creative style: <approved reference set>
```
So instead of the owner typing *"Generate a Marigold Miraaya ad,"* the system
already knows all of the above and produces an on-brand result the first time.

---

## 2. How it's populated
1. **Onboarding form** (auto-sent on proposal acceptance) collects the initial set.
2. **Approved creatives** are linked back as style references (from Asset Approval 2.0).
3. **Owner edits** anytime — it's a living profile.
4. Optionally enriched over time from campaign performance + reports.

## 3. How it's used (feeds the AI layer)
- **Creative generation** → prompts auto-include brand colors, style refs, audience, rules.
- **AI proposals** → tailored to the client's positioning and history.
- **AI status updates** → context-aware summaries.
- **AI Creative Workspace** (P2) → client requests turn into on-brand drafts instantly.

```
  Brand Brain (per client)
        │  (context injected automatically)
        ▼
  ┌───────────────┬───────────────┬─────────────────┐
  ▼               ▼               ▼                 ▼
AI creatives   AI proposals   AI status        AI workspace
```

## 4. Data model
See `brand_brain` table in [Data Model](04-DATA-MODEL.md). Key points:
- One `brand_brain` row per client (1:1).
- Flexible `jsonb` for evolving fields (colors, competitors, campaigns).
- `approved_creative_refs` links to `asset_versions` for style consistency.
- Files (logos, product photos) live in private Supabase Storage; store refs only.

## 5. Access & privacy
- Client can **view/edit their own** Brand Brain in the portal (builds trust + keeps it current).
- Owner can view/edit all.
- RLS ensures isolation. Treat brand assets as confidential client data.

## 6. Acceptance criteria
- [ ] Each client has a single editable Brand Brain profile
- [ ] Onboarding form auto-populates it
- [ ] Approved creatives auto-link as references
- [ ] AI generation/proposals/status pull from it without manual copy-paste
- [ ] Client can view (and optionally edit) their own in the portal
- [ ] Fully isolated per client (RLS), files private

## 7. Future enhancements (P2+)
- Auto-extract palette/fonts from uploaded brand assets
- "Brand consistency" check on new creatives vs. stored rules
- Performance-informed suggestions ("reels outperform posts for this audience")
