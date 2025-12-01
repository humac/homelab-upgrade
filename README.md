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
- 📊 **Comprehensive Documentation** - 9 detailed phases from preparation to monitoring
- 🎨 **Modern UI** - Clean, professional interface with smooth animations

## Quick Start

Simply open `index.html` in your browser to get started!

For local development server:
```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
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
└── README.md               # This file
```

## Phases Overview

1. **Phase 0: Preparation** - Download TrueNAS, prepare tools
2. **Phase 1: Hardware Install** - Install RAM, NVMe, drives
3. **Phase 2: TrueNAS Setup** - OS installation and config
4. **Phase 3: ZFS Storage** - Create pools and datasets
5. **Phase 4: 10G Network** - LACP bonding for 20 Gbps
6. **Phase 5: VLAN Config** - Network segmentation
7. **Phase 6: Data Migration** - Migrate 24TB from QNAP
8. **Phase 7: Performance Testing** - Validate performance
9. **Phase 8: Monitoring** - Automated tasks and alerts

## Technology

- Pure HTML5/CSS3/JavaScript (no build tools required)
- ES6 Modules for clean architecture
- localStorage for state persistence
- Responsive CSS Grid & Flexbox layout

---

**Happy homelabbing!** 🏠💻🚀
