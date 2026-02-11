# Product Requirements Brief: Diamonds MP Community Platform

**Document Version:** 1.0  
**Date:** February 10, 2026  
**Author:** Don Shults  
**Prepared For:** Architect (Miles)  
**Status:** Draft for Review

---

## 1. Executive Summary

Build and deploy a private membership community site at `https://diamondsmp.iamdonshults.com` where Diamond Money Press traders can access educational content about using AI tools (specifically Claude) to manage their trading workflow, discuss experiences, and share knowledge. The platform is independently operated by Don Shults — it is **not affiliated with, authorized by, or endorsed by Traders Edge Network or Alex Rodriguez**.

The MVP delivers:
- Invite-code gated user registration with email/password authentication
- A "Trading with Claude" workshop page containing a PDF walkthrough document and a video overview
- A community discussion forum with post/reply functionality (Telegram integration desired)
- A user dashboard with content access organized by tier (free MVP, paid future)
- Deployment to Railway hosting platform

---

## 2. Background & Motivation

Don has been a Diamond Money Press trader since December 2025 and has spent 2+ years working with AI tools. Over that period, he built a comprehensive Claude Project setup — including a Neon database for position tracking, Context Vault for persistent memory, a Trade Ticket System for execution documentation, and a collaboratively developed Strategy Guide — that significantly improves the daily trading workflow.

Fellow Diamonds members have expressed interest in how Don uses these tools. Rather than sharing this content directly through Traders Edge channels (to avoid any implication of official endorsement), Don wants an independent platform where he can share his experience as a peer, collect feedback, and eventually offer additional tooling or paid content.

The initial content package includes:
- A 299-line walkthrough document ("How I Use Claude Desktop Projects to Manage My Options Trading") documenting a real February 10, 2026 trading session
- A 22-slide LCARS/Star Trek-themed PowerPoint presentation covering the full workflow
- A narrated video version of that presentation (produced using ElevenLabs voice synthesis)
- A copy of the MP Diamonds Master Strategy Guide (v5.2) as a reference document

---

## 3. Product Vision

### 3.1 What This Is

A peer-sharing community where Diamond Money Press members can learn about using AI tools (Claude, databases, automation) to manage their trading operations. Don is sharing his personal experience as a brand-new Diamonds trader who happens to have 2+ years of AI tooling expertise. The content represents his interpretation and implementation — not an official curriculum.

### 3.2 What This Is NOT

This is not:
- An official Traders Edge Network product or service
- Content authorized or approved by Alex Rodriguez
- Financial advice or trade recommendations
- A replacement for Diamonds membership or Alex's teaching
- A guaranteed-accurate representation of the Diamonds strategy (Don may have captured information that doesn't perfectly align with Alex's intent)

### 3.3 Positioning Statement (Must Appear on Site)

> **Important Disclaimer:** This platform is independently operated by Don Shults. It is not authorized, endorsed, or affiliated with Traders Edge Network or Alex Rodriguez. The content shared here reflects one trader's personal experience applying AI tools to the Diamond Money Press strategy. As a brand-new Diamonds trader, I may have captured information that differs from what Alex teaches — take everything here with a grain of salt and always defer to Alex's guidance. This is a space for sharing experiences, not providing financial advice.
>
> I've been working with AI tools like Claude for over 2 years. By applying that knowledge to my Diamonds trading journey, I've built processes and tools that help me understand and implement the strategy as Alex defines it. The information I've captured is the same as any paid Diamonds member would have access to and should be evaluated accordingly.
>
> Our year-long Diamonds collaboration is designed to deepen everyone's understanding over time. I'm sharing what I've learned so far — and I fully expect this content to evolve as we all gain more knowledge from Alex.

---

## 4. Target Users

### 4.1 Primary Audience

Active Diamond Money Press members who:
- Are interested in using AI tools to manage their trading workflow
- Want to see a concrete example of a Claude Project setup for options trading
- Are looking for a peer community to discuss AI-assisted trading techniques

### 4.2 User Personas

