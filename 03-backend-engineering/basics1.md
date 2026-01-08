# Backend Engineering – Foundations

## 1. What Is a Backend?

A backend is a **server-side system** that:

* Listens for requests over the network (HTTP, HTTPS, WebSocket, gRPC, etc.)
* Exposes open ports (commonly 80 and 443)
* Processes requests
* Sends responses (JSON, HTML, static files, etc.)
* Persists and manages data

It is called a **server** because it serves content and handles business logic for clients (browsers, mobile apps, other services).

---

## 2. High-Level Backend Request Flow

A typical backend request travels through the following steps:

1. **Browser / Client**
2. **DNS Resolution**
3. **Cloud Provider (AWS)**
4. **Firewall / Security Group**
5. **Compute Instance (EC2)**
6. **Reverse Proxy (Nginx)**
7. **Application Server (Node.js, etc.)**
8. **Response back to Client**

---

## 3. DNS (Domain Name System)

DNS maps **human-readable domain names** to **IP addresses**.

### Common DNS Records:

* **A Record** → Maps domain to IP address
* **CNAME Record** → Maps domain to another domain

Example:

* `backend.example.com` → `A record` → `EC2 public IP`

DNS ensures requests reach the correct server.

---

## 4. Cloud Infrastructure (AWS Example)

### EC2 Instance

* Virtual machine running the backend server
* Has a **public IP** exposed to the Internet

### Security Groups (Firewall)

* Control inbound and outbound traffic
* Common allowed ports:

  * `22` → SSH
  * `80` → HTTP
  * `443` → HTTPS

If a port is not allowed, traffic is blocked before reaching the server.

---

## 5. Reverse Proxy (Nginx)

A **reverse proxy** sits in front of application servers.

### Responsibilities:

* Routes incoming traffic
* Handles SSL/TLS
* Redirects HTTP → HTTPS
* Forwards requests to internal services

Example:

* Incoming request → `backend.example.com`
* Nginx forwards → `localhost:3001`

Benefits:

* Centralized configuration
* Decouples domain routing from app logic
* Improves security and scalability

---

## 6. Application Server

The backend application (e.g., Node.js):

* Runs on a **local port** (e.g., 3001)
* Processes requests
* Interacts with databases and services
* Returns responses

From inside the server:

* Requests are handled via `localhost`
* From outside:

  * Domain + DNS + proxy expose it to the Internet

---

## 7. Why Do We Need Backends?

Backends exist to handle **data and state**.

### Example (Social Media Like):

1. User clicks "Like"
2. Request sent to backend
3. Backend:

   * Authenticates user
   * Saves like in database
   * Identifies post owner
   * Triggers notification
4. Response sent back

### Core Backend Responsibilities:

* Fetch data
* Receive data
* Persist data
* Enforce business rules
* Coordinate actions between users/services

---

## 8. How Frontends Work

Frontend applications:

* Serve HTML, CSS, JavaScript
* Code is fetched from a server
* **Executed in the browser**
* Browser is the runtime environment

Flow:

1. Browser fetches HTML
2. Fetches CSS → page is painted
3. Fetches JS → event listeners attached
4. Interactions become active (hydration)

---

## 9. Why Backend Logic Should NOT Be in Frontend

### 1. Security Constraints

Browsers are sandboxed:

* No filesystem access
* No environment variables
* No OS-level operations

Backend servers require these capabilities.

---

### 2. CORS Restrictions

Browsers enforce **Cross-Origin Resource Sharing**:

* External APIs must explicitly allow requests
* Backend servers have no such limitation

Backends need unrestricted service-to-service communication.

---

### 3. Database Access

Backend runtimes:

* Use native database drivers
* Maintain persistent connections
* Use connection pooling
* Handle binary protocols

Browsers:

* Cannot maintain persistent DB connections
* Cannot efficiently manage queries
* Would overload databases if allowed

---

### 4. Computing Power

Frontend runs on:

* Mobile devices
* Low-memory systems
* Limited CPU environments

Backend servers:

* Centralized
* Scalable
* CPU and memory can be upgraded
* Designed for heavy workloads

---

## 10. Key Takeaways

* Backend is a **centralized, secure, scalable system**
* Frontend executes untrusted code in user environments
* Backend handles:

  * Data
  * State
  * Security
  * Performance
* Separation of frontend and backend is **mandatory**, not optional

---

## 11. What This Enables Next

Understanding this foundation prepares you for:

* API design
* Authentication & authorization
* Databases
* Caching
* Scaling systems
* Distributed architectures
