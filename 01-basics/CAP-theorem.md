# CAP Theorem in System Design

## What is CAP Theorem?

The **CAP Theorem**, proposed by *Eric Brewer*, states that a **distributed system can only guarantee two** out of the following three properties at the same time:

* **C — Consistency**
* **A — Availability**
* **P — Partition Tolerance**

---

## 🔹 The Three Properties

### 1. **Consistency (C)**

Every read gets the **latest written data** or an **error**.
All nodes in the system show the **same data** at any time.
*Example:* After updating your bank balance, every server should show the new balance immediately.

---

### 2. **Availability (A)**

Every request gets a **response**, even if it’s not the latest data.
The system stays **operational** even when some nodes fail.
*Example:* A social media app still shows older posts instead of going down.

---

### 3. **Partition Tolerance (P)**

The system continues to **work even when there’s a network failure** between nodes.
This is **essential** for all real-world distributed systems.
*Example:* If servers in two regions can’t communicate, both still keep working locally.

---

## The Trade-Off

In a distributed system, **network failures (P)** will happen, so we must choose between:

* **Consistency (C)** or
* **Availability (A)**

| System Type | Guarantees                                                 | Example                      |
| ----------- | ---------------------------------------------------------- | ---------------------------- |
| **CP**      | Consistency + Partition Tolerance                          | HBase, MongoDB (strict mode) |
| **AP**      | Availability + Partition Tolerance                         | Cassandra, DynamoDB          |
| **CA**      | Consistency + Availability *(only if no partitions exist)* | MySQL (single node)          |

---

## Quick Use-Case Examples

| Scenario            | Focus                 | Type   |
| ------------------- | --------------------- | ------ |
| Banking or Payments | Data must be accurate | **CP** |
| Social Media Feed   | Always available      | **AP** |
| DNS System          | High availability     | **AP** |

---

## Summary

| Property                | Meaning                          |
| ----------------------- | -------------------------------- |
| **Consistency**         | All nodes show the same data     |
| **Availability**        | System always responds           |
| **Partition Tolerance** | Works even during network issues |
