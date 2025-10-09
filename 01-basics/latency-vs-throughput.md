# Latency in System Design

---

## 1. What Is Latency?

**Latency** is the time delay between when a request is made and when the response is received.
It measures **how long it takes for data to travel** through a system — from the client to the server and back.

In simpler terms:

> Latency = Time taken for a request to get processed and return a response.

Example:
When you open a web page and it takes 200 milliseconds to load data from the server,
that 200 ms is the **latency**.

---

## 2. Latency vs Throughput

| Term           | Definition                              | Example                            |
| -------------- | --------------------------------------- | ---------------------------------- |
| **Latency**    | Time delay to process one request       | One user waits 200 ms for response |
| **Throughput** | Number of requests processed per second | Server handles 500 requests/sec    |

A system can have **low latency but low throughput**, or **high throughput but high latency** — both are independent metrics.

---

## 3. Where Does Latency Come From?

Latency can occur at multiple stages:

| Source                       | Description                                                           |
| ---------------------------- | --------------------------------------------------------------------- |
| **Network Latency**          | Time taken for data to travel across the internet or internal network |
| **Application Latency**      | Time spent by the backend logic to process the request                |
| **Database Latency**         | Time spent reading or writing data in the database                    |
| **Disk I/O Latency**         | Time spent accessing files or storage systems                         |
| **Queue / Middleware Delay** | Time spent waiting in message queues or caches                        |
| **Client-side Latency**      | Time spent rendering UI or executing frontend JavaScript              |

---

## 4. Latency in Monolithic Systems

### 4.1. What Happens in a Monolith

In a **monolithic architecture**, all components (user management, payments, inventory, etc.) exist within a single codebase and often share one database.

### 4.2. Characteristics

* Communication between modules happens **in-process** (function calls or method invocations).
* There are **no network hops** between services.
* Database calls are **local or shared**, so access is faster.

### 4.3. Result

* **Lower latency** because:

  * Fewer network boundaries.
  * Shared memory and direct communication.
* Example:

  ```
  User Request → Web Server → Function Call → Database → Response
  ```

---

## 5. Latency in Distributed Systems

### 5.1. What Happens in a Distributed Architecture

In a **distributed system** (like microservices), each component is an independent service.
They communicate over the network (usually via HTTP, gRPC, or message queues).

### 5.2. Characteristics

* Each service call may require a **network round-trip**.
* Services may be located on **different machines or regions**.
* Data might be stored in **different databases** per service.

### 5.3. Result

* **Higher latency** because:

  * Network communication takes time.
  * Serialization and deserialization of data adds overhead.
  * Multiple dependent service calls can stack up delays.

Example:

```
Frontend → Auth Service → User Service → Payment Service → Database
```

Each arrow introduces potential latency.

---

## 6. Measures to Reduce Latency

### 6.1. Network-Level Optimizations

* **Use Content Delivery Networks (CDN)**
  Cache static content (images, CSS, scripts) near users to reduce travel time.
* **Deploy services closer to users**
  Use multiple data centers or edge servers.
* **Enable HTTP/2 or HTTP/3**
  Improves connection efficiency and multiplexing.

---

### 6.2. Application-Level Optimizations

* **Use Caching**
  Store frequently accessed data in Redis, Memcached, or browser cache.
* **Reduce External API Calls**
  Minimize dependencies on third-party APIs or combine multiple API calls into one.
* **Use Connection Pooling**
  Reuse open connections to databases instead of creating new ones.
* **Optimize Code Paths**
  Avoid unnecessary computation or data transformations.

---

### 6.3. Database-Level Optimizations

* **Index Frequently Queried Columns**
* **Use Read Replicas**
* **Use Caching Layers**
* **Denormalize When Necessary**
* **Use Appropriate Datastores**
  For example, use NoSQL for high-speed lookups, SQL for transactions.

---

### 6.4. Architectural-Level Optimizations

* **Parallelize Calls**
  If multiple services are independent, call them simultaneously.
* **Use Asynchronous Communication**
  Employ message queues (Kafka, RabbitMQ) where real-time response isn’t required.
* **Implement Load Balancers**
  Distribute requests evenly across instances to prevent bottlenecks.
* **Circuit Breakers and Retries**
  Handle failures gracefully and avoid cascading delays.

---

## 7. Summary Table

| Aspect                 | Monolithic System          | Distributed System                |
| ---------------------- | -------------------------- | --------------------------------- |
| **Communication Type** | In-memory / function calls | Network calls (HTTP, gRPC, etc.)  |
| **Latency**            | Low                        | Higher                            |
| **Scalability**        | Limited                    | High                              |
| **Reliability**        | Single point of failure    | Fault-tolerant (if designed well) |
| **Typical Bottleneck** | Database or code logic     | Network or inter-service calls    |

