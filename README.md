# TradingwithClaude

> **AI-powered trading education platform for the Diamond Money Press community**

A private, invite-only community platform where Diamond Money Press traders learn AI-assisted trading workflows using Claude Projects. Built with Next.js 14, authenticated with invite codes, and designed for collaborative trading education.

## 🎯 Project Overview

TradingwithClaude provides a secure, exclusive environment for Diamond Money Press community members to:
- Learn AI-assisted trading strategies
- Access Claude Projects tutorials 
- Share trading insights and education
- Build collaborative trading workflows

**Live Platform:** [diamondsmp.iamdonshults.com](https://diamondsmp.iamdonshults.com)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Git
- Access to Neon database (provided)

### Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/donshults/TradingwithClaude.git
cd TradingwithClaude

# 2. Set up Context Vault connection (IMPORTANT)
cp .mcp.json.example .mcp.json
# Edit .mcp.json with your environment details

# 3. Set up the application
cd app
cp .env.local.example .env.local
# Edit .env.local with database credentials (see setup guide)
npm install
npm run dev
```

**🔑 Test Login:** `test@example.com` / `test123`

## 📁 Project Structure

```
TradingwithClaude/
├── README.md                  # This file - project overview
├── PROJECT_STATUS.md          # Detailed project status and technical info
├── GIT_WORKFLOW_GUIDE.md      # Development workflow for contributors
├── .mcp.json.example          # Context Vault MCP configuration template
├── Documents/                 # Foundation documents and strategy guides
│   ├── Diamonds_MP_Community_PRB.md
│   └── MP_Diamonds_Master_Strategy_Guide_v5_2.md
└── app/                       # Next.js 14 application
    ├── app/                   # Pages and API routes
    ├── components/            # React components
    ├── lib/                   # Utilities and database connections
    ├── prisma/                # Database schema and migrations
    └── package.json           # Application dependencies
```

## 🛠️ Technology Stack

- **Framework:** Next.js 14 with TypeScript
- **Authentication:** NextAuth.js v5 with invite-code system
- **Database:** Neon PostgreSQL with Prisma ORM
- **Styling:** Tailwind CSS
- **Deployment:** Railway with custom domain
- **AI Integration:** Context Vault MCP for persistent memory

## 🔐 Access & Authentication

**Invite Codes (Active):**
- `DIAMONDS-LAUNCH-2026`
- `TRADING-WITH-CLAUDE-MVP` 
- `DON-BETA-ACCESS`

**Features:**
- Secure invite-only registration
- Database-backed user management
- Session-based authentication
- Protected workshop content areas

## 🚀 Deployment

### Production
- **Platform:** Railway
- **URL:** https://diamondsmp.iamdonshults.com
- **Auto-deploy:** `main` branch
- **Monitoring:** 24/7 AI management team

### Railway Project Details
- **Project:** `empowering-mindfulness`
- **Service:** `diamondsmp-community`
- **Database:** Neon PostgreSQL (external)

## 👥 Development Workflow

### Branch Strategy
- **`main`** - Production (auto-deploys to Railway)
- **`develop`** - Integration branch
- **`feature/*`** - Individual feature work

### Contributing
1. Create feature branch from `develop`
2. Make changes and test locally
3. Create Pull Request to `develop`
4. After review, merge to `main` for deployment

**📋 See [GIT_WORKFLOW_GUIDE.md](./GIT_WORKFLOW_GUIDE.md) for detailed workflow instructions**

## 🤖 AI Management

This project is monitored by a **Railway Management Team** (5 AI agents):
- **Railway Commander** (Claude Opus) - Strategic coordination
- **Deploy Bot** (Claude Sonnet) - Deployment management
- **Watch Dog** (Claude Haiku) - 24/7 monitoring
- **Budget Guardian** (Claude Haiku) - Cost optimization
- **Fix Master** (Claude Sonnet) - Issue resolution

## 📊 Project Status

- ✅ **Authentication System** - Fully functional
- ✅ **Database Integration** - Neon PostgreSQL connected
- ✅ **Railway Deployment** - Production environment active
- ✅ **Custom Domain** - diamondsmp.iamdonshults.com configured
- ⏳ **Content Upload** - Cloudflare R2 integration (next phase)
- ⏳ **Trading Strategies** - Workshop content integration

**📋 See [PROJECT_STATUS.md](./PROJECT_STATUS.md) for detailed technical status**

## 🎓 Trading Education Focus

### Core Topics
- **Money Press Diamonds** strategy implementation
- **AI-assisted trading** with Claude Projects
- **Options trading** education and automation
- **Risk management** and position sizing
- **Community collaboration** and knowledge sharing

### Workshop Areas
- Claude Projects for trading analysis
- Automated trade journaling
- Strategy backtesting workflows
- Risk assessment tools

## 🔧 Configuration Files

### Essential Setup Files
- **`.mcp.json`** - Context Vault MCP server configuration (copy from example)
- **`.env.local`** - Environment variables and database connection
- **`railway.toml`** - Railway deployment configuration
- **`prisma/schema.prisma`** - Database schema definition

### Important Notes
- Never commit `.mcp.json` or `.env.local` (contains API keys)
- Always configure Context Vault workspace: `trading_with_claude`
- Test authentication with provided credentials before development

## 📞 Support & Contact

- **Project Owner:** Don Shults
- **Documentation:** Complete guides in repository
- **Context Vault:** `trading_with_claude` workspace
- **Monitoring:** Automatic via Railway AI team

## 📄 License

Private project for Diamond Money Press community members only.

---

**Built with ❤️ for the Diamond Money Press trading community**

*Last updated: February 2026*