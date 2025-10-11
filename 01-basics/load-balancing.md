# Load Balancing in System Design

---

## 1. What Is a Load Balancer?

A **Load Balancer** is a system component that distributes incoming network traffic or requests evenly across multiple servers or resources.

Its main goal is to:

* Prevent any single server from becoming overloaded.
* Improve system reliability, performance, and scalability.

In essence, a load balancer acts as the **traffic manager** of your infrastructure.

---

## 2. Why Load Balancing Is Needed

In a horizontally scaled system (multiple servers), requests must be efficiently distributed among available servers.
Without a load balancer:

* One server may receive too many requests.
* Others may remain underutilized.
* Failures in one node may cause downtime.

A load balancer ensures even distribution and seamless failover.

---

## 3. Roles of a Load Balancer

| Role                                      | Description                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------ |
| **Traffic Distribution**                  | Distributes requests evenly across multiple backend servers.                   |
| **Fault Tolerance**                       | Detects server failures and redirects traffic to healthy nodes.                |
| **High Availability**                     | Ensures continuous service by avoiding single points of failure.               |
| **Scalability Management**                | Supports horizontal scaling — new servers can be added or removed dynamically. |
| **Performance Optimization**              | Reduces latency by routing requests to the nearest or least-loaded server.     |
| **Security Layer**                        | Can hide backend details and protect against attacks like DDoS.                |
| **Session Persistence (Sticky Sessions)** | Routes repeated user requests to the same server when necessary.               |

---

## 4. When to Use a Load Balancer

| Scenario                           | Explanation                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| **High Traffic Applications**      | When one server can’t handle the load alone.                                 |
| **Horizontal Scaling**             | When multiple servers serve the same application.                            |
| **Microservices Architecture**     | To route traffic efficiently between services.                               |
| **High Availability Requirements** | To maintain uptime even during server failures.                              |
| **Global Applications**            | To route users to geographically closer servers (via Global Load Balancing). |

---

## 5. When Not to Use a Load Balancer

| Scenario                             | Reason                                                            |
| ------------------------------------ | ----------------------------------------------------------------- |
| **Single-Server Applications**       | No load to balance — adds unnecessary complexity.                 |
| **Low Traffic or Early Development** | Small-scale apps don’t benefit from load balancing overhead.      |
| **Tightly Coupled Monoliths**        | When all components must reside on one server for shared state.   |
| **Local or Internal Tools**          | Internal systems may not require fault tolerance or distribution. |

---

## 6. Challenges of Load Balancing

| Challenge                 | Description                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------- |
| **Session Management**    | Maintaining user sessions across distributed servers.                                   |
| **Stateful Applications** | If the app keeps state locally, balancing requests becomes hard.                        |
| **Health Checks**         | Detecting unhealthy servers accurately without false positives.                         |
| **Network Latency**       | Poor routing algorithms may increase latency.                                           |
| **Cost and Complexity**   | Adding and maintaining load balancers adds infrastructure and configuration complexity. |
| **Consistency**           | Ensuring data consistency between servers handling requests simultaneously.             |

---

## 7. Advantages of Using a Load Balancer

| Advantage                          | Description                                                                                |
| ---------------------------------- | ------------------------------------------------------------------------------------------ |
| **High Availability**              | Traffic is automatically redirected if one server fails.                                   |
| **Scalability**                    | Easily add or remove servers based on demand.                                              |
| **Improved Performance**           | Requests distributed evenly, reducing bottlenecks.                                         |
| **Fault Isolation**                | Issues in one node don’t affect the entire system.                                         |
| **Security**                       | Can serve as a single entry point to manage firewalls, SSL termination, and rate limiting. |
| **Efficient Resource Utilization** | Prevents overloading some servers while others are idle.                                   |

---

## 8. Load Balancing Algorithms

### 8.1. Static Algorithms

These algorithms distribute traffic based on pre-defined rules, not real-time performance.

| Algorithm                | Description                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| **Round Robin**          | Requests are distributed sequentially among servers (Server 1 → Server 2 → Server 3 → ...). |
| **Weighted Round Robin** | Each server is assigned a weight based on capacity. Higher weight = more requests.          |
| **IP Hashing**           | Request routing is based on client IP hash — helps with session stickiness.                 |

### 8.2. Dynamic Algorithms

These consider server health and performance before routing traffic.

| Algorithm                    | Description                                                                                        |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| **Least Connections**        | Sends the next request to the server with the fewest active connections.                           |
| **Least Response Time**      | Routes requests to the server with the lowest latency.                                             |
| **Resource-Based Balancing** | Monitors CPU, memory usage, and routes based on available resources.                               |
| **Consistent Hashing**       | Used in distributed caching systems; ensures minimal re-routing when servers are added or removed. |

---

## 9. Types of Load Balancers

| Type                                 | Layer      | Description                                  | Example                  |
| ------------------------------------ | ---------- | -------------------------------------------- | ------------------------ |
| **Layer 4 (Transport Layer)**        | TCP/UDP    | Routes traffic based on IP and port.         | NGINX (L4), AWS NLB      |
| **Layer 7 (Application Layer)**      | HTTP/HTTPS | Routes based on URLs, headers, cookies, etc. | AWS ALB, HAProxy, NGINX  |
| **Global Load Balancer (DNS Level)** | Layer 3/7  | Routes users to nearest region/data center.  | AWS Route 53, Cloudflare |

---

## 10. Example Architecture

A typical web system may use:

1. **DNS Load Balancer** — Routes users to the nearest region.
2. **Application Load Balancer (ALB)** — Distributes HTTP requests among web servers.
3. **Internal Load Balancer** — Balances traffic between microservices or databases.

---

## 11. Summary

* **Load Balancer** distributes requests across servers for better performance and reliability.
* **Used when** scaling horizontally or ensuring high availability.
* **Not ideal** for single-server, small-scale, or tightly coupled systems.
* **Challenges** include session persistence, health checks, and cost.
* **Algorithms** can be static (Round Robin) or dynamic (Least Connections, Resource-Based).
* Proper load balancing leads to **fault tolerance, scalability, and efficient resource utilization**.
