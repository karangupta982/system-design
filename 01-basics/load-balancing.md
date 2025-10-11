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
