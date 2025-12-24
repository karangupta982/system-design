## 1. REST (Representational State Transfer)

**Type:** Architectural style
**Communication:** Request–Response (HTTP)

### Key Points

* Stateless
* Resource-based URLs (Resource-based URLs mean that URLs identify resources (nouns), and HTTP methods define what action to perform on those resources)
* Uses HTTP methods (`GET`, `POST`, `PUT`, `DELETE`)
* Multiple data formats (JSON most common)

#### Resource based URLs
* Correct REST style (resource-based)
GET /users          → get all users
GET /users/101      → get user with id 101
POST /users         → create a new user
PUT /users/101      → update user 101
DELETE /users/101   → delete user 101

* Wrong (action-based URLs – not RESTful)
/getUsers
/createUser
/updateUser
/deleteUser?id=101

### Use When

* Standard CRUD APIs
* Public APIs
* Scalable web applications

### Example

```
GET /users/1
POST /orders
```

---

## 2. SOAP (Simple Object Access Protocol)

**Type:** Protocol
**Communication:** Request–Response (XML over HTTP/SMTP)

### Key Points

* Strict standards
* XML only
* Built-in security (WS-Security)
* Heavy and verbose

### Use When

* Enterprise systems
* Banking, payment gateways
* Strong security & contracts needed

### Example

```xml
<soap:Envelope>
  <soap:Body>
    <GetUser />
  </soap:Body>
</soap:Envelope>
```

---

## 3. gRPC

**Type:** RPC framework
**Communication:** Binary over HTTP/2

### Key Points

* Uses Protocol Buffers
* Very fast and efficient
* Strongly typed contracts
* Supports streaming

### Use When

* Microservices
* Internal service-to-service communication
* Low latency systems

### Example

```
rpc GetUser(UserRequest) returns (UserResponse)
```

---

## 4. Webhooks

**Type:** Event-driven mechanism
**Communication:** Server → Server (HTTP callbacks)

### Key Points

* Push-based (no polling)
* Triggered by events
* One-way communication

### Use When

* Notifications
* Payment updates
* CI/CD events

### Example

```
Stripe → POST /payment-success
```

---

## 5. GraphQL

**Type:** Query language for APIs
**Communication:** Single HTTP endpoint

### Key Points

* Client decides data shape
* Avoids over-fetching & under-fetching
* Strong schema & types

### Use When

* Complex frontend requirements
* Mobile apps
* Rapid UI changes

### Example

```graphql
query {
  user(id: 1) {
    name
    posts {
      title
    }
  }
}
```

---

## 6. WebRTC

**Type:** Real-time communication protocol
**Communication:** Peer-to-Peer

### Key Points

* Audio, video, screen sharing
* Very low latency
* No server for media transfer (mostly)

### Use When

* Video calls
* Voice chat
* Live streaming

### Example

```
Browser ↔ Browser (P2P)
```

---

## 7. WebSockets

**Type:** Full-duplex communication protocol
**Communication:** Persistent connection

### Key Points

* Real-time, bi-directional
* Single TCP connection
* Server can push data anytime

### Use When

* Chat applications
* Live notifications
* Multiplayer games

### Example

```
Client ↔ Server (always connected)
```

---

## High-Level Comparison Table (Very Important for Interviews)

| Technology | Type           | Data Format   | Real-Time | Performance | Typical Use   |
| ---------- | -------------- | ------------- | --------- | ----------- | ------------- |
| REST       | Architecture   | JSON/XML      | ❌         | Medium      | Web APIs      |
| SOAP       | Protocol       | XML           | ❌         | Low         | Enterprise    |
| gRPC       | RPC Framework  | Protobuf      | ✅         | Very High   | Microservices |
| Webhooks   | Event system   | JSON          | ❌         | High        | Notifications |
| GraphQL    | Query Language | JSON          | ❌         | Medium      | Frontend APIs |
| WebRTC     | P2P Protocol   | Media streams | ✅         | Ultra-Low   | Video/Voice   |
| WebSockets | Protocol       | Any           | ✅         | High        | Live apps     |

---

## One-Line Interview Differentiators

* **REST** → Resource-based HTTP APIs
* **SOAP** → Heavy, secure, XML enterprise protocol
* **gRPC** → Fast binary RPC for microservices
* **Webhooks** → Event-driven server callbacks
* **GraphQL** → Client-controlled data fetching
* **WebRTC** → Real-time peer-to-peer media
* **WebSockets** → Persistent real-time connection

---

## Final Interview Tip (Important)

> **REST, SOAP, gRPC, and GraphQL are API styles**,
> **Webhooks are event triggers**,
> **WebSockets and WebRTC are real-time communication technologies**.
