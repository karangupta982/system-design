# File System and RDBMS

---

## 1. File System

A **file system** is the most basic way to store and organize data on disk (e.g., hard drive, SSD).
It saves data in files and directories, and the operating system manages reading and writing operations.

Example:
Windows uses **NTFS**, Linux uses **ext4**, and macOS uses **APFS**.

---

### 1.1 How Data Is Stored

Data is stored as plain files:

* Each file has a unique path.
* Application code reads and writes directly to files.
* Metadata (size, timestamp, permissions) is stored by the operating system.

Example:

```
/user-data/
 ├── student_101.txt
 ├── student_102.txt
 └── student_103.txt
```

---

### 1.2 Problems with File Systems

| Problem                  | Explanation                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------- |
| **Data Redundancy**      | The same data can exist in multiple files, leading to duplication.                      |
| **Inconsistency**        | If one copy of data is updated but others are not, it causes mismatched records.        |
| **No Relationships**     | Cannot establish relations between different sets of data (e.g., students and courses). |
| **Difficult Querying**   | Searching requires custom code; no query language like SQL.                             |
| **Security Issues**      | File-level permissions only; no fine-grained access control.                            |
| **Concurrency Problems** | Multiple users writing to the same file may cause corruption.                           |
| **Scalability**          | Hard to scale or share across systems efficiently.                                      |

In short, **file systems** work well for **simple storage** but not for **structured, relational, or concurrent access**.

---


## 2. RDBMS (Relational Database Management System)

An **RDBMS** is a structured system for storing and managing data using **tables, relations, and SQL**.

Examples: **MySQL, PostgreSQL, Oracle, SQL Server**

---

### 2.1 Core Features

* **Structured Data** — stored in tables with rows and columns.
* **Schema Enforcement** — defines structure, data types, and constraints.
* **Relationships** — data linked using **foreign keys**.
* **SQL Queries** — used to query, filter, and manipulate data.
* **Transactions** — ensures **ACID** properties:

  * **Atomicity** — all or nothing
  * **Consistency** — valid state transitions
  * **Isolation** — concurrent transactions don’t interfere
  * **Durability** — once committed, data persists

---

### 2.2 Advantages of RDBMS

| Advantage               | Explanation                                                 |
| ----------------------- | ----------------------------------------------------------- |
| **Data Integrity**      | Enforces constraints to keep data valid.                    |
| **Consistency**         | Transactions ensure reliable state.                         |
| **Easy Querying**       | SQL provides a powerful, standard query language.           |
| **Relationships**       | Foreign keys link tables easily (e.g., students ↔ courses). |
| **Security**            | User roles, privileges, and authentication built in.        |
| **Concurrency Control** | Multiple users can safely read/write simultaneously.        |
| **Backup and Recovery** | Built-in support for data recovery and replication.         |

---

### 2.3 Disadvantages of RDBMS

| Disadvantage                   | Explanation                                            |
| ------------------------------ | ------------------------------------------------------ |
| **Scalability Limits**         | Hard to scale horizontally across multiple servers.    |
| **Rigid Schema**               | Schema changes require migrations.                     |
| **High Resource Overhead**     | Joins and transactions can be slow for large datasets. |
| **Complex Setup**              | Requires configuration and tuning for performance.     |
| **Poor for Unstructured Data** | Not suitable for JSON, multimedia, or logs.            |

---

## 2.3.1. Why RDBMS Is Not Always Scalable

### a. **Vertical Scaling Limitation**

RDBMS databases like **MySQL** or **PostgreSQL** are built around a **single-server architecture** — the data, indexes, and transactions are all handled by one machine.

To improve performance, you usually:

* Increase CPU power,
* Add more RAM,
* Use faster storage (SSD).

This is called **vertical scaling** (scaling up).
However, it eventually **reaches a physical limit** — there’s only so much you can add to one server.

When traffic or data grows beyond that limit:

* The single server becomes a **bottleneck**.
* Scaling out (horizontally, by adding more servers) is **very hard**, because:
  * Data is interdependent across tables (joins, transactions).
  * RDBMS needs to maintain strict **ACID consistency** across all nodes.
  * Coordinating transactions between multiple servers introduces **latency** and **complexity**.

So, RDBMS works best for **moderate-sized systems** but struggles at **internet scale**.

---

### b. **Complex Setup and Maintenance**

RDBMS systems are **heavy** — they require configuration for:

* **Indexing strategies** (to make queries fast)
* **Normalization** (to avoid data duplication)
* **Query optimization**
* **Backup and recovery**
* **Replication and clustering**

Database administrators (DBAs) must constantly:

* Tune queries for performance.
* Monitor transaction logs and locks.
* Manage schema migrations.

This makes setup and ongoing maintenance **complex** and **time-consuming**, especially when scaling or deploying in distributed environments.

