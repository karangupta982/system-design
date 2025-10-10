# Availability in System Design

---

## 1. What Is Availability?

**Availability** is the measure of how often a system is **operational and accessible** when required.

It represents the **percentage of time** a system is up and running without failures.

### Formula

```
Availability (%) = (Uptime / (Uptime + Downtime)) × 100
```

### Example

If a server is down for 1 hour in a month (720 hours):

```
Availability = (719 / 720) × 100 = 99.86%
```

High availability means the system continues to work **even when some components fail**.

---

## 2. Measuring Availability — “Nines of Availability”

| Availability          | Downtime per Year | Description             |
| --------------------- | ----------------- | ----------------------- |
| **99%**               | ~3.65 days        | Basic SLA               |
| **99.9% (Three 9s)**  | ~8.76 hours       | Good uptime             |
| **99.99% (Four 9s)**  | ~52.6 minutes     | High availability       |
| **99.999% (Five 9s)** | ~5.26 minutes     | Mission-critical        |
| **99.9999% (Six 9s)** | ~31.5 seconds     | Ultra-high availability |

More “nines” = higher reliability, but **cost increases exponentially**.

---

## 3. Availability in Monolithic Architecture

### 3.1. Characteristics

* The **entire application** runs as a single unit (one process, one deployment).
* A **single point of failure** can bring down the whole system.

### 3.2. Availability Behavior

* **Simpler to deploy**, but **lower fault tolerance**.
* If one component (e.g., database connection, API) fails → entire system is unavailable.
* Scaling is harder → maintenance often requires **downtime**.

### 3.3. Example

```
Frontend + Backend + DB (all in one server)
```

If that server crashes, **entire application is down**.

---

## 4. Availability in Distributed Architecture

### 4.1. Characteristics

* System divided into **multiple services** or nodes.
* Designed for **fault isolation** — if one service fails, others continue running.

### 4.2. Availability Behavior

* **Higher availability** due to redundancy, replication, and load balancing.
* **Partial failures** tolerated — e.g., if a recommendation service fails, user login still works.
* Maintenance can happen **without downtime** (rolling deployments).
* If one system fails then the replica can handle the load.

### 4.3. Example

```
Load Balancer → Service A → Service B → Database Cluster
```

If one node fails, the load balancer routes traffic to healthy ones.

---

## 5. Fault Tolerance and Availability

### 5.1. Definition

**Fault tolerance** is a system’s ability to continue functioning **despite component failures**.

### 5.2. Relationship

> **Fault Tolerance ∝ Availability**

They are **directly proportional** —
a more fault-tolerant system is naturally more available.

| Fault Tolerance                                   | Availability        |
| ------------------------------------------------- | ------------------- |
| No fault tolerance → Single failure = full outage | Low availability    |
| Some fault tolerance → Partial failures tolerated | Medium availability |
| High fault tolerance → Self-healing and failover  | High availability   |

### 5.3. Example

* Without fault tolerance: 1 database = if DB crashes, system down.
* With fault tolerance: 1 primary + 1 replica = if primary fails, replica takes over → uptime maintained.

---

## 6. How to Increase Availability

### 6.1. Architectural Strategies

* **Redundancy**
  Deploy multiple servers/services so if one fails, others continue.
* **Load Balancing**
  Distribute requests across multiple healthy instances.
* **Failover Systems**
  Automatically switch to standby components during failure.
* **Auto-Scaling**
  Spin up new instances when load increases to avoid overload.

---

### 6.2. Data and Storage

* **Replication**
  Duplicate data across multiple servers (read replicas, multi-AZ databases).
* **Backups**
  Regular backups ensure data recovery in case of disaster.
* **Distributed Databases**
  Use systems like Cassandra, MongoDB, or CockroachDB that replicate data automatically.

---

### 6.3. Network and Deployment

* **Multi-Zone or Multi-Region Deployment**
  Deploy instances across different availability zones or regions.
* **Health Checks and Monitoring**
  Use automated monitoring to detect and replace unhealthy nodes.
* **Blue-Green / Rolling Deployments**
  Deploy updates without downtime by switching traffic between environments.

---

### 6.4. Code and Application Design

* Implement **graceful degradation** — the system still works partially when some features fail.
* Use **retry mechanisms** and **circuit breakers** for transient network issues.
* **Timeouts and rate limits** to prevent cascading failures.

---

## 7. Redundancy vs Replication

| Concept         | Definition                                                                            | Purpose                                     | Example                          |
| --------------- | ------------------------------------------------------------------------------------- | ------------------------------------------- | -------------------------------- |
| **Redundancy**  | Having **extra components** (servers, power, network) to take over in case of failure | Ensures system availability                 | 2 load balancers active-active   |
| **Replication** | Having **multiple copies of data or services** across nodes                           | Ensures data reliability and fault recovery | 3 database replicas across zones |

### Key Difference

* **Redundancy = Backup Components** (No link present)
* **Replication = Backup Data** (link is present between replica's, like in database server replication is done since the replica's should be synchronized)

They often work **together**:

> Redundant servers + Replicated data = Highly available system

---

## 8. Example — High Availability Architecture

```
                +-----------------------------+
                |         Load Balancer       |
                +-------------+---------------+
                              |
             +----------------+----------------+
             |                                 |
   +---------v---------+             +---------v---------+
   |   App Server 1    |             |   App Server 2    |
   +---------+----------+             +---------+----------+
             |                                 |
      +------v------+                   +------v------+
      |   DB Primary |  <-- Replication -->  |   DB Replica |
      +--------------+                   +---------------+
```

✅ If one app server fails → traffic routed to the other.
✅ If primary DB fails → replica promoted automatically.
→ System stays available.

---

## 9. Summary

| Aspect                      | Monolithic             | Distributed                 |
| --------------------------- | ---------------------- | --------------------------- |
| **Single Point of Failure** | Yes                    | Reduced                     |
| **Scaling**                 | Hard (downtime needed) | Easier (horizontal scaling) |
| **Fault Tolerance**         | Low                    | High                        |
| **Availability**            | Moderate               | High                        |
| **Example**                 | One app & DB server    | Multi-service, multi-region |

---

## 10. Key Takeaways

* **Availability** = Percentage of time system is operational.
* **Monolithic** systems have lower availability due to tight coupling.
* **Distributed** systems achieve high availability through redundancy and replication.
* **Fault tolerance directly increases availability**.
* **Redundancy** prevents component failure impact, **Replication** protects data loss.
* Always design with **no single point of failure** and enable **automatic recovery**.

---

# Consistency in System Design

---

## 1. What Is Consistency?

**Consistency** ensures that every read reflects the latest write.
In simple terms, all users see the same and most recent data across the system.

Example:
If you transfer ₹1,000 from Account A to Account B, both accounts should reflect the new balances immediately.
If one still shows the old value, the system is inconsistent.

---

## 2. Consistency in Monolithic Systems

### 2.1. Architecture Context

In a **monolithic system**, all components (business logic, database, and APIs) run within a single process and typically share one central database.

### 2.2. Characteristics

* A single database guarantees **ACID** (Atomicity, Consistency, Isolation, Durability).
* All reads and writes go through the same data source.
* Changes are immediately visible to every part of the system.

### 2.3. Result

* **Strong consistency** by default.
* Simple to implement since there’s no data replication or distributed state.

### 2.4. Example

If one service updates user data, every subsequent read will return the updated record immediately because there is only **one source of truth**.

---

## 3. Consistency in Distributed Systems

### 3.1. Architecture Context

In a **distributed system**, data is replicated across multiple nodes or services for fault tolerance, scalability, and performance.

This replication introduces **latency and synchronization delays**, leading to potential inconsistency between replicas.

### 3.2. Types of Consistency in Distributed Systems

| Type                     | Description                                                      | Example                    |
| ------------------------ | ---------------------------------------------------------------- | -------------------------- |
| **Strong Consistency**   | All replicas reflect the latest data before confirming success.  | Relational databases, etcd |
| **Eventual Consistency** | Replicas synchronize over time; temporary inconsistency allowed. | DynamoDB, Cassandra        |
| **Causal Consistency**   | Operations with causal relationships appear in the same order.   | Chat applications          |
| **Session Consistency**  | A user always sees their own latest updates within a session.    | User profile edits         |

### 3.3. Behavior

When a write occurs:

1. The system updates one node.
2. The update propagates to other replicas asynchronously or synchronously.
3. During propagation, different nodes might temporarily return different data — leading to **eventual consistency**.

---

## 4. Availability vs Consistency (CAP Perspective)

In distributed systems, during a **network partition**, the system must choose between:

* **Consistency (C):** Return correct data, even if it means some requests fail or wait.
* **Availability (A):** Always respond, even if some data may be outdated.

Example:

* A banking system prioritizes **consistency** (better to reject than show wrong balance).
* A social feed prioritizes **availability** (slightly stale likes count is acceptable).

---

## 5. Factors Affecting Consistency

