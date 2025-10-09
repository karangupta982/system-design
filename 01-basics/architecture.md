# Website vs Web Application — Architectures & Comparison

---

## What is a Website?

A **website** is a collection of static or semi-static pages accessible via the internet.  
It primarily focuses on **information delivery**, not interaction.

Example:
- A company portfolio page (like `openai.com`)
- A blog or news site (like `medium.com` or `bbc.com`)

### Basic Architecture of a Website
[User Browser] ⇄ [Web Server] ⇄ [Static HTML/CSS/JS Files]

- The browser sends a request to the web server.
- The server responds with pre-built HTML pages.
- Little to no backend logic is executed per user request.

---

##  What is a Web Application?

A **web application (web app)** is an interactive system that allows users to perform actions and manipulate data through the browser.  
Unlike a simple website, it involves **dynamic data**, **business logic**, and **state management**.

Example:
- Gmail (sending/receiving emails)
- Netflix (personalized video streaming)
- GitHub (real-time collaboration)
- Online Banking App

### Basic Architecture of a Web App
[Client (Browser/Frontend)]
⇅
[Backend Application Server]
⇅
[Database / Storage Systems]

- The frontend handles UI/UX.
- The backend processes logic and data.
- The database stores persistent user data.

## Website vs Web App — Summary Table

| Feature | Website | Web Application |
|----------|----------|----------------|
| **Purpose** | Informational | Interactive / Functional |
| **Data Type** | Mostly static | Dynamic, changes per user |
| **User Interaction** | Minimal | High (CRUD operations) |
| **Backend Logic** | Simple or none | Complex (APIs, databases) |
| **Technology Stack** | HTML, CSS, JS | Full Stack (MERN, MEAN, etc.) |
| **Authentication** | Usually none | Common (Login/Register) |
| **Examples** | Wikipedia, Blog | Gmail, Netflix, Twitter |

---


# System Architecture vs Internal Design

## Overview
In system design, **architecture** and **internal design** represent two different levels of detail.

- **Architecture** defines the **high-level structure** of a system — how components are organized and interact.
- **Internal design** (or detailed design) defines **how each component works internally**.

---

## Architecture
**Architecture** is the blueprint of a system.

- Describes major components (frontend, backend, database, cache, message queue, etc.)
- Defines data flow and communication between components
- Focuses on scalability, reliability, and performance

**Example:**
Client → API Gateway → Service Layer → Database
↘ Cache ↙

---

## Internal Design
**Internal design** focuses on implementation details inside each component.

- Data structures, algorithms, and logic
- API endpoints, database schemas, and internal workflows
- Component-level optimizations

**Example:**
Inside the “Video Service”:
- How upload API handles chunks  
- How metadata is stored  
- How encoding jobs are queued  

---

## Analogy

| Concept | Description | Analogy |
|----------|--------------|----------|
| **Architecture** | High-level structure and interaction of system components | City map showing how buildings and roads are connected |
| **Internal Design** | Detailed design of individual components | Blueprint of a single building showing rooms, wiring, and plumbing |

---

## Key Difference

| Aspect | Architecture | Internal Design |
|--------|---------------|----------------|
| **Level** | High-level | Low-level |
| **Focus** | Structure & communication | Implementation details |
| **Purpose** | Define the system’s blueprint | Build each component correctly |
| **Audience** | Architects, tech leads | Developers, engineers |

---

## Summary
- **Architecture** = Big picture — how the system is organized  
- **Internal design** = Implementation — how each part works  
- Both are essential: architecture provides direction; internal design provides execution.

