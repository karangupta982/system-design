# Communication Protocols in Computer Networks

Communication protocols define how clients and servers exchange data. They differ in connection type, direction of communication, and latency requirements.

## 1. Push Model

The server proactively sends data to clients whenever updates occur.
**Used in:**

* Notification systems (email, mobile push notifications)
* Real-time dashboards
* Live score or event updates

**Example:** Firebase Cloud Messaging (FCM) pushes notifications to mobile devices.

## 2. Pull (Polling) Model

The client periodically requests data from the server to check for changes.
**Used in:**

* News or weather apps fetching updates every few minutes
* Basic APIs without real-time requirements

**Example:** A client sends GET requests every 10 seconds to check for new messages.

## 3. Long Polling

The client sends a request and waits until the server has new data. When data is sent, the connection closes and a new one starts.
**Used in:**

* Chat applications (before WebSockets became common)
* Notification feeds where updates are infrequent

**Example:** Early versions of Facebook Chat used long polling for message delivery.

## 4. WebSockets

Provides a persistent, bidirectional connection between client and server after an initial HTTP handshake. Both can send and receive data anytime.
**Used in:**

* Real-time chat apps (WhatsApp Web, Slack)
* Online gaming
* Collaborative tools (Google Docs live editing)
* Live stock price or cryptocurrency trackers

**Example:** A trading dashboard using WebSocket streams to show live price movements.

## 5. Server-Sent Events (SSE)

A unidirectional channel where the server sends continuous updates to the client over a single HTTP connection.
**Used in:**

* Live feeds (news, social media updates)
* Real-time analytics dashboards
* Monitoring systems

**Example:** GitHub uses SSE to push live notifications and updates in repositories.

---

## 1. REST (Representational State Transfer)

REST is an architectural style for designing networked applications. It uses **stateless communication** over HTTP, where resources are identified by **URIs** and represented in formats like JSON or XML.
**Key Principles:**

* Client-server separation
* Stateless interactions
* Cacheable responses
* Uniform interface (HTTP methods: GET, POST, PUT, DELETE)
* Layered system design

**Example:** A client requests `GET /users/1` to fetch details of user ID 1.

## 2. REST API

A REST API implements REST principles, allowing clients to access and manipulate server resources via standard HTTP methods.
**Characteristics:**

* Lightweight and scalable
* Platform and language-independent
* Commonly used for web and mobile backends

**Example:**

```
GET /products → fetch all products  
POST /products → create a new product  
PUT /products/1 → update product with ID 1  
DELETE /products/1 → delete product with ID 1
```

## 3. SOA (Service-Oriented Architecture)

SOA is an architectural pattern where software components (services) communicate over a network to provide functionality. Each service performs a specific business task and exposes it through well-defined interfaces, often using protocols like SOAP, REST, or messaging systems.
**Key Features:**

* Loose coupling between services
* Reusability across applications
* Centralized governance and communication
* Typically uses an Enterprise Service Bus (ESB)

**Example:** A banking system where separate services handle accounts, payments, and loans, all managed centrally.

---

# SOA vs Microservices Architecture

| Aspect              | SOA (Service-Oriented Architecture)       | Microservices Architecture                                 |
| ------------------- | ----------------------------------------- | ---------------------------------------------------------- |
| **Service Size**    | Larger, coarse-grained                    | Smaller, fine-grained                                      |
| **Communication**   | Uses ESB or SOAP, often heavier protocols | Lightweight protocols like REST, gRPC, or messaging queues |
| **Data Management** | Often uses a shared database              | Each service has its own database                          |
| **Deployment**      | Centralized and managed together          | Independently deployable services                          |
| **Governance**      | Strong central control                    | Decentralized, autonomous teams                            |
| **Scalability**     | Scales at the system level                | Scales at the service level                                |
| **Use Cases**       | Enterprise-level, legacy systems          | Cloud-native, agile applications                           |

**Summary:**
SOA focuses on integrating large, reusable enterprise services under centralized control, while microservices break down applications into independently deployable components optimized for scalability, agility, and continuous delivery.