In contrast, many NoSQL systems are designed for **plug-and-play horizontal scaling** with simpler configuration.

---

### c. **Poor Handling of Unstructured Data**

RDBMS expects **structured data** that fits neatly into tables and columns.

Example:

| id | name  | age |
| -- | ----- | --- |
| 1  | Alice | 25  |
| 2  | Bob   | 30  |

But in modern systems, we often deal with:

* JSON data (dynamic fields)
* Images, videos, or documents
* Logs and sensor data
* Rapidly changing or inconsistent fields

In such cases:

* Every schema change (like adding a new field) requires **migrations**.
* Binary data must be stored separately (like in file systems or object storage).
* Querying flexible or nested data (e.g., user preferences or arrays) becomes complex.

Hence, RDBMS struggles with **semi-structured or unstructured data**, making it less suitable for flexible, large-scale, real-time systems.

---

### 2.4 Use Cases of RDBMS

* Banking systems (transactional consistency)
* E-commerce orders and inventory
* Employee or student management systems
* Any application requiring strong consistency and relationships

---

## 3. Transition to Modern Systems

As systems grew larger and distributed, traditional RDBMS began to face challenges:

* Scaling horizontally across servers.
* Handling unstructured or semi-structured data.
* Supporting high write volumes (like in social networks).

This led to the rise of **NoSQL databases**.

---

## 4. NoSQL Databases (Extension Topic)

**NoSQL** databases are designed for **scalability, flexibility, and high performance**.
They don’t rely on strict table structures or fixed schemas.

* **Horizontal scalability** — easily add more machines.
* **Flexible schema** — no fixed table structure.
* **High write/read throughput** — optimized for distributed data access.
* **Eventual consistency** — allows some delay in synchronization to improve speed and availability.

Examples: **MongoDB, Cassandra, Redis, DynamoDB**

---

### 4.1 NoSQL Types

NoSQL isn’t a single type of database — it’s a category.
Different NoSQL databases are designed for different use cases.

---

| Type                | Structure               | Example Use      |
| ------------------- | ----------------------- | ---------------- |
| **Document Store**  | JSON-like documents     | MongoDB          |
| **Key-Value Store** | Key-value pairs         | Redis, DynamoDB  |
| **Column Store**    | Columns instead of rows | Cassandra, HBase |
| **Graph Store**     | Nodes and relationships | Neo4j            |


### a. **Document Databases**

* Store data as **documents**, usually in **JSON** or **BSON** format.
* Each document can have a **different structure** — flexible schema.
* Ideal for applications with **dynamic fields** or **nested data**.

**Example:**

```json
{
  "userId": 1,
  "name": "Alice",
  "address": {
    "city": "Delhi",
    "pincode": 110001
  },
  "preferences": ["music", "movies"]
}
```

**Popular Databases:** MongoDB, CouchDB

**Use Case:** Content management systems, user profiles, configuration data.

---

### b. **Key-Value Stores**

* Simplest form of NoSQL.
* Data is stored as a **key** (unique identifier) and a **value** (data blob).
* Extremely fast — used for caching and quick lookups.

**Example:**

```
"session_123": { "userId": 45, "status": "active" }
```

**Popular Databases:** Redis, DynamoDB, Riak

**Use Case:** Caching, session management, leaderboards.

---

### c. **Column-Oriented Databases**

* Data stored by **columns** instead of rows.
* Each column family holds related data together.
* Great for **analytical queries** across huge datasets.

**Popular Databases:** Apache Cassandra, HBase

**Use Case:** Analytics platforms, event logging, time-series data.

---

### d. **Graph Databases**

* Designed for **relationships** between entities (nodes and edges).
* Each node represents an object, and edges define relationships.
* Efficient for traversing complex connections.

**Example:**

```
(Alice) --[FRIEND_OF]--> (Bob)
(Bob) --[WORKS_AT]--> (CompanyX)
```

**Popular Databases:** Neo4j, Amazon Neptune

**Use Case:** Social networks, recommendation engines, fraud detection.

---

## 4. RDBMS vs NoSQL Summary

| Feature            | RDBMS                       | NoSQL                                       |
| ------------------ | --------------------------- | ------------------------------------------- |
| **Data Model**     | Tables (rows & columns)     | Documents, Key-Value, Graph, Columns        |
| **Schema**         | Fixed, predefined           | Flexible, dynamic                           |
| **Scaling**        | Vertical (scale up)         | Horizontal (scale out)                      |
| **Transactions**   | ACID                        | BASE (eventual consistency)                 |
| **Query Language** | SQL                         | Custom APIs / Query languages               |
| **Best For**       | Structured, relational data | Large-scale, unstructured, distributed data |
| **Examples**       | MySQL, PostgreSQL           | MongoDB, Redis, Cassandra, Neo4j            |

---