| Factor                           | Impact                     | Explanation                                                                       |
| -------------------------------- | -------------------------- | --------------------------------------------------------------------------------- |
| **Replication Delay**            | Reduces consistency        | Slower synchronization between replicas leads to temporary data mismatch          |
| **Network Latency**              | Reduces consistency        | Slow communication can delay updates reaching all nodes                           |
| **Concurrency**                  | Reduces consistency        | Multiple concurrent writes can cause conflicts                                    |
| **Failure Recovery**             | Reduces consistency        | When failed nodes rejoin, they may have stale data until synchronized             |
| **Replication Method**           | Affects consistency        | Synchronous replication → strong consistency; asynchronous → eventual consistency |
| **Data Partitioning (Sharding)** | Affects global consistency | Updates to one shard may not be visible to another immediately                    |

---

## 6. Measures to Improve Consistency

| Strategy                               | Description                                                 | Benefit                                 |
| -------------------------------------- | ----------------------------------------------------------- | --------------------------------------- |
| **Synchronous Replication**            | Write is acknowledged only after all replicas are updated   | Ensures strong consistency              |
| **Leader-Follower Architecture**       | One node handles writes, others replicate                   | Prevents write conflicts                |
| **Quorum Consensus**                   | Require a majority of replicas to confirm a read/write      | Balances consistency and availability   |
| **Versioning and Conflict Resolution** | Use vector clocks or timestamps to handle concurrent writes | Avoids data conflicts                   |
| **Read Repair**                        | Fix inconsistent replicas during read operations            | Improves eventual consistency over time |
| **Monitoring and Alerts**              | Detect delayed replication or stale data                    | Helps maintain operational consistency  |

---

## 7. Summary Table

| Aspect               | Monolithic                     | Distributed                                       |
| -------------------- | ------------------------------ | ------------------------------------------------- |
| **Architecture**     | Single system, single database | Multiple systems, replicated data                 |
| **Consistency Type** | Strong (ACID)                  | Strong or Eventual (CAP trade-off)                |
| **Replication**      | Not required                   | Required across nodes                             |
| **Latency**          | Low                            | May vary due to synchronization                   |
| **Fault Tolerance**  | Limited                        | High                                              |
| **Complexity**       | Low                            | High                                              |
| **Example**          | Single database web app        | Global distributed database (DynamoDB, Cassandra) |

---

## 8. Key Takeaways

* **Consistency** ensures data accuracy across components or nodes.
* **Monolithic systems** are naturally consistent due to shared state and single database.
* **Distributed systems** must balance consistency and availability (CAP theorem).
* **Strong consistency** guarantees correctness but can reduce availability.
* **Eventual consistency** improves scalability and fault tolerance but may show stale data.
* **Improving consistency** involves replication strategies, quorum mechanisms, and synchronization control.

---

# CAP Theorem

---

## 1. What Is the CAP Theorem?

The **CAP Theorem**, proposed by **Eric Brewer**, states that a distributed system can provide **only two** of the following three guarantees **at the same time**:

1. **Consistency (C)** – Every node sees the same data at the same time.
2. **Availability (A)** – Every request gets a response, even if some nodes fail.
3. **Partition Tolerance (P)** – The system continues to operate even if network communication between nodes is lost. If any distributed system, any system get down then replica should take over the load to make the system fault tolerance. It is must to have in any system to don't let the system down.

A distributed system must **tolerate partitions**, so in practice, it must choose between **Consistency** and **Availability** when a partition occurs.

---

## 2. Understanding the Three Properties

### 2.1. Consistency (C)

All nodes in the system return the **same and most recent data**.
If one node updates data, all others must immediately reflect that change before any read occurs.

**Example:**
If you update your profile picture, every server (region) shows the new picture instantly.
While making transaction data changes should be shown instantly. In trading systems stock price should be shown accurately without any delay.

### 

### 2.2. Availability (A)

Every request to a non-failing node receives a valid response — success or failure — without guaranteeing that the data is the latest version.

**Example:**
If one replica is down, the system still serves requests using another replica, even if it has slightly old data.

### 2.3. Partition Tolerance (P)

The system continues functioning **despite network failures** or message delays between nodes.

**Example:**
If the link between two data centers breaks, both should still work independently without complete shutdown.

---

## 3. The Trade-Off: Choosing Two

A distributed system **cannot** provide **all three** guarantees simultaneously during a network partition.

