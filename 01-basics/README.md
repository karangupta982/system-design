# 01 - Basics

This section covers the core fundamentals of system design.
Each file explains an essential concept that helps build the foundation for designing scalable, reliable, and efficient distributed systems.

These topics introduce key trade-offs, system properties, and architectural principles used in real-world design discussions.

---

## Topics Covered

| File                                 | Description                                                                                                      |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **CAP-theorem.md**                   | Explains Consistency, Availability, and Partition Tolerance in distributed systems and their trade-offs.         |
| **RPC-communicating-services.md**    | Covers Remote Procedure Call and how services communicate over the network.                                      |
| **architecture.md**                  | Overview of distributed system architecture and its components.                                                  |
| **authentication.md**                | Describes different authentication mechanisms such as Basic Authentication, Token-based Authentication, and JWT. |
| **availability-vs-consistency.md**   | Comparison of availability and consistency, and when to prioritize each.                                         |
| **caching.md**                       | Explains caching strategies, cache invalidation, and techniques to improve response time.                        |
| **communication.md**                 | Covers client-server communication models, protocols, and message exchange patterns.                             |
| **fileSystem-RDBMS.md**              | Discusses scalability limitations of RDBMS and the role of file systems in distributed data management.          |
| **indexing.md**                      | Explains database indexing, how it speeds up queries, and trade-offs involved.                                   |
| **lamport-vector-clocks.md**         | Describes logical clocks for maintaining event order in distributed systems.                                     |
| **latency-vs-throughput.md**         | Defines latency and throughput and explains how they impact system performance.                                  |
| **load-balancing.md**                | Covers strategies for distributing requests evenly across servers.                                               |
| **normalization-denormalization.md** | Explains data normalization and denormalization for performance optimization.                                    |
| **polyglot-persistence.md**          | Describes using different databases for different types of data and workloads.                                   |
| **proxy-server.md**                  | Explains proxy, forward proxy, and reverse proxy concepts.                                                       |
| **replication-vs-sharding.md**       | Compares replication and sharding and their impact on scalability.                                               |
| **scalability.md**                   | Introduces horizontal and vertical scaling and how to design scalable systems.                                   |
| **synchronous-asynchronous.md**      | Differentiates between synchronous and asynchronous communication.                                               |
| **webserver-ssl-tls.md**             | Explains how SSL/TLS secures web servers and client communication.                                               |

---

## How to Study

1. Start with scalability, latency, and throughput to understand performance fundamentals.
2. Move to CAP theorem, replication, and sharding to learn distributed trade-offs.
3. Study communication, proxies, and load balancing for network-level understanding.
4. Explore caching, indexing, and polyglot persistence for data optimization.
5. Finish with security and authentication topics.

---

## Next Step

After completing this folder, proceed to `02-components/`, where you will learn and implement system components such as API Gateways, Message Queues, Content Delivery Networks, and Rate Limiting.
