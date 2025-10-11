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

---

# Cache Eviction Strategies

---

## 1. What Is Cache Eviction?

Cache eviction is the process of **removing old or unused data** from the cache when it becomes full or when data is no longer needed.

Since **RAM is limited**, caches cannot store everything. Therefore, a **cache eviction policy** decides **which data to remove** to make space for new data.

---

## 2. Why Eviction Is Needed

| Reason             | Explanation                                                  |
| ------------------ | ------------------------------------------------------------ |
| **Limited Memory** | Caches store data in RAM; memory is always finite.           |
| **Freshness**      | Old or unused data must be replaced by newer, relevant data. |
| **Performance**    | Maintaining optimal cache size ensures quick lookups.        |
| **Cost Control**   | Reduces the need for expensive hardware upgrades.            |

---

## 3. Common Cache Eviction Strategies

---

### a. **Least Recently Used (LRU)**

**Concept:**
Removes the **least recently accessed** item when the cache is full.

**Logic:**
If an item hasn’t been used for a long time, it’s likely less important.

**Example:**
If cache can hold 3 items:
Access sequence → A, B, C, A, D
When D is added, **B** is evicted because it’s the least recently used.

**Used In:** Redis (default), Memcached, web browsers.

**Advantages:**

* Reflects real-world access patterns.
* Efficient and widely implemented.

**Disadvantages:**

* Can be costly in very large caches (requires tracking order of access).

---

### b. **Most Recently Used (MRU)**

**Concept:**
Removes the **most recently accessed** item first.

**Logic:**
Assumes that recently used data may not be needed soon again.

**Example:**
Access sequence → A, B, C, A, D
When D is added, **A** is evicted because it was most recently used.

**Used In:**
Workloads where once data is used, it won’t be needed soon again (e.g., sequential scans).

**Advantages:**

* Works well for certain one-time access workloads.

**Disadvantages:**

* Inefficient for typical caching patterns (most systems reaccess recent data).

---

### c. **Least Frequently Used (LFU)**

**Concept:**
Removes the item that has been **used the fewest times**.

**Logic:**
If an item is rarely accessed, it’s less important to keep.

**Example:**
Cache stores item usage counts:

* A: 5 times
* B: 2 times
* C: 10 times
  When cache is full, **B** is evicted.

**Used In:** Redis (optional), CDN caches.

**Advantages:**

* Good for workloads with strong access frequency patterns.

**Disadvantages:**

* Requires tracking frequency counts, adding overhead.
* May retain stale but frequently accessed data.

---

### d. **First In, First Out (FIFO)**

**Concept:**
Removes the **oldest added** item first.

**Logic:**
Items are evicted in the same order they entered the cache.

**Example:**
Cache sequence → A (1st), B (2nd), C (3rd)
When D is added, **A** is evicted.

**Advantages:**

* Simple and easy to implement.

**Disadvantages:**

* Doesn’t consider access frequency or recency.
* May evict important data still in use.

---

### e. **Last In, First Out (LIFO)**

**Concept:**
Removes the **most recently added** item first.

**Logic:**
Assumes that the latest item added might be least needed next.

**Example:**
Cache sequence → A, B, C
When D is added, **C** (last added) is evicted.

**Advantages:**

* Simple and fast implementation.

**Disadvantages:**

* Rarely suitable for real-world caching needs.
* May frequently evict useful data.

---

### f. **Random Replacement (RR)**

**Concept:**
Removes a **random item** when space is needed.

**Logic:**
No access or frequency tracking — purely random eviction.

**Example:**
Cache has [A, B, C]; when D arrives, one of A/B/C is evicted at random.

**Advantages:**

* Extremely simple and low overhead.
* Can perform well in unpredictable access patterns.

**Disadvantages:**

* May remove valuable items arbitrarily.
* Unreliable for stable performance.

---

## 4. Summary Comparison

| Strategy | Basis of Eviction       | Tracks Frequency? | Tracks Recency? | Common Use Case             |
| -------- | ----------------------- | ----------------- | --------------- | --------------------------- |
| **LRU**  | Least recently accessed | No                | Yes             | Web caches, Redis           |
| **MRU**  | Most recently accessed  | No                | Yes             | Sequential access workloads |
| **LFU**  | Least frequently used   | Yes               | No              | API rate limiting, Redis    |
| **FIFO** | Oldest added            | No                | No              | Simple cache systems        |
| **LIFO** | Most recently added     | No                | No              | Rarely used                 |
| **RR**   | Random item             | No                | No              | Low-overhead systems        |

---

## 5. Key Takeaways

* Eviction is essential for **memory management** in caching systems.
* **LRU** is the most commonly used strategy for general-purpose caching.
* **LFU** is better when **frequency of access** matters more than recency.
* **FIFO** and **RR** are simpler but less efficient for dynamic workloads.
* Choice of policy depends on **access pattern**, **system size**, and **performance goals**.
