# 03 - Design Patterns

This section covers **architectural and integration design patterns** that form the backbone of large-scale distributed systems.
These patterns define how services communicate, maintain reliability, and handle data consistency.
From this stage, you will not only study the concepts but also **implement practical mini-projects** demonstrating these patterns in real-world scenarios.

---

## Topics Covered

| File                             | Description                                                                                                                                                                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **microservices.md**             | Explains the Microservices architecture pattern where applications are divided into small, independent services. Practical: build a basic microservices system with user and product services communicating via REST or Message Queue. |
| **event-driven-architecture.md** | Covers systems that react to events asynchronously. Practical: use RabbitMQ or Kafka to trigger events and process them in separate services.                                                                                          |
| **pub-sub.md**                   | Describes the Publish-Subscribe model for decoupled communication. Practical: implement a Pub/Sub system using Redis or Kafka topics.                                                                                                  |
| **service-discovery.md**         | Explains how services dynamically locate each other in a distributed environment. Practical: simulate service discovery using Consul, Eureka, or custom service registry.                                                              |
| **circuit-breaker.md**           | Discusses the Circuit Breaker pattern for fault isolation and preventing cascading failures. Practical: implement a simple circuit breaker in Node.js using middleware logic.                                                          |
| **eventual-consistency.md**      | Explains how distributed systems achieve data consistency over time. Practical: simulate eventual consistency using asynchronous data replication.                                                                                     |
| **CQRS.md**                      | Describes the Command Query Responsibility Segregation pattern that separates read and write operations for scalability. Practical: implement a CQRS-based service using separate read/write models.                                   |

---

## Learning Flow

1. Start with **Microservices** to understand distributed application design.
2. Move to **Event-Driven Architecture** and **Pub-Sub** to learn communication mechanisms.
3. Study **Service Discovery** and **Circuit Breaker** to handle reliability and fault tolerance.
4. Conclude with **Eventual Consistency** and **CQRS** for mastering data synchronization and scalability.

---

## Practical Implementation Plan

Each `.md` file should include:

* Concept overview and architecture diagram
* Real-world use cases
* Example system or workflow
* Step-by-step implementation plan
* Observations from testing and scalability experiments

You can use **Node.js**, **Express**, **Kafka/RabbitMQ**, and **Docker** for your practical setups.

---

## Next Step

After mastering these patterns, move to the `04-high-level-designs/` folder.
There, you will apply these principles to design and build complete systems such as URL Shortener, Instagram, and Netflix — combining all the concepts from the previous sections.