## 5. Key Takeaways

* RDBMS systems are **reliable and consistent** but struggle with **scalability and flexibility**.
* NoSQL databases trade strict consistency for **speed and scalability**.
* **Document and key-value stores** are most commonly used in scalable web applications.
* Many modern systems use a **hybrid approach**:

  * RDBMS for transactions (payments, orders)
  * NoSQL for scalability (sessions, analytics, logs)

---

### 4.2 Why NoSQL Emerged

| Limitation of RDBMS            | NoSQL Solution                     |
| ------------------------------ | ---------------------------------- |
| Hard to scale horizontally     | Built for distributed systems      |
| Fixed schema                   | Flexible, dynamic structure        |
| Expensive joins                | Embedded or denormalized documents |
| Slower for massive write loads | Optimized for high throughput      |

---

### 4.3 When to Use NoSQL

* Massive data volumes (Big Data systems)
* High read/write throughput (social media, logs)
* Flexible schema requirements (dynamic data)
* Event-driven or distributed architectures

---

## 5. Summary Comparison

| Feature               | File System         | RDBMS           | NoSQL                            |
| --------------------- | ------------------- | --------------- | -------------------------------- |
| **Data Organization** | Files & directories | Tables          | Documents, Key-Value, etc.       |
| **Query Language**    | None                | SQL             | Varies                           |
| **Relationships**     | None                | Supported       | Limited or custom                |
| **Scalability**       | Low                 | Moderate        | High                             |
| **Consistency**       | Manual              | Strong (ACID)   | Tunable (eventual)               |
| **Schema**            | None                | Fixed           | Flexible                         |
| **Use Case**          | Simple data storage | Structured data | High scalability and flexibility |

---

## 6. Key Takeaways

* **File Systems** are good for raw storage but lack structure and consistency.
* **RDBMS** ensures integrity and consistency but struggles with large distributed workloads.
* **NoSQL** provides flexibility and scalability, sacrificing some relational features.
* Modern architectures often **combine** these:

  * File systems for media storage.
  * RDBMS for core transactions.
  * NoSQL for scalable analytics or caching.

---

# Database Scaling: Replication, Partitioning, and Sharding

## 1. Replication

### Concept

Replication means **copying data** from one database server (primary) to one or more **replica servers**.

### Types

* **Master–Slave (Primary–Replica):**

  * All writes go to the master.
  * Reads can be distributed to replicas.
* **Master–Master:**

  * Multiple nodes can accept writes and replicate changes between each other.

### Benefits

* Improves **read scalability** (read-heavy systems).
* Provides **high availability** — if master fails, replica can take over.
* Useful for **disaster recovery** and **backup**.

### Challenges

* **Replication lag:** data delay between master and replicas.
* **Conflict resolution:** difficult in master–master setups.
* Increases **storage and synchronization costs**.

---

## 2. Partitioning

### Concept

Partitioning divides a **single large table** into **smaller logical parts** called partitions, but all partitions are still in the **same database instance**.

### Types

* **Horizontal Partitioning:** divide rows based on criteria (e.g., user ID range).
* **Vertical Partitioning:** divide columns into groups (e.g., move large text columns separately).
* **Range/Hash/List Partitioning:** based on specific rules or functions.

### Benefits

* Improves **query performance** — only relevant partition is scanned.
* Makes **maintenance easier** (e.g., archiving old data).
* Reduces **index size**, speeding up searches.

### Limitations

* Still **limited by single server’s capacity**.
* Requires **manual partition key design** and maintenance.

---

## 3. Sharding

### Concept

Sharding is **horizontal partitioning across multiple servers** (databases).
Each shard is an **independent database** that holds a subset of the data.

### Example

* Shard 1 → users 1–10,000
* Shard 2 → users 10,001–20,000
* Shard 3 → users 20,001–30,000

### Benefits

* Enables **true horizontal scaling** — add more servers as data grows.
* Reduces **load per server** and increases throughput.
* Each shard can be replicated for fault tolerance.

### Challenges

* **Complexity in query routing** — application must know which shard to query.
* **Rebalancing data** when adding new shards.
* **Cross-shard queries and joins** are difficult.
* Increased **operational overhead** (monitoring, backups, etc.).

---

## Summary Table

| Technique    | Level          | Goal                           | Scaling Type                      | Key Benefit              | Limitation         |
| ------------ | -------------- | ------------------------------ | --------------------------------- | ------------------------ | ------------------ |
| Replication  | Copy           | Reliability & Read Scalability | Horizontal (Read)                 | High Availability        | Consistency lag    |
| Partitioning | Logical Split  | Manageability                  | Vertical/Horizontal (Single Node) | Query Efficiency         | Still single-node  |
| Sharding     | Physical Split | Scalability                    | Horizontal (Multi-Node)           | True Distributed Scaling | Complex management |


