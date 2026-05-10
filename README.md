<div align="center">

```
████████╗██████╗  █████╗  ██████╗██╗  ██╗███╗  ██╗ ██████╗  ██████╗
╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝████╗ ██║██╔════╝ ██╔═══██╗
   ██║   ██████╔╝███████║██║     █████╔╝ ██╔██╗██║██║  ███╗██║   ██║
   ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██║╚████║██║   ██║██║   ██║
   ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗██║ ╚███║╚██████╔╝╚██████╔╝
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚══╝ ╚═════╝  ╚═════╝
```

### 🚌 Real-Time Bus Tracking. Zero Sign-Up. Zero Fuss.

<br/>

[![Firebase](https://img.shields.io/badge/Firebase-Realtime_DB-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet.js-Interactive_Maps-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-No_Framework-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Structure-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](./LICENSE)

<br/>

### *Your bus. On your time.*

> **TrackNGo** bridges the gap between bus conductors and passengers — a live, anonymous, location-sharing system that works right in your browser. No app to download. No account to create. Just open and go.

<br/>

![TrackNGo Demo Banner](https://placehold.co/900x300/1a1a2e/00d4ff?text=🚌+Live+Bus+Tracking+in+Your+Browser&font=montserrat)

</div>

---

## 📖 Table of Contents

- [✨ What is TrackNGo?](#-what-is-trackngo)
- [🎯 Key Features](#-key-features)
- [👥 Who Is It For?](#-who-is-it-for)
- [🗺️ How It Works](#️-how-it-works)
- [🏗️ Architecture Overview](#️-architecture-overview)
- [🚀 Getting Started](#-getting-started)
- [📱 Usage Guide](#-usage-guide)
- [🔐 Privacy & Security](#-privacy--security)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ What is TrackNGo?

TrackNGo is a **lightweight, real-time bus tracking web app** that connects passengers with conductors through live GPS sharing — all without requiring a single login or personal detail.

Think of it as a **live walkie-talkie for bus locations**:
- 🟢 **Conductors** broadcast their GPS coordinates every few seconds
- 🔵 **Passengers** see those buses appear on an interactive map in real-time
- 🗑️ **Location data auto-expires** after 2 minutes of inactivity — keeping the map clean and accurate

<br/>

<div align="center">

```
CONDUCTOR                                    PASSENGER
──────────                                  ──────────
 📍 GPS                                      🗺️ Map
  │                                            │
  ▼                                            ▼
[Tap ACTIVE] ──► Firebase Realtime DB ──► [See Bus Icon]
              (Updates every few secs)    (With route lines)
```

</div>

---

## 🎯 Key Features

| Feature | Description |
|---|---|
| 🔴 **Live Bus Tracking** | Conductor locations update on the map every few seconds |
| 📍 **Passenger Locator** | Blue dot shows where the passenger currently is |
| 🗺️ **Route Visualization** | Lines drawn from each active bus to the passenger's location |
| ⏱️ **Auto-Expiry** | Location data vanishes after 2 minutes of inactivity |
| 🔒 **Anonymous by Design** | No accounts, no names, no emails — ever |
| 📱 **Works Everywhere** | Fully responsive; works on phones, tablets, and desktops |
| ⚡ **Zero Setup for Users** | Just open the website and click "Get Started" |
| 🧭 **Multi-Bus Support** | Track multiple buses on the same route simultaneously |

---

## 👥 Who Is It For?

### 🧍 Passengers
People waiting at a bus stop who want to know:
- *"Is my bus close?"*
- *"Which route should I take?"*
- *"Where exactly is bus 215A right now?"*

### 🚌 Conductors / Drivers
People on the bus who want to:
- Broadcast their bus's live position so passengers can plan accordingly
- Start and stop sharing location with a single tap

---

## 🗺️ How It Works

### For Passengers — Step by Step

```
1. Open TrackNGo website
        │
        ▼
2. Click "Get Started" → Choose "Passenger"
        │
        ▼
3. Enter a route number  (e.g., "215A")
        │
        ▼
4. Click "Track Route" → Allow location access
        │
        ▼
5. 🗺️ Map appears with:
   ● Blue dot     → Your location
   🚌 Bus icons   → Active buses on that route
   ── Blue lines  → Route from bus to you
   📢 Counter     → "X buses currently tracked"
```

### For Conductors — Step by Step

```
1. Open TrackNGo website
        │
        ▼
2. Click "Get Started" → Choose "Conductor"
        │
        ▼
3. Enter Bus Number  (e.g., "WB-04-1234")
   Enter Route      (e.g., "215A")
        │
        ▼
4. Tap the 🔴 Power Button → Allow location access
        │
        ▼
5. Button turns 🟢 GREEN → "ACTIVE"
   Your location is now being broadcast every few seconds!
        │
        ▼
6. Tap again to STOP tracking
```

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER CLIENT                       │
│                                                             │
│   ┌──────────────┐              ┌──────────────────────┐   │
│   │  CONDUCTOR   │              │      PASSENGER       │   │
│   │    VIEW      │              │        VIEW          │   │
│   │              │              │                      │   │
│   │ • Bus Number │              │ • Route Input        │   │
│   │ • Route No.  │              │ • Leaflet.js Map     │   │
│   │ • Toggle Btn │              │ • Live Bus Icons     │   │
│   └──────┬───────┘              └──────────┬───────────┘   │
│          │                                 │               │
│          │  GPS Coords (every ~5s)         │  Reads DB     │
│          ▼                                 ▼               │
│   ┌─────────────────────────────────────────────────┐      │
│   │           Firebase Realtime Database            │      │
│   │                                                 │      │
│   │  buses/                                         │      │
│   │   └── 215A/                                     │      │
│   │         └── WB-04-1234/                         │      │
│   │               ├── lat: 22.5726                  │      │
│   │               ├── lng: 88.3639                  │      │
│   │               └── timestamp: 1715432100         │      │
│   └─────────────────────────────────────────────────┘      │
│                        │                                    │
│              Auto-deletes after 2 minutes                   │
└─────────────────────────────────────────────────────────────┘
```

**Data Flow:**
1. **Conductor** → Geolocation API captures GPS → pushes to Firebase every few seconds
2. **Firebase** → Stores location under `buses/{routeNumber}/{busNumber}`
3. **Passenger** → Listens to Firebase in real-time → renders bus icons on Leaflet map
4. **Cleanup** → If timestamp is > 2 minutes old, the record is automatically removed

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- Location services enabled on your device

### 🔗 Live Project Links

| | Link |
|---|---|
| 🌐 **Live App** | [https://trackngo-c145b.web.app](https://trackngo-c145b.web.app) |
| 🔥 **Firebase Console** | [console.firebase.google.com/project/trackngo-c145b](https://console.firebase.google.com/project/trackngo-c145b/overview) |

Just open the live app — no installation, no setup, no account needed.

> ⚠️ **Important:** At least one conductor must be actively tracking a route for passengers to see buses. If the map is empty, start a conductor session first!

---

## 📱 Usage Guide

### Testing Locally (Both Roles on One Device)

1. Open two browser tabs pointing to your local server
2. In **Tab 1** → Choose **Conductor**, enter route `TEST01`, enter any bus number, tap ACTIVE
3. In **Tab 2** → Choose **Passenger**, enter route `TEST01`, click Track Route
4. Walk around (or simulate movement) — watch the bus icon move in Tab 2!

### Route Number Format

TrackNGo works with any string as a route number. Passengers and conductors simply need to use **the exact same string** to be on the same channel.

```
Examples: "215A"  |  "BUS-7"  |  "COLLEGE_ROUTE"  |  "42B"
```

---

## 🔐 Privacy & Security

TrackNGo was designed with **privacy-first principles**:

| Concern | How TrackNGo Handles It |
|---|---|
| 🙅 No Personal Data | Zero name, email, or phone number required |
| 🎭 Anonymous Auth | Firebase anonymous sign-in — no identity created |
| ⏳ Auto-Deletion | Location data expires and is deleted after **2 minutes** |
| 🔑 Secret Keys | Firebase and Maps API keys are never exposed publicly |
| 📡 Minimal Storage | Only lat/lng + timestamp are stored — nothing else |

> Location data is **transient** — the moment a conductor stops broadcasting, their bus disappears from everyone's maps within 2 minutes.

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JS | UI & interaction logic |
| **Maps** | [Leaflet.js](https://leafletjs.com/) | Interactive map rendering |
| **Tiles** | OpenStreetMap | Free map tile provider |
| **Database** | Firebase Realtime Database | Live location sync |
| **Auth** | Firebase Anonymous Auth | No-login user sessions |
| **Location** | Browser Geolocation API | GPS coordinates |
| **Hosting** | Any static host (Firebase Hosting, Vercel, Netlify) | Deployment |

</div>

---

## 📂 Project Structure

```
TrackNGo/
│
├── index.html              # Landing page with role selection
├── passenger.html          # Passenger tracking view
├── conductor.html          # Conductor broadcasting view
│
├── css/
│   ├── style.css           # Global styles
│   ├── passenger.css       # Passenger-specific styles
│   └── conductor.css       # Conductor-specific styles
│
├── js/
│   ├── firebase-config.js  # Firebase initialization (keep secret!)
│   ├── passenger.js        # Passenger logic — reads DB, renders map
│   └── conductor.js        # Conductor logic — writes GPS to DB
│
└── assets/
    └── bus-icon.png        # Custom bus marker icon
```

---

## 🤝 Contributing

Contributions are welcome! Whether it's a bug fix, a new feature idea, or a UI improvement — open a PR or an issue.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request 🎉
```

**Ideas for future features:**
- [ ] ETA estimation based on distance
- [ ] Push notifications when bus is nearby
- [ ] Multiple simultaneous route tracking
- [ ] Conductor trip history / heatmaps
- [ ] Dark mode 🌙

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for public transport commuters everywhere**

*No account. No tracking of you. Just tracking your bus.*

⭐ If TrackNGo helped you catch your bus, give it a star!

</div>