**The Curious Diamonds Member** — Has heard Don mention AI tools in the Diamonds Insider Chat, wants to understand the setup before investing time in building their own.

**The Tech-Savvy Trader** — Already uses some automation, wants to see how Claude Projects, databases, and memory systems can be applied to the Diamonds strategy specifically.

**The Overwhelmed Newcomer** — Struggling to keep up with Alex's daily updates, 300+ chat messages, and multi-component position management. Looking for systems to reduce cognitive load.

---

## 5. Functional Requirements

### 5.1 Authentication & User Management

| Requirement | Details |
|-------------|---------|
| Registration | Email + password + valid invite code |
| Login | Email/password with session management |
| Invite Codes | Admin-generated, single-use or multi-use, with optional expiration |
| User Tiers | `free` (MVP), `paid` (future), `admin` |
| Password Reset | Standard email-based flow |
| Email Verification | Required before account activation |
| Account Settings | Profile page for name, email, password change |

**Invite Code System:**
- Admin dashboard to generate, view, and revoke codes
- Each code tracks: creator, creation date, usage count, max uses, expiration
- Registration form includes invite code field (required)
- Invalid/expired codes show clear error message

### 5.2 Dashboard

After login, users land on a dashboard that serves as the navigation hub.

**MVP Dashboard Elements:**
- Welcome message with user's name
- Content card: "Trading with Claude" — links to the workshop page
- Community card: "Discussion Forum" — links to the forum
- Profile/Settings link
- Disclaimer banner (persistent, non-dismissable on first visit)

**Future Dashboard Elements (design for extensibility):**
- Additional content cards for future workshops/courses
- Subscription status indicator
- Notification badges for new forum posts

### 5.3 "Trading with Claude" Workshop Page

This is the first (and initially only) content area. It should feel like a workshop or resource page, not a traditional course with sequential lessons.

**Page Content:**

1. **Header & Introduction** — Brief description of what this content covers, who Don is, and the disclaimer (see Section 3.3)

2. **Video Section** — Embedded video player showing the narrated presentation overview (25-30 minutes). The video walks through the complete Claude Project setup, the daily trading workflow, real trade execution examples, error handling, and lessons learned.

3. **Walkthrough Document** — Downloadable PDF of "How I Use Claude Desktop Projects to Manage My Options Trading" (v2). This is the comprehensive written version covering the same material as the video with additional detail.

4. **Strategy Guide Reference** — Downloadable PDF of the MP Diamonds Master Strategy Guide (v5.2). Included as a reference so users can see the living document that Claude and Don maintain collaboratively. Clear note that this is Don's interpretation, not an official Traders Edge document.

5. **Additional Resources Section** — Placeholder for future content additions (tool setup guides, database schemas, automation workflows)

**Content Display Rules:**
- Video should be streamable, not requiring download
- PDFs should be viewable in-browser with download option
- All content is accessible to any authenticated user (free tier)

### 5.4 Community Discussion Forum

A forum/chat system that allows members to post topics, reply to posts, and have threaded discussions.

**Core Requirements:**

| Feature | Details |
|---------|---------|
| Post Creation | Any authenticated user can create a new post with title + body |
| Replies | Threaded replies to posts (at least 1 level deep) |
| Post Display | Reverse chronological feed of recent posts |
| Author Attribution | Display name and timestamp on all posts/replies |
| Rich Text | Basic formatting (bold, italic, code blocks, links) |
| Notifications | In-app indicator for new replies to your posts |

**Telegram Integration (Desired):**
- Bidirectional sync between forum posts and a Telegram group
- New forum posts appear in Telegram
- Telegram messages appear in the forum
- Author attribution maintained across platforms
- If full bidirectional sync is complex for MVP, start with one-way: forum posts push to Telegram

**Design Philosophy:**
- The forum should feel lightweight and conversational, not like a heavy traditional forum (think Discord channel or Slack, not phpBB)
- Posts from all members visible to all members
- No private messaging in MVP (use Telegram for DMs)

### 5.5 Admin Panel

