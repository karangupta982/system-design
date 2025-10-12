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
