# Hybrid API Gateway Architecture

## 1. Overview

A **Hybrid API Gateway Architecture** combines both **Monolithic** and **Microservices** architectures under a single gateway.
The **API Gateway** acts as a unified entry point for client requests and routes them intelligently to the correct backend — either the monolithic application or individual microservices.

---

## 2. Role of API Gateway

The **API Gateway** is responsible for:

* Routing requests to monolith or microservices.
* Acting as a **load balancer** to distribute incoming traffic.
* Handling **authentication, authorization, rate limiting**, and **logging**.
* Performing **API composition** (aggregating data from multiple services).
* Enabling **service discovery** in microservices environments.

---

## 3. Hybrid Routing Logic

In a hybrid setup:

* Some routes are still handled by the **monolith**, while new or isolated features are built as **microservices**.
* The **gateway decides** the routing logic based on:

  * API path (`/auth`, `/users`, `/reports`, etc.)
  * Version (`/v1` → monolith, `/v2` → microservices)
  * Request type or load condition

### Example:

```
/auth, /payment, /report  → Monolith
/users, /email, /analytics → Microservices
```

---

## 4. Scalability and Load Management

* Under **low load**, most traffic is handled by the monolithic service.
* Under **high load**, the system can **auto-scale microservices** to handle more requests.
* The **API Gateway + Load Balancer** distributes traffic dynamically between the monolith and scaled microservices.

This pattern is often used during **monolith-to-microservices migration**.

> Real-world pattern: **Strangler Fig Pattern**
> Gradually replacing parts of the monolith with microservices.
