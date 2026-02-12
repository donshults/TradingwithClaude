# TradingWithClaude Git Repository Management Guide

## 🎯 Repository Overview
- **Repository:** `github.com/donshults/TradingwithClaude`
- **Production Branch:** `main` (auto-deploys to Railway)
- **Development Branch:** `develop` (integration branch)
- **Feature Branches:** `feature/[description]` (individual work)

## 📁 Project Structure
```
TradingwithClaude/
├── PROJECT_STATUS.md          # Complete project documentation
├── Documents/                 # Foundation documents and strategy guides
│   ├── Diamonds_MP_Community_PRB.md
│   ├── MP_Diamonds_Master_Strategy_Guide_v5_2.md
│   └── DS9_Trading_Presentation.pptx
├── GIT_WORKFLOW_GUIDE.md      # This file
├── .mcp.json                  # Context Vault MCP configuration (CRITICAL)
└── app/                       # Next.js 14 application
    ├── app/                   # Pages and API routes
    ├── components/            # UI components
    ├── lib/                   # Database and auth utilities
    ├── prisma/                # Database schema and migrations
    ├── package.json           # Dependencies
    ├── railway.toml           # Railway deployment config
    └── .env.local            # Environment variables (not tracked)
```

## ⚠️ Critical .gitignore Rules

**NEVER commit these files (causes GitHub errors):**
- `node_modules/` → Install with `npm install`
- `.mcp.json` → Contains API keys, configure locally (template provided)
- `.next/` → Build output, regenerated automatically
- `.env.local` → Contains sensitive database credentials
- `*.log` → Log files
- Large media files (`*.mp4`, `*.mov`, `*.avi`)

## 🔄 Branch Workflow

### Starting New Work
```bash
git checkout develop
git pull origin develop
git checkout -b feature/descriptive-name
```

### During Development
```bash
# Make changes to source code
git add .  # Only adds tracked files due to .gitignore
git commit -m "Clear description of changes"
git push origin feature/branch-name
```

### Finishing Work
1. Create **Pull Request**: `feature/branch` → `develop`
2. After review and merge:
```bash
git checkout develop
git pull origin develop
git branch -d feature/completed-branch
```

## 🛠️ Local Development Setup

### Initial Setup
```bash
git clone https://github.com/donshults/TradingwithClaude.git
cd TradingwithClaude

# CRITICAL: Set up Context Vault workspace connection
# The .mcp.json file ensures your local AI connects to the right workspace
# File should already exist in the repo, but verify it's configured for your environment

cd app
cp .env.local.example .env.local  # Copy environment template
# Edit .env.local with proper values
npm install
npm run dev  # Starts on http://localhost:3000
```

### Context Vault Integration (.mcp.json)
**Essential for Local AI Development:**
The `.mcp.json` file in the project root configures Context Vault MCP server connection:
```json
{
  "mcpServers": {
    "context-vault": {
      "env": {
        "VAULT_DEFAULT_WORKSPACE": "trading_with_claude"
      }
    }
  }
}
```

This ensures your local AI automatically connects to the `trading_with_claude` workspace for project-specific memory and knowledge.

### Daily Development
```bash
# Set up new feature
git checkout develop && git pull origin develop
git checkout -b feature/new-work

# Develop and test
cd app && npm run dev
# Make changes, test locally

# Commit and push
git add .
git commit -m "Description of changes"
git push origin feature/new-work
```

## 🔑 Authentication Testing

**Test Credentials (production database):**
- **Email:** `test@example.com`
- **Password:** `test123`

These credentials exist in the production Neon database and should work for local testing.

## 🚀 Deployment Information

### Production Deployment
- **Branch:** `main`
- **URL:** https://diamondsmp.iamdonshults.com
- **Railway Project:** `empowering-mindfulness`
- **Service:** `diamondsmp-community`
- **Database:** Neon PostgreSQL (production)

### Monitoring
**Railway Management Team** (5 AI agents) monitors all deployments:
- **Railway Commander** (Opus) - Strategic coordination
- **Deploy Bot** (Sonnet) - Deployment management
- **Watch Dog** (Haiku) - 24/7 monitoring
- **Budget Guardian** (Haiku) - Cost analysis
- **Fix Master** (Sonnet) - Issue resolution

## 📋 Common Commands Reference

```bash
# Clone and setup
git clone <repo> && cd TradingwithClaude/app && npm install

# Start new feature
git checkout develop && git pull origin develop
git checkout -b feature/new-feature

# Daily workflow
npm run dev  # Start development server
git add . && git commit -m "Changes" && git push

# Clean up after merge
git checkout develop && git pull origin develop
git branch -d feature/completed

# Emergency: kill dev server processes
pkill -f "next dev"
rm -rf app/.next/dev/  # Remove lock files
```

## 🚨 Important Guidelines

### DO:
- ✅ Always work in feature branches
- ✅ Test authentication with `test@example.com/test123`
- ✅ Run `npm install` after pulling updates
- ✅ Create meaningful commit messages
- ✅ Ask questions before structural changes

### DON'T:
- ❌ Force push to `main` or `develop` branches
- ❌ Commit `node_modules`, `.next`, or `.env.local`
- ❌ Make direct commits to `main` or `develop`
- ❌ Include large media files in Git
- ❌ Push without testing locally first

## 🤝 Collaboration Notes

This is a **collaborative repository** with:
- **Don Shults** (Project Owner)
- **OpenClaw Team** (AI Management)
- **Local Developer AIs** (Individual contributors)

**Always coordinate major changes and ask questions when unsure!**

## 📞 Support

- **Project Documentation:** `PROJECT_STATUS.md`
- **Context Vault:** `trading_with_claude` workspace
- **Railway Monitoring:** Automatic via AI team
- **Questions:** Ask in project discussions

---

**Last Updated:** 2026-02-12  
**Created for:** Local Developer AI understanding and collaboration