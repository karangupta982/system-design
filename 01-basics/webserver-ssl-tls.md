# Web Servers

## Overview
A **web server** is software (and sometimes hardware) that handles **HTTP requests** from clients (usually browsers) and serves **HTTP responses**, typically web pages, APIs, or static files.

When you open a website, your browser sends a request to the web server hosting that site. The web server processes the request and returns the required data (like HTML, CSS, or JSON).

---

## Functions of a Web Server
1. **Request Handling:**  
   Accepts HTTP/HTTPS requests from clients.

2. **Response Generation:**  
   Sends back static content (HTML, CSS, images) or dynamic content (API responses).

3. **Load Distribution:**  
   Can distribute incoming traffic to multiple backend servers.

4. **Security:**  
   Manages HTTPS (SSL/TLS encryption) and access controls.

5. **Logging and Monitoring:**  
   Tracks incoming requests, errors, and performance.

---

## How It Works
1. A browser sends a request (e.g., `GET /index.html`) to the server.  
2. The web server receives it and determines how to handle it:
   - If static file: fetched from disk and returned.
   - If dynamic route (e.g., API): forwarded to application server (Node.js, Django, etc.).
3. The server sends the response back over HTTP.

---

## Common Web Servers

| Web Server | Description | Use Case |
|-------------|--------------|-----------|
| **Nginx** | High-performance, event-driven server. Also used as reverse proxy and load balancer. | Modern web apps, microservices. |
| **Apache HTTP Server** | Mature, process-based web server with module support. | Traditional web hosting, dynamic content. |
| **Caddy** | Automatic HTTPS setup, simple configuration. | Lightweight, modern deployments. |
| **LiteSpeed** | Focused on speed and efficiency, compatible with Apache. | High-performance PHP hosting. |

---

## Web Server vs Application Server
| Feature | Web Server | Application Server |
|----------|-------------|--------------------|
| Purpose | Serves static content, routes requests | Runs business logic, generates dynamic content |
| Example | Nginx, Apache | Node.js, Spring Boot, Django |
| Execution | Handles HTTP directly | Executes code for APIs or apps |
| Communication | May forward to app server | Works behind the web server |

Example setup:
```

Browser → Nginx (Web Server) → Node.js (App Server) → Database

```

---

## When to Use a Web Server
- Hosting static websites or APIs.
- Acting as a **reverse proxy** to backend services.
- Managing SSL/TLS termination.
- Load balancing across multiple app servers.

---

## Key Advantages
- High concurrency and efficiency.
- Security through HTTPS and firewalls.
- Scalability with reverse proxying and caching.
- Reliability with request handling and fault tolerance.

---

**In summary**, a web server is the entry point for most web applications, handling HTTP traffic efficiently and serving as a bridge between users and backend systems.

---


## 1. What is Nginx?

**Nginx (pronounced “engine-x”)** is a **high-performance web server** that is also used as a **reverse proxy**, **load balancer**, and **HTTP cache**.

It was designed to handle **a very large number of concurrent connections** efficiently — much better than older web servers like Apache.

---

### What Nginx Does

| Role | Description |
|------|--------------|
| **Web Server** | Serves static files (HTML, CSS, images) directly to users. |
| **Reverse Proxy** | Forwards client requests to backend application servers (like Node.js, Django, Spring Boot) and returns their response. |
| **Load Balancer** | Distributes traffic across multiple backend servers to avoid overload. |
| **SSL Termination** | Handles HTTPS encryption and decryption so backend servers can focus on logic. |
| **Caching Layer** | Stores frequently accessed responses to reduce load on app servers. |

---

### Example Setup

```

Browser → Nginx → Node.js (App Server) → Database

```

1. The browser sends a request to `https://yourapp.com`.  
2. **Nginx** receives it (port 443), handles HTTPS (SSL/TLS).  
3. It checks if the content is static:
   - If **yes**, returns directly (very fast).  
   - If **no**, forwards to the backend (Node.js).  
4. Sends the backend’s response to the user.

This setup improves **speed, scalability, and security**.

---

# SSL and TLS Certificates

---

## 1. Purpose

**SSL (Secure Sockets Layer)** and **TLS (Transport Layer Security)** certificates are **digital certificates** that verify a server’s identity and enable **encrypted communication** between a client (browser) and a server.

They ensure:
- The user is communicating with the **real server** (authentication).  
- The transmitted data remains **encrypted** and **unchanged** (confidentiality and integrity).

---

## 2. Who Issues the Certificate

SSL/TLS certificates are issued by trusted organizations called **Certificate Authorities (CAs)** — examples include:
- Let’s Encrypt (free)
- DigiCert
- GlobalSign
- GoDaddy

These authorities verify the domain owner’s identity before issuing the certificate.

---

## 3. How It Works

1. **Server Setup**  
   The server (e.g., Nginx) installs its SSL/TLS certificate.  
   The certificate contains:
   - The domain name  
   - The server’s public key  
   - Information about the issuing CA  
   - Validity period  

2. **Browser Request**  
   When a user visits `https://example.com`, the browser requests the certificate from the server.

3. **Verification**  
   The browser checks:
   - Whether the certificate is valid and not expired.  
   - Whether it was issued by a trusted CA.  
   - Whether it matches the domain name.

4. **Encryption Setup**  
   After verification, both browser and server exchange keys and establish an **encrypted session** (via TLS handshake).

---

## 4. What It Guarantees

| Guarantee | Meaning |
|------------|----------|
| **Authentication** | Confirms the client is talking to the legitimate server, not an impostor. |
| **Encryption** | All transmitted data (passwords, payments, etc.) is unreadable to outsiders. |
| **Integrity** | Ensures data isn’t modified during transit. |

---

## 5. Summary

| Term | Description |
|------|--------------|
| **SSL/TLS** | Security protocol providing encryption and authentication. |
| **SSL/TLS Certificate** | A digital certificate proving a server’s identity and enabling secure HTTPS communication. |
| **Certificate Authority (CA)** | Trusted organization that verifies and issues SSL/TLS certificates. |

---

**Key Point:**  
> SSL/TLS certificates belong to the **server** and are issued by **trusted authorities** to ensure that the user is connected to the **authentic and secure** website.

