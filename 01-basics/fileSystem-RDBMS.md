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

# RDBMS Limitations and NoSQL Overview

---

## 1. Why RDBMS Is Not Always Scalable

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


