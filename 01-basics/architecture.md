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

## Architecture Types

Let’s dive into **Monolithic** and **Distributed** architectures, which define how web systems are structured.

---

## Monolithic Architecture

### Definition

A **monolithic architecture** is a single, unified codebase where **frontend, backend, and database** are tightly coupled and deployed as **one application**.

+--------------------------------+

Web UI (Frontend)
Business Logic (Backend)
--------------------------------
Database Access Layer
+--------------------------------+


Everything runs together — if one part changes, you redeploy the entire application.

---

### Real-World Example

- Early versions of **Facebook**, **LinkedIn**, or **WordPress**
- A traditional **LAMP stack** app (Linux, Apache, MySQL, PHP)

---

### Advantages

| Pros | Description |
|------|--------------|
| **Simple Development** | Easy to build for small teams |
| **Easy Deployment** | One codebase → one deploy |
| **Good for MVPs** | Fast for early-stage projects |
| **Tight Integration** | Components can easily communicate |
| **Maintainance** | Entire code is in one repo |
| **Api calls** | Less api call to connect with other services since entire code is in one repo only |

---

###  Disadvantages

| Cons | Description |
|------|--------------|
| **Poor Scalability** | Hard to scale individual modules |
| **Difficult Maintenance** | One bug can affect the whole system |
| **Slow Deployments** | Any small change requires full redeploy |
| **Tech Stack Lock-in** | Hard to mix different languages or frameworks |

---

### When to Use Monolithic Architecture

- For **small teams or startups** building MVPs
- When **application complexity is low**
- When **performance** and **scaling** are not immediate concerns

---

## Distributed Architecture

### Definition

A **distributed architecture** breaks the system into **multiple independent services** that communicate over a network.  
Each service handles a specific functionality — this is the basis of **microservices architecture**.

+----------------------------------------+
| User Interface (Frontend) |
+------------------+---------------------+
| Auth Service | Product Service |
| Payment Service | Notification Service|
+------------------+---------------------+
↓
[Databases / Message Queues]


Each service can be **developed, deployed, and scaled independently**.

---

### Real-World Example

- **Netflix** → hundreds of microservices (recommendations, streaming, billing)
- **Amazon** → product, cart, payment services separated
- **Uber** → ride, map, pricing, and notification microservices

---

### Advantages

| Pros | Description |
|------|--------------|
| **Independent Scalability** | Scale specific services as needed |
| **Fault Isolation** | Failure in one service doesn’t crash all |
| **Faster Development** | Multiple teams can work independently |
| **Flexible Tech Stack** | Each service can use different languages/frameworks |
| **Continuous Deployment** | Easier updates & rollouts |

---

### Disadvantages

| Cons | Description |
|------|--------------|
| **Complex Setup** | Requires orchestration, service discovery, etc. |
| **Networking Overhead** | Services need APIs to communicate |
| **Data Consistency Issues** | Harder to manage distributed data |
| **Higher Infrastructure Cost** | Multiple servers/containers required |
| **Complex maintainance** | Code would be in multiple repos |
| **Api calls** | More api calls to connect with other services |

---

### When to Use Distributed Architecture

- For **large-scale systems** with millions of users
- When **high availability & fault tolerance** are required
- For **microservices-based** or **cloud-native** systems
- When independent **team ownership** of services is desired

---

## Monolithic vs Distributed Architecture — Comparison

| Aspect | Monolithic | Distributed |
|---------|-------------|-------------|
| **Structure** | Single, unified codebase | Multiple independent services |
| **Scalability** | Vertical scaling | Horizontal scaling |
| **Deployment** | Single unit | Multiple independent deployments |
| **Communication** | In-process | Network calls (API, gRPC, MQ) |
| **Tech Stack** | One stack for all | Different stacks per service |
| **Complexity** | Simpler | More complex |
| **Fault Tolerance** | Single point of failure | Isolated failures |
| **Use Case** | Small apps, MVPs | Large-scale, high-traffic apps |

---

## Use Cases

| Scenario | Recommended Architecture |
|-----------|--------------------------|
| Simple portfolio website | Monolithic |
| Blog or CMS | Monolithic |
| E-commerce platform | Distributed |
| Streaming platform | Distributed |
| Banking or Fintech app | Distributed |
| Educational LMS | Monolithic (early) → Distributed (scale) |

---

## Summary

- **Websites** → static or semi-static, focus on content.
- **Web Apps** → dynamic, focus on interactivity.
- **Monolithic Architecture** → single deployable unit, simpler but less scalable.
- **Distributed Architecture** → multiple services, complex but highly scalable.

In real-world evolution:
> Start with **Monolithic** → grow into **Distributed** as traffic, team size, and complexity increase.

---

# Handling Failures in Distributed Architecture

In a distributed architecture, an application is divided into multiple independent microservices, such as authentication, payment, user, or notification services. Each runs separately, often on different servers or containers. Because these services depend on one another, a failure in one can affect the whole system’s performance or availability.

To maintain reliability and uptime, distributed systems implement several fault-tolerance mechanisms. One of the most important among them is **replication**.

---

## 1. Replication

**Replication** means running multiple instances (replicas) of the same microservice simultaneously.

### Purpose of Replication

* Ensures availability even if one instance fails.
* Helps distribute high traffic across multiple instances.
* Increases fault tolerance and improves reliability.

### How Replication Works

Each microservice may have several instances:

```
user-service-1
user-service-2
user-service-3
```

A load balancer distributes incoming requests evenly among these replicas. If one instance fails, it stops receiving traffic until it recovers, and the rest continue handling requests.

### Common Tools for Managing Replicas

* Kubernetes (ReplicaSets, Deployments)
* Docker Swarm
* AWS ECS or EKS
* NGINX Load Balancer
* HAProxy
* Cloud Load Balancers (AWS ALB, GCP Load Balancer)

---

## 2. Additional Fault Tolerance Techniques

Replication alone is not enough. Distributed systems also use other resilience mechanisms.

### Load Balancing

Distributes incoming requests across replicas to prevent overloading any single instance.

### Health Checks and Auto-Healing

Automatically detect and restart unhealthy service instances.

### Circuit Breaker Pattern

Stops sending requests to a failing service temporarily to prevent cascading failures.

### Retry and Timeout Strategies

Retries failed requests after a short delay, with proper timeout limits to avoid long waits.

### Data Replication

Replicates data across multiple database nodes to maintain availability (e.g., MongoDB Replica Set, Redis Cluster).

---

## 3. Example Scenario

Consider an e-commerce platform with a **payment-service** deployed as three replicas using Kubernetes.

When traffic increases:

* The load balancer distributes requests across all replicas.
* If one replica fails due to memory or network issues:

  * Kubernetes detects the failure.
  * It automatically creates a new healthy replica.
  * The load balancer stops sending requests to the failed instance.

The platform continues to process payments without downtime.

---

## 4. Summary

| Concept             | Description                                            |
| ------------------- | ------------------------------------------------------ |
| Replication         | Running multiple instances of the same service.        |
| Goal                | Improve fault tolerance, scalability, and reliability. |
| Managed By          | Load balancer and container orchestrators.             |
| If a Service Fails  | Requests are redirected to healthy replicas.           |
| Without Replication | System experiences downtime or degraded performance.   |
