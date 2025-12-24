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

To build a strong foundation in system design basics, follow this logical progression that starts with fundamental concepts and builds up to advanced topics. Each step introduces key principles before diving into trade-offs and implementations.

1. **Start with Core Architecture and Performance Fundamentals**
   - [architecture.md](architecture.md) - Understand the difference between websites and web applications
   - [scalability.md](scalability.md) - Learn vertical vs horizontal scaling
   - [latency-vs-throughput.md](latency-vs-throughput.md) - Master performance metrics and their trade-offs

2. **Explore Communication Patterns**
   - [communication.md](communication.md) - Study client-server communication models (push, pull, polling, WebSockets)
   - [synchronous-asynchronous.md](synchronous-asynchronous.md) - Understand sync vs async communication and consistency models
   - [rest-vs-restapi.md](rest-vs-restapi.md) - Clarify REST concepts vs REST API implementations
   - [rest-soap-grpc.md](rest-soap-grpc.md) - Compare REST, SOAP, and gRPC protocols
   - [RPC-communicating-services.md](RPC-communicating-services.md) - Deep dive into gRPC and service communication

3. **Dive into Data Storage and Management**
   - [fileSystem-RDBMS.md](fileSystem-RDBMS.md) - Learn limitations of file systems vs relational databases
   - [indexing.md](indexing.md) - Understand database indexing for query optimization
   - [normalization-denormalization.md](normalization-denormalization.md) - Master data structuring trade-offs
   - [polyglot-persistence.md](polyglot-persistence.md) - Explore using multiple database types

4. **Master Distributed Systems Trade-offs**
   - [CAP-theorem.md](CAP-theorem.md) - Learn the fundamental CAP theorem
   - [availability-vs-consistency.md](availability-vs-consistency.md) - Deep dive into availability vs consistency
   - [replication-vs-sharding.md](replication-vs-sharding.md) - Understand data distribution strategies
   - [lamport-vector-clocks.md](lamport-vector-clocks.md) - Study logical clocks for event ordering

5. **Implement System Components**
   - [proxy-server.md](proxy-server.md) - Learn forward and reverse proxy concepts
   - [load-balancing.md](load-balancing.md) - Master traffic distribution strategies
   - [caching.md](caching.md) - Explore caching strategies and invalidation

6. **Cover Security and Advanced Topics**
   - [authentication.md](authentication.md) - Study authentication mechanisms
   - [webserver-ssl-tls.md](webserver-ssl-tls.md) - Understand web servers and SSL/TLS security
   - [hybrid-architecture.md](hybrid-architecture.md) - Learn hybrid monolithic/microservices patterns

---

## Next Step

After completing this folder, proceed to `02-components/`, where you will learn and implement system components such as API Gateways, Message Queues, Content Delivery Networks, and Rate Limiting.
