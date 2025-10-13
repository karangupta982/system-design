# How Indexing Works in Databases

---

## 1. The Problem Without Index

Imagine a table called `users`:

| id  | name  | email                                   |
| --- | ----- | --------------------------------------- |
| 1   | Karan | [karan@mail.com](mailto:karan@mail.com) |
| 2   | Aditi | [aditi@mail.com](mailto:aditi@mail.com) |
| 3   | Rahul | [rahul@mail.com](mailto:rahul@mail.com) |
| ... | ...   | ...                                     |

If you run:

```sql
SELECT * FROM users WHERE email = 'rahul@mail.com';
```

Without an index, the database must **check every single row** — one by one — until it finds a match.
This is called a **full table scan**.

If your table has **millions of rows**, this is slow.

---

## 2. What an Index Actually Is

An **index** is like a **sorted lookup table** created by the database internally.
It stores the **values of the indexed column** (e.g., `email`) **along with pointers** (addresses) to where the actual data (rows) is stored on disk.

So instead of scanning the entire table, the database can:

1. Look inside the index (which is sorted and smaller).
2. Quickly find the **memory address (pointer)** of the actual row.
3. Jump directly to that data location and fetch it.

This is why we say the database can **“jump directly”** to the data.

---

## 3. Internal Structure — B-Tree Example

Most relational databases (like MySQL, PostgreSQL, Oracle) use a **B-Tree** structure for indexes.

A **B-Tree (Balanced Tree)** keeps keys (like emails) in **sorted order**, and every node can have multiple children — making it efficient for large datasets.

### Simplified Example

```
                    [g, n, t]
                  /    |    \
     [a, c, d, e, f] [h, i, j, k, l, m] [o, p, q, r, s, u, v, w, x, y, z]
```

* Searching for `rahul@mail.com` starts at the root.
* Database compares first letters and follows the correct branch.
* Within a few jumps (O(log n) time), it finds the location of `rahul@mail.com`.
* Each leaf node stores a **pointer** to the actual row in the main table.

This tree structure makes lookup extremely fast even for large tables.

---

## 4. Physical Jump Explained

Let’s say:

* The index says that `rahul@mail.com` is located at **disk block #1894**.
* The database engine directly reads that block from disk — instead of checking all blocks.

This **reduces disk I/O operations**, which is the main reason indexing improves performance.

---

## 5. Analogy

Imagine you’re searching for a word in a dictionary:

* Without an index: you read every word from A to Z.
* With an index: the dictionary is already alphabetically sorted; you directly open the correct page.

Same concept applies inside the database.

---

## 6. Trade-Off

Indexes speed up **reads**, but every **insert, update, or delete** must also **update the index structure**, because it needs to remain sorted.
That’s why write-heavy systems can slow down with too many indexes.

---

## 7. Summary Table

| Action            | Without Index   | With Index                     |
| ----------------- | --------------- | ------------------------------ |
| Searching a row   | Full table scan | Tree traversal to data pointer |
| Time complexity   | O(n)            | O(log n)                       |
| Disk I/O          | High            | Low                            |
| Write performance | Fast            | Slower (index maintenance)     |

---

### **Key Takeaway**

> An index is a **data structure (usually a B-Tree)** that stores **sorted column values and pointers** to the actual table rows, allowing the database to locate data **without scanning the entire table**.