| Combination                                 | Description                                                                                                 | Example                                              |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **CP (Consistency + Partition Tolerance)**  | System prioritizes data accuracy over uptime. It may reject requests during a partition to stay consistent. | Relational Databases, MongoDB (with majority writes) |
| **AP (Availability + Partition Tolerance)** | System stays online even if some data is temporarily inconsistent.                                          | DynamoDB, Cassandra                                  |
| **CA (Consistency + Availability)**         | Works only when there are **no partitions** — possible in single-node or monolithic systems.                | Single-node SQL Database                             |

---

## 4. CAP in Different Architectures

### 4.1. Monolithic Systems (CA)

* Usually run on a **single server** with one database.
* Network partitions do not occur because all components are local.
* Provide both **Consistency and Availability**.
* However, not **Partition Tolerant** — a single failure causes downtime.

**Example:**
A local inventory system using MySQL on one machine.

### 4.2. Distributed Systems (CP or AP)

* Multiple nodes or services communicate over a network.
* Network partitions are inevitable.
* The system must **sacrifice either availability or consistency**.

**Example:**

* **Banking systems:** Choose **CP** (accuracy > uptime).
* **Social media feeds:** Choose **AP** (availability > strict consistency).

---

## 5. Visual Representation

```
          +------------------+
          |   Consistency    |
          +--------+---------+
                   | 
          +--------+---------+
          |  Partition Tolerance |
          +--------+---------+
                   |
          +--------+---------+
          |     Availability   |
          +--------------------+
```

A system can sit on **one side of this triangle** but not in the middle — it cannot have all three simultaneously.

---

## 6. Examples of Real Systems

| System                        | Category | Explanation                                                    |
| ----------------------------- | -------- | -------------------------------------------------------------- |
| **MongoDB (Majority Writes)** | CP       | Prioritizes data correctness; rejects writes during partitions |
| **Cassandra**                 | AP       | Stays available by serving from reachable replicas             |
| **DynamoDB**                  | AP       | Ensures low latency and availability; eventually consistent    |
| **HBase**                     | CP       | Trades availability for strict consistency                     |
| **Zookeeper / etcd**          | CP       | Coordination systems, require consistency                      |
| **Redis (Standalone)**        | CA       | Consistent and available only when no partition occurs         |

---

## 7. CAP in Practice

In real-world systems, **network partitions are inevitable**, so the choice is effectively between **CP** and **AP**.

| Choice         | When to Prefer                                 | Behavior During Partition                           |
| -------------- | ---------------------------------------------- | --------------------------------------------------- |
| **CP Systems** | When correctness is more important than uptime | Reject or delay requests until data is synchronized |
| **AP Systems** | When uptime and responsiveness matter more     | Serve available data, even if slightly stale        |

---

## 8. Relationship with Consistency Models

* **Strong consistency** → CP systems
* **Eventual consistency** → AP systems

Some databases offer **tunable consistency**, allowing developers to choose between strong and eventual behavior per operation.

Example (Cassandra, DynamoDB):

* `QUORUM` reads/writes → More consistency.
* `ONE` read/write → More availability.

---

## 9. Key Insights

* **CAP theorem applies only during network partitions** — when all nodes are reachable, systems can appear CA.
* **Partition tolerance is mandatory** for distributed systems.
* The **trade-off** between consistency and availability depends on system goals:

  * Financial systems → Consistency.
  * User-facing, high-traffic systems → Availability.
* Many modern systems use **hybrid or tunable consistency** to balance both.

---

## 10. Summary

| Aspect              | Consistency (C)                                 | Availability (A)              | Partition Tolerance (P)                   |
| ------------------- | ----------------------------------------------- | ----------------------------- | ----------------------------------------- |
| Definition          | All nodes show the same data                    | Every request gets a response | System works even during network failures |
| Typical Trade-Off   | Accuracy vs Uptime                              |                               |                                           |
| Example Systems     | CP: MongoDB, HBase <br> AP: Cassandra, DynamoDB |                               |                                           |
| Monolithic Systems  | CA (no partitions)                              |                               |                                           |
| Distributed Systems | Must choose CP or AP                            |                               |                                           |

---

## 11. Key Takeaways

* **CAP Theorem**: A distributed system can have only two of Consistency, Availability, and Partition Tolerance.
* **Monolithic systems** are CA (no partitions).
* **Distributed systems** must be either **CP** (consistent but less available) or **AP** (available but may show stale data).
* Choice depends on system requirements:

  * **CP** for accuracy-critical systems.
  * **AP** for high-traffic, fault-tolerant systems.
* **Partition tolerance** is essential — networks always fail eventually.
