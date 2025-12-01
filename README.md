# 🚀 Home Server 10G Upgrade Guide

An interactive web application for planning and executing a professional 10G homelab upgrade.

## Overview

This guide walks you through upgrading from a basic homelab setup to a professional 10G infrastructure featuring:

- **TerraMaster F6-424 Max NAS** with TrueNAS SCALE
- **64GB DDR5 RAM** with auto-tuned ZFS ARC caching (30-40GB)
- **36TB ZFS RAIDZ1 Storage** with enterprise-grade data protection
- **20 Gbps LACP Bonding** between NAS and Proxmox server
- **10G Network Infrastructure** with UniFi USW-Aggregation
- **VLAN Segmentation** for security and organization

**Total Net Cost:** $2,459 CAD (rivals $8,000+ commercial solutions)

## Features

- ✅ **Interactive Progress Tracking** - Mark tasks as completed and track overall progress
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 💾 **State Persistence** - Your progress is automatically saved
- ⌨️ **Keyboard Navigation** - Use arrow keys to navigate between phases
- 📊 **Comprehensive Documentation** - 12 detailed phases from preparation to decommissioning
- 🎨 **Modern UI** - Clean, professional interface with smooth animations

## Quick Start

### Option 1: Direct Browser Access
Simply open `index.html` in your browser to get started!

### Option 2: Local Development Server
```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Option 3: Docker (Recommended for Production)

#### Using Docker Compose (Easiest)
```bash
# Build and start the container
docker-compose up -d

# Visit http://localhost:8080
```

#### Using Docker directly
```bash
# Build the image
docker build -t homelab-upgrade-guide .

# Run the container
docker run -d -p 8080:80 --name homelab-guide homelab-upgrade-guide

# Visit http://localhost:8080
```

#### Docker Commands
```bash
# View logs
docker-compose logs -f

# Stop the container
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

## Project Structure

```
homelab-upgrade/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styles and responsive design
├── js/
│   ├── app.js              # Main application entry point
│   ├── navigation.js       # Phase navigation and rendering
│   └── utils.js            # Utility functions
├── data/
│   └── phases.json         # All phase content and data
├── Dockerfile              # Docker container definition
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf              # Nginx web server config
├── .dockerignore           # Docker build exclusions
└── README.md               # This file
```

## Phases Overview

1. **Phase 0: Preparation** - Download TrueNAS, prepare tools
2. **Phase 1: Hardware Install** - Install RAM, NVMe, drives
3. **Phase 2: TrueNAS Setup** - OS installation and config
4. **Phase 2.5: Initial Network Connectivity** - Test 10G before LACP
5. **Phase 3: ZFS Storage** - Create pools and datasets
6. **Phase 4: 10G Network** - LACP bonding for 20 Gbps
7. **Phase 5: VLAN Config** - Network segmentation
8. **Phase 6: Data Migration** - Migrate 24TB from QNAP
9. **Phase 6.5: Post-Migration Validation** - Verify data integrity
10. **Phase 7: Performance Testing** - Validate performance
11. **Phase 8: Monitoring** - Automated tasks and alerts
12. **Phase 9: QNAP Decommissioning** - Safely retire old NAS

## Technology

- Pure HTML5/CSS3/JavaScript (no build tools required)
- ES6 Modules for clean architecture
- localStorage for state persistence
- Responsive CSS Grid & Flexbox layout
- Docker containerization with Nginx Alpine
- Production-ready with security headers and gzip compression

---

**Happy homelabbing!** 🏠💻🚀
