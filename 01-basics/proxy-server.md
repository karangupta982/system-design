# Proxy and Proxy Servers

A **proxy** acts as an intermediary between a client and a server. It receives requests from clients, forwards them to the destination server, and returns the response back to the client. Proxies are used for security, anonymity, caching, and load distribution.

---

## 1. Proxy Server

A **proxy server** is the actual system or service that performs proxying.
It can control network traffic, hide client identity, cache responses, or filter requests based on rules and policies.

**Key Functions:**

* Mask client identity (IP hiding)
* Cache frequently requested content
* Restrict or monitor web access
* Improve performance and security

---

## 2. Forward Proxy

A **forward proxy** sits between **clients and the internet**. It represents clients and forwards their requests to external servers.

**How It Works:**

* The client sends a request to the proxy.
* The proxy forwards the request to the target server.
* The server’s response returns to the proxy, which relays it to the client.

**Used for:**

* Client anonymity
* Access control (e.g., corporate networks)
* Caching to reduce bandwidth usage
* Bypassing content restrictions

**Example:**
A company uses a forward proxy to allow employees to access external websites while monitoring traffic.

---

## 3. Reverse Proxy

A **reverse proxy** sits between **servers and clients**. It represents one or more servers and handles client requests on their behalf.

**How It Works:**

* The client sends a request to the proxy thinking it’s the main server.
* The reverse proxy forwards the request to one of the backend servers.
* The proxy then returns the server’s response to the client.

**Used for:**

* Load balancing between servers
* SSL termination
* Caching static content
* Hiding internal server details
* Protecting backend services from direct exposure

**Examples:**

* Nginx, HAProxy, Apache HTTP Server used as reverse proxies
* Cloudflare and AWS CloudFront act as reverse proxies for web applications

---

## Summary

| Type              | Represents | Common Use                          | Direction                  |
| ----------------- | ---------- | ----------------------------------- | -------------------------- |
| **Forward Proxy** | Client     | Security, caching, access control   | Client → Proxy → Internet  |
| **Reverse Proxy** | Server     | Load balancing, protection, caching | Client → Proxy → Server(s) |

