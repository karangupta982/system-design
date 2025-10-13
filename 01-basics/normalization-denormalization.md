# Normalization and Denormalization

---

## 1. Overview

In relational database design, **normalization** and **denormalization** are two opposing approaches to structuring data.

* **Normalization**: Organize data to reduce redundancy and ensure consistency.
* **Denormalization**: Combine related data to improve read performance, even if it introduces redundancy.

The choice between them depends on **read vs write performance trade-offs**.

---

## 2. Normalization

### Definition

**Normalization** is the process of **structuring a database** so that:

* Each piece of information is stored only once.
* Relationships between tables are defined using **foreign keys**.
* Data redundancy is minimized.

### Goal

* Eliminate duplication.
* Ensure data integrity and consistency.
* Simplify updates and maintenance.

### Example

**Before Normalization (Single Table):**

| OrderID | CustomerName | CustomerEmail                           | Product | Price |
| ------- | ------------ | --------------------------------------- | ------- | ----- |
| 1       | Alice        | [alice@mail.com](mailto:alice@mail.com) | Laptop  | 1000  |
| 2       | Alice        | [alice@mail.com](mailto:alice@mail.com) | Mouse   | 50    |

Here, **customer data is repeated**.

**After Normalization (Two Tables):**

**Customers**

| CustomerID | Name  | Email                                   |
| ---------- | ----- | --------------------------------------- |
| 1          | Alice | [alice@mail.com](mailto:alice@mail.com) |

**Orders**

| OrderID | CustomerID | Product | Price |
| ------- | ---------- | ------- | ----- |
| 1       | 1          | Laptop  | 1000  |
| 2       | 1          | Mouse   | 50    |

Now, customer data is stored only once and referenced using `CustomerID`.

---

### Advantages

* **Less redundancy** — saves storage and prevents anomalies.
* **Data integrity** — updates in one place reflect everywhere.
* **Smaller tables** — faster writes and updates.

### Disadvantages

* **More joins** — queries may require multiple joins, increasing read latency.
* **Complex queries** — harder to query or aggregate data.

---

## 3. Denormalization

### Definition

**Denormalization** is the process of **combining normalized tables** to reduce the number of joins and improve read performance.

It intentionally **adds redundancy** for faster reads.

### Goal

* Optimize read-heavy workloads.
* Reduce complex joins.
* Improve query performance.

### Example

**Normalized (Two Tables):**

* `Customers` table
* `Orders` table

**Denormalized (Single Table):**

| OrderID | CustomerName | Email                                   | Product | Price |
| ------- | ------------ | --------------------------------------- | ------- | ----- |
| 1       | Alice        | [alice@mail.com](mailto:alice@mail.com) | Laptop  | 1000  |
| 2       | Alice        | [alice@mail.com](mailto:alice@mail.com) | Mouse   | 50    |

Data is duplicated, but it’s faster to read since no join is needed.

---

### Advantages

* **Faster reads** — no joins, less CPU overhead.
* **Simpler queries** — ideal for analytics and caching.
* **Better performance** in distributed systems or data warehouses.

### Disadvantages

* **Redundancy** — more storage used.
* **Inconsistency risk** — same data might differ across records.
* **Complex updates** — must update multiple rows when data changes.

---

## 4. When to Use

| Situation                        | Recommended Approach                   |
| -------------------------------- | -------------------------------------- |
| **Write-heavy workloads**        | Normalization (ensures consistency)    |
| **Read-heavy workloads**         | Denormalization (faster queries)       |
| **Transactional systems (OLTP)** | Normalization                          |
| **Analytical systems (OLAP)**    | Denormalization                        |
| **Microservices (read models)**  | Often denormalized for API performance |

---

## 5. Summary Comparison

| Feature               | Normalization         | Denormalization                  |
| --------------------- | --------------------- | -------------------------------- |
| **Purpose**           | Eliminate redundancy  | Optimize read speed              |
| **Data Duplication**  | Low                   | High                             |
| **Storage Usage**     | Efficient             | Larger                           |
| **Query Complexity**  | Higher (joins)        | Simpler                          |
| **Update Complexity** | Simple                | Harder (must sync copies)        |
| **Best For**          | Transactional systems | Analytical or read-heavy systems |

---

## 6. Key Takeaway

> * **Normalization** focuses on **data integrity and minimal redundancy**.
> * **Denormalization** focuses on **read performance and query simplicity**.
> * Modern systems often use a **hybrid** — normalized core databases with denormalized views, caches, or replicas for faster reads.