| Feature | Details |
|---------|---------|
| User Management | View all users, change tiers, deactivate accounts |
| Invite Code Management | Generate codes, set limits, view usage |
| Content Management | Upload/replace PDFs, update video URL |
| Forum Moderation | Edit/delete posts, pin important threads |
| Analytics | Basic metrics: registered users, active users, content views |

---

## 6. Non-Functional Requirements

### 6.1 Hosting & Deployment

| Requirement | Details |
|-------------|---------|
| Platform | Railway |
| Domain | `diamondsmp.iamdonshults.com` (subdomain of existing domain) |
| SSL | Required (Railway provides via Let's Encrypt) |
| Database | PostgreSQL (Railway managed or Neon) |
| File Storage | Railway volume or S3-compatible for video/PDFs |
| CI/CD | GitHub → Railway auto-deploy on push to `main` |

### 6.2 Performance

- Page load under 3 seconds
- Video streaming without buffering on standard broadband
- Support 50 concurrent users (initial scale)

### 6.3 Security

- Passwords hashed with bcrypt (or argon2)
- Session management with secure, httpOnly cookies
- CSRF protection on all forms
- Rate limiting on login and registration endpoints
- Input sanitization on all user-generated content
- SQL injection prevention (parameterized queries / ORM)

### 6.4 Mobile Responsiveness

- All pages must be mobile-friendly
- Forum must be usable on phone screens
- Video player must work on mobile

---

## 7. Technical Architecture (Recommended)

This section provides recommendations — the architect should finalize based on their assessment.

### 7.1 Stack Suggestion

| Layer | Recommendation | Rationale |
|-------|----------------|-----------|
| Frontend | Next.js (App Router) | SSR, good DX, Railway-friendly |
| Styling | Tailwind CSS | Rapid development, responsive |
| Backend | Next.js API Routes | Single deployment unit |
| Database | PostgreSQL (Railway) | Relational data, familiar |
| ORM | Prisma | Type safety, migrations |
| Auth | Stack Auth (Neon Auth) or NextAuth.js | Built-in email/password |
| Video | Cloudflare Stream or YouTube (unlisted) | Cost-effective streaming |
| File Storage | Railway volume or Cloudflare R2 | PDF hosting |
| Telegram | Telegram Bot API | Forum↔Telegram bridge |

### 7.2 Database Schema (Conceptual)

```
users
  id, email, password_hash, display_name, tier, 
  email_verified, invite_code_used, created_at, updated_at

invite_codes
  id, code, created_by (FK users), max_uses, use_count,
  expires_at, is_active, created_at

forum_posts
  id, author_id (FK users), title, body, 
  is_pinned, telegram_message_id, created_at, updated_at

forum_replies
  id, post_id (FK forum_posts), author_id (FK users), body,
  parent_reply_id (FK forum_replies, nullable), 
  telegram_message_id, created_at, updated_at

content_items
  id, slug, title, description, type (video/pdf/page),
  url_or_path, tier_required, sort_order, created_at

content_views
  id, user_id (FK users), content_id (FK content_items),
  viewed_at

sessions
  id, user_id (FK users), token, expires_at, created_at
```

### 7.3 URL Structure

```
/                           → Landing/marketing page (public)
/login                      → Login form
/register                   → Registration with invite code
/dashboard                  → Authenticated user hub
/workshop/trading-with-claude → Workshop content page
/community                  → Forum post list
/community/new              → Create new post
/community/:postId          → Post detail with replies
/settings                   → User profile/settings
/admin                      → Admin panel (admin tier only)
/admin/users                → User management
/admin/invites              → Invite code management
/admin/content              → Content management
```

---

## 8. Content Assets & Key Documents

The following files need to be prepared and included in the site build. All are produced or available today.

### 8.1 Primary Content (Trading with Claude Workshop)

| Document | Description | Format | Status |
|----------|-------------|--------|--------|
| How I Use Claude Desktop Projects for Trading (v2) | Complete walkthrough of a real trading session — the core educational document | PDF (convert from .md) | ✅ Complete — source is `How_I_Use_Claude_Projects_for_Trading_v2.md` |
| Trading with Claude Presentation | 22-slide LCARS-themed PowerPoint covering the full workflow | Video (narrated) | ✅ Complete — produced via ElevenLabs narration of slide scripts |
| MP Diamonds Master Strategy Guide (v5.2) | The living strategy document Don & Claude maintain collaboratively | PDF (convert from .md) | ✅ Complete — source is `MP_Diamonds_Master_Strategy_Guide_v5_2.md` |

### 8.2 Site Content (Created During Build)

| Document | Description | Format |
|----------|-------------|--------|
| Landing Page Copy | Public-facing description of the community and what members get access to | HTML |
| About / Disclaimer Page | Expanded disclaimer, Don's background, relationship to Traders Edge | HTML |
| Getting Started Guide | Brief onboarding guide for new members: what to read first, how to use the forum | Markdown/HTML |
| FAQ | Common questions about the platform, Claude setup, and the content | Markdown/HTML |

### 8.3 Reference Documents (Potential Future Additions)

| Document | Description | Priority |
|----------|-------------|----------|
| Claude Project Setup Guide | Step-by-step: creating a Claude Project for trading, uploading documents, writing system instructions | High — natural Phase 2 content |
| Context Vault Setup Guide | How to set up and use persistent memory with MCP | Medium |
| Neon Database Schema & Setup | Position tracking database structure and configuration | Medium |
| Trade Ticket System Documentation | The ticket workflow, categories, and database integration | Medium |
| TradingView Setup Guide | Alex's chart configuration (Keltner Channels, MAs, etc.) | Low — already shared in Diamonds chat |
| n8n Automation Workflows | Automated Greeks tracking and position valuation | Future |
| Podcast Series: "The Theta Income Blueprint" | 24-episode educational podcast series (planned) | Future |
| Monthly Performance Reports | Anonymized monthly P&L and lessons learned | Future |

---

## 9. Monetization Architecture (Future-Proofed)

The MVP is entirely free. The system should support future paid tiers without re-architecture.

### 9.1 Tier Model

| Tier | Price | Access |
|------|-------|--------|
| Free | $0 | Trading with Claude workshop, community forum, basic resources |
| Premium (future) | TBD | Advanced guides, tool setup assistance, automation templates, priority support |
| Pro Tools (future) | TBD | Access to hosted versions of trading tools (Success Tracker, Delta Tracker, etc.) |

### 9.2 Payment Integration (Not MVP)

When paid tiers are introduced:
- Stripe integration for subscription management
- Webhook-based tier updates
- Grace period handling for failed payments
- Upgrade/downgrade flows in user settings

Design the `users.tier` and `content_items.tier_required` fields now so paid gating requires only:
1. Adding Stripe integration
2. Updating tier on payment webhook
3. Content already checks tier — no UI changes needed

---

## 10. Phased Delivery Plan

### Phase 1: MVP (Target: 2-3 weeks)

- [ ] Railway project setup with PostgreSQL
- [ ] Authentication system (register with invite code, login, logout, password reset)
- [ ] Dashboard with content card navigation
- [ ] "Trading with Claude" workshop page with video embed and PDF downloads
- [ ] Community forum (create posts, reply, view feed)
- [ ] Admin panel (user management, invite codes, content management)
- [ ] Disclaimer implementation (landing page, workshop page, footer)
- [ ] Mobile responsive design
- [ ] Domain configuration (`diamondsmp.iamdonshults.com`)
- [ ] Deploy to Railway

### Phase 2: Community Enhancement (Target: 2 weeks after MVP)

- [ ] Telegram bot integration (forum ↔ Telegram sync)
- [ ] Email notifications for forum replies
- [ ] Post search and filtering
- [ ] User profile pages (public, showing post history)
- [ ] Rich text editor for posts (markdown support)
- [ ] Pin/feature important posts

### Phase 3: Content Expansion (Target: ongoing)

- [ ] Claude Project Setup Guide
- [ ] Additional workshop/resource pages
- [ ] Content tagging and categorization
- [ ] Getting Started onboarding flow

### Phase 4: Monetization (Target: when demand justifies)

- [ ] Stripe integration
- [ ] Paid tier content gating
- [ ] Subscription management UI
- [ ] Pro Tools integration (Success Tracker, Delta Tracker)

---

## 11. Design Direction

### 11.1 Visual Identity

The site should feel modern, clean, and trustworthy. Avoid anything that looks like a "get rich quick" trading site. The tone is educational and peer-to-peer.

**Suggested Direction:**
- Clean, minimal layout with good whitespace
- Dark mode default (traders spend hours looking at screens)
- Accent color: Diamond blue or deep gold (nod to "Diamonds" branding without copying Traders Edge)
- Typography: Clean sans-serif (Inter, system fonts)
- The LCARS/Star Trek theme from the presentation is fun personality — consider subtle nods (border treatments, color palette) without going full sci-fi on the site itself

### 11.2 Key UX Principles

- Workshop page should feel like a resource library, not a sequential course
- Forum should feel lightweight and fast (think Discourse lite, not phpBB)
- Disclaimer should be visible but not intrusive after initial acknowledgment
- Mobile-first for forum (traders check on phones between trades)

---

## 12. Success Metrics

| Metric | Target (3 months post-launch) |
|--------|-------------------------------|
| Registered Users | 20-50 Diamond members |
| Weekly Active Forum Users | 10+ |
| Video Views | 80%+ of registered users |
| PDF Downloads | 80%+ of registered users |
| Forum Posts | 5+ per week |
| User Retention | 60%+ monthly return rate |

---

## 13. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Traders Edge perceives this as unauthorized use of their content | High | Clear disclaimers, no reproduction of Alex's proprietary content, Don's personal interpretation only |
| Low adoption among Diamonds members | Medium | Seed with targeted invitations to interested members from Insider Chat |
| Telegram integration complexity delays MVP | Low | Defer to Phase 2, launch forum without Telegram initially |
| Video hosting costs | Low | Use YouTube (unlisted) or Cloudflare Stream free tier |
| Content becomes outdated as strategy evolves | Medium | Position content as "point in time" experience, commit to updates |

---

## 14. Open Questions

1. **Video Hosting:** YouTube (unlisted) for zero cost, or self-hosted for more control? Cloudflare Stream is a middle ground.

2. **Forum Technology:** Build custom, or integrate an existing lightweight forum (e.g., Discourse embed, Forem)? Custom is simpler for Railway but more development time.

3. **Telegram Integration Scope:** Full bidirectional sync, or simpler one-way (forum → Telegram notifications)? Bidirectional is significantly more complex.

4. **Domain Configuration:** Is `diamondsmp.iamdonshults.com` confirmed, or should we consider alternatives like `community.iamdonshults.com` or `trading.iamdonshults.com`?

5. **Content Licensing:** Should users agree to terms of use regarding redistribution of the Strategy Guide and walkthrough document?

6. **Naming:** The "Trading with Claude" workshop — is this the final name, or should we consider alternatives? Options: "Trading with AI," "The AI Trading Workshop," "Claude + Diamonds Workshop"

---

## 15. Glossary

| Term | Definition |
|------|------------|
| Diamond Money Press (DMP) | Options trading strategy created by Alex Rodriguez, sold through Traders Edge Network |
| Diamonds Insider Chat | Private member forum within Traders Edge where Alex provides daily guidance |
| Claude Project | A persistent workspace in Anthropic's Claude AI with custom instructions and connected tools |
| Context Vault | External persistent memory system connected to Claude via MCP protocol |
| Neon Database | Serverless PostgreSQL database used for position tracking |
| Trade Ticket System | Documentation protocol for pre-documenting trade intent before execution |
| XSP | Mini S&P 500 options (1/10th the size of SPX) |
| SPX | Full-size S&P 500 options |
| Railway | Cloud hosting platform for deploying web applications |
| MCP | Model Context Protocol — standard for connecting external tools to Claude |

---

*Document created: February 10, 2026*  
*Next step: Architect review and technical specification*
