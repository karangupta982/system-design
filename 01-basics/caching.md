# Caching in System Design

---

## 1. What Is Caching?

**Caching** is the process of storing frequently accessed data in a **temporary high-speed storage layer** (usually **RAM**) so that future requests for that data can be served **faster**.

Instead of hitting a database every time (which is slower and costly), the application can read from the cache.

---

## 2. Why Caching Matters

| Benefit             | Explanation                                                                   |
| ------------------- | ----------------------------------------------------------------------------- |
| **Speed**           | RAM is much faster than disk or network calls, reducing latency dramatically. |
| **Reduced Load**    | Fewer database queries → lower CPU and I/O load.                              |
| **Scalability**     | Applications can handle more users efficiently.                               |
| **Cost-Efficiency** | Reduces expensive DB operations.                                              |

---

## 3. Real-World Example

In a **subscription platform** (like Netflix or Spotify):

* **Plans and prices** rarely change.
* These plans are stored in **cache** for fast retrieval.
* When a new plan is added, the system **invalidates (deletes)** the old cache and **refreshes** it with the updated list.

This ensures both **fresh data** and **fast access**.

---

## 4. Where Cache Lives

### a. **In-Memory Cache (Local Cache)**

* Stored directly inside the **application server’s RAM**.
* Very fast, but **not shared** across servers.

#### Example: **Memcached**

| Feature         | Details                                                                          |
| --------------- | -------------------------------------------------------------------------------- |
| **Type**        | In-memory, key-value store                                                       |
| **Best For**    | Simple, temporary data (e.g., session tokens, configuration, metadata)           |
| **Performance** | Extremely fast — pure RAM access                                                 |
| **Limitation**  | Not persistent; data lost if server restarts                                     |
| **Use Case**    | Small-scale apps, single-node systems, or local cache layer in front of Redis/DB |

---

### b. **Distributed Cache**

* Stored on **dedicated caching servers** accessible by multiple app instances.
* Ensures **data consistency** across a cluster.

#### Example: **Redis**

| Feature               | Details                                                               |
| --------------------- | --------------------------------------------------------------------- |
| **Type**              | Distributed, in-memory key-value database                             |
| **Persistence**       | Can save data to disk for recovery                                    |
| **Advanced Features** | Pub/Sub, Streams, Expiry, Atomic operations, Lua scripting            |
| **Use Case**          | Session storage, rate limiting, leaderboard data, caching API results |
| **Advantage**         | High availability, supports replication and clustering                |

---

## 5. When to Use Caching

| Scenario                       | Why It Helps                                                                        |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| **Read-Intensive Workloads**   | Data is read far more often than it changes (e.g., product catalog, pricing plans). |
| **Static or Semi-Static Data** | Data that doesn’t change often (e.g., homepage content, app settings).              |
| **Expensive Computations**     | Cache the output of heavy queries or processing results.                            |

---

## 6. Cache Layers

| Layer                 | Description                                                           | Example                                  |
| --------------------- | --------------------------------------------------------------------- | ---------------------------------------- |
| **Application Cache** | Cache stored in app memory or local service memory                    | `memcached` or in-process LRU cache      |
| **Distributed Cache** | Shared cache across multiple app instances                            | `Redis`, `Hazelcast`                     |
| **CDN Cache**         | Edge servers cache static assets (images, JS, CSS, videos) near users | `Cloudflare`, `Akamai`, `AWS CloudFront` |

---

## 7. Cache Invalidation (Updating Cache)

Caching only works well if data is **fresh**.
When data changes in the source (e.g., database), we must **invalidate** or **update** the cache.

Common strategies:

1. **Write-through** – Update cache and DB simultaneously.
2. **Write-back** – Write to cache first, update DB later.
3. **Cache-aside (Lazy loading)** – Load into cache on first request; invalidate manually when data changes.

Example in subscription plans:

```
When new plan is added → delete cache key "plans" → reload all plans from DB → store in cache.
```

---

## 8. Summary Table

| Type                  | Tool                   | Shared Across Servers? | Persistent?              | Use Case                         |
| --------------------- | ---------------------- | ---------------------- | ------------------------ | -------------------------------- |
| **In-Memory Cache**   | Memcached              | ❌ No                   | ❌ No                     | Small, temporary data            |
| **Distributed Cache** | Redis                  | ✅ Yes                  | ✅ Optional               | Scalable, shared caching         |
| **CDN Cache**         | Cloudflare, CloudFront | ✅ Yes                  | ✅ Yes (for static files) | Static content (images, CSS, JS) |

---

## 9. Key Takeaways

* **Cache is in RAM** → extremely fast access.
* Use **Memcached** for lightweight, volatile data.
* Use **Redis** for distributed caching, persistence, and advanced operations.
* Use caching for **read-heavy** or **static** workloads.
* Always plan **cache invalidation** logic carefully — stale cache can cause incorrect results.
* Combine with **CDN** for global performance improvements.