---

## 8. Key Takeaway

* **Latency** is unavoidable but can be minimized.
* **Monoliths** have inherently lower latency due to local communication.
* **Distributed systems** trade higher latency for better scalability and fault isolation.
* Effective use of **caching, asynchronous design, and optimized networking** can significantly reduce overall latency.

---

# Difference Between CDN and Caching

---

## 1. Overview

Both **CDN (Content Delivery Network)** and **Caching** aim to **reduce latency** and **improve performance** by serving data faster to the user.

However, they operate at **different layers** and solve **different parts** of the performance problem.

---

## 2. What Is Caching?

### Definition

**Caching** is the process of **storing a copy of frequently accessed data** in a temporary storage (called a cache) so that future requests can be served faster without regenerating or refetching that data.

### Key Idea

> "Why recompute or refetch something that was recently fetched?"

### Example

* When your backend frequently queries a database for user info, you can cache it in **Redis** or **Memcached**.
* Next time, the backend fetches from cache instead of the database — reducing latency.

### Common Cache Types

| Type                    | Location                   | Example                 |
| ----------------------- | -------------------------- | ----------------------- |
| **Browser Cache**       | User’s device              | Images, scripts, styles |
| **Application Cache**   | Inside app memory          | In-memory object cache  |
| **Database Cache**      | Between app and DB         | Redis, Memcached        |
| **Reverse Proxy Cache** | Between client and backend | Nginx, Varnish          |

### When to Use

* Repeatedly accessed data (user profiles, product details)
* Expensive queries or computations
* Frequently read, rarely updated data

---

## 3. What Is a CDN (Content Delivery Network)?

### Definition

A **CDN** is a **geographically distributed network of servers** that cache and deliver **static assets** (like images, CSS, videos, scripts) closer to users based on their physical location.

### Key Idea

> "Bring data physically closer to the user."

### Example

If your main server is in **Mumbai**, but a user opens your website in **New York**, the CDN will serve your website’s static files from a **New York edge server**, instead of fetching them all the way from Mumbai.

### What CDN Caches

* Static files: images, videos, CSS, JS
* Static API responses (if configured)
* Occasionally, HTML pages (for static sites)

### Popular CDN Providers

* Cloudflare
* Akamai
* Amazon CloudFront
* Fastly
* Google Cloud CDN

---

## 4. CDN vs Caching: Key Differences

| Feature          | **Caching**                                              | **CDN**                                                |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------ |
| **Purpose**      | Store data temporarily for faster access                 | Distribute static content globally for faster delivery |
| **Scope**        | Can exist anywhere (app, DB, browser)                    | Distributed servers across regions (edge servers)      |
| **Data Type**    | Dynamic or static (database queries, computations, etc.) | Mostly static (images, JS, CSS, videos)                |
| **Location**     | Inside system (local memory, server)                     | Outside system (edge servers across world)             |
| **Control**      | Managed by developer                                     | Managed by CDN provider                                |
| **Example Tool** | Redis, Memcached, Nginx cache                            | Cloudflare, AWS CloudFront, Akamai                     |
| **Use Case**     | Speed up backend and database queries                    | Speed up content delivery to end users                 |

---

## 5. How They Work Together

In real-world systems, **CDNs and caching are used together**.

Example:

```
User → Browser Cache → CDN Edge Server → Backend Cache → Database
```

Explanation:

1. **Browser Cache** keeps recent assets locally.
2. **CDN Edge Server** serves static files from nearby data centers.
3. **Backend Cache (Redis)** stores dynamic data to avoid repeated DB hits.
4. **Database** is the final source of truth.

Each layer improves performance at its level.

---

## 6. Analogy

Imagine a **bookstore chain**:

* The **main warehouse** is your **database** (original source).
* Each **regional store** keeps **popular books in stock** — that’s your **CDN** (serving nearby users quickly).
* Each **cashier desk** keeps **the most sold book beside them** — that’s your **cache** (fastest local access).

All aim to reduce waiting time — just at different levels.

---

## 7. Summary

| Concept      | CDN                                  | Caching                                           |
| ------------ | ------------------------------------ | ------------------------------------------------- |
| **Layer**    | Network layer (edge)                 | Application, database, or browser                 |
| **Goal**     | Reduce latency by physical proximity | Reduce latency by reusing previously fetched data |
| **Best For** | Static content                       | Dynamic or repetitive data                        |
| **Example**  | Cloudflare, Akamai                   | Redis, Memcached, Nginx cache                     |

---

## 8. Key Takeaway

* **Caching** improves performance **inside** your system.
* **CDN** improves performance **across the internet** for global users.
* In modern architectures, **both are combined** to achieve optimal speed and scalability.
