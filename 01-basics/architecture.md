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
