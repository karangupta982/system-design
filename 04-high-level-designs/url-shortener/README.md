# **Scalable URL Shortener Service**

A production-grade **URL Shortening Service** designed with **microservice architecture**, **observability**, and **auto-scaling** in mind — capable of handling millions of users efficiently.

This project demonstrates a complete end-to-end scalable backend system, covering:

* Distributed ID generation using **Snowflake algorithm + ZooKeeper**
* **Caching**, **load balancing**, and **observability**
* **Microservices** communication via REST APIs
* **Auto-scaling deployment** on **Kubernetes**

---

## **Architecture Overview**

The system is built using a **microservices-based architecture**.
Each service is independent, owns its own data, and communicates through APIs.

### Core Microservices

1. **Auth Service** – Manages users and authentication.
2. **URL Shortening Service** – Generates short URLs using distributed IDs.
3. **Redirect Service** – Handles fast redirection to original URLs.
4. **API Gateway** – Routes external requests to appropriate microservices.
5. **Observability & Monitoring Layer** – Provides health metrics, logs, and dashboards.

---

## **Tech Stack and Justifications**

| Component                     | Technology                          | Reason / Use Case                                                                                                         |
| ----------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Backend Framework**         | Node.js + Express.js                | Non-blocking, event-driven I/O — perfect for scalable microservices. Easy API design and async operations.                |
| **Frontend**                  | React.js                            | To build the user dashboard and analytics UI for users (optional for internal UI).                                        |
| **Database (Users)**          | **MongoDB**                         | Stores user info and auth details. Flexible document schema fits user metadata perfectly.                                 |
| **Database (URLs)**           | **Cassandra**                       | High write throughput, horizontal scalability, and fast distributed read performance — ideal for millions of URL records. |
| **Cache Layer**               | **Redis (with TTL)**                | Used to store `{ short → long }` mappings for ultra-fast redirect lookups and automatic expiry of inactive URLs.          |
| **Distributed ID Generation** | **Snowflake Algorithm + ZooKeeper** | Ensures globally unique short URL IDs across distributed instances by managing `worker IDs` and `local counters`.         |
| **API Gateway**               | **NGINX / Express Gateway**         | Routes requests from users to respective microservices and balances load among instances.                                 |
| **Containerization**          | **Docker**                          | Packages each service into lightweight containers for easy deployment and isolation.                                      |
| **Orchestration**             | **Kubernetes (K8s)**                | Enables auto-scaling, load balancing, self-healing, and rolling deployments across all microservices.                     |
| **Observability**             | **Prometheus + Grafana + Loki**     | Collects metrics, visualizes performance, and tracks logs for real-time observability.                                    |
| **Logging & Tracing**         | **OpenTelemetry / Jaeger**          | Distributed tracing between microservices to debug latency and failures.                                                  |
| **Message Broker (optional)** | **Kafka / RabbitMQ**                | For async operations like analytics tracking, link expiry notifications, or batch processing.                             |

---

## **Microservices Explained**

### 1. **Auth Service**

* Manages **user registration, login, and JWT-based authentication**.
* Uses **MongoDB** to store:

  ```js
  {
    _id: ObjectId,
    name: String,
    email: String,
    passwordHash: String,
    mobile: String,
    createdAt: Date
  }
  ```
* Handles token validation for protected APIs.

---

### 2. **URL Shortening Service**

* Accepts a long URL and generates a unique short URL using:

  ```
  Snowflake ID → Base64 encoding → first 6 characters
  ```
* Uses **ZooKeeper** to assign a unique `workerId` to each running service instance.
* Stores URL details in **Cassandra**:

  ```sql
  CREATE TABLE urls (
    short_id TEXT PRIMARY KEY,
    long_url TEXT,
    user_id TEXT,
    created_at TIMESTAMP,
    expiry TIMESTAMP
  );
  ```
* Pushes `{short_id → long_url}` mapping into **Redis** with TTL.
* Runs **cron jobs** to periodically delete expired links from Cassandra.

---

### 3. **Redirect Service**

* Handles requests like `https://short.ly/abc123`.
* Flow:

  1. Looks up the short code in **Redis**.
  2. If found → instant redirect (O(1)).
  3. If not found → query Cassandra → repopulate Redis.
* Most frequently accessed microservice (optimized for speed).

---

### 4. **API Gateway**

* Receives all external traffic.
* Uses **NGINX** or **Express Gateway** to:

  * Route requests to the correct microservice.
  * Handle rate limiting, authentication, and caching at the edge.
* Balances requests among multiple service instances.

---

### 5. **Observability Stack**

* **Prometheus** scrapes metrics from all services.
* **Grafana** visualizes dashboards (response time, throughput, cache hit ratio).
<!-- * **Loki + OpenTelemetry + Jaeger** collect logs and traces across services.
* Health endpoints like `/healthz` or `/metrics` exposed by each service. -->

---

## **Data Flow**

1. **User Login:**

   * User logs in → Auth Service validates and issues JWT.
2. **URL Shortening:**

   * User sends `POST /shorten` → validated by API Gateway → URL Service.
   * Snowflake generates ID → stores in Cassandra → caches in Redis.
3. **Redirection:**

   * Visitor requests `/abc123`.
   * Redirect Service checks Redis → if not found, queries Cassandra.
4. **Expiry:**

   * Redis TTL auto-expires the key.
   * Cron job removes expired records from Cassandra.

---

## **Scalability and Fault Tolerance**

* **Microservice-based** → each service scales independently.
* **Redis Cluster** → avoids single point of failure.
* **Cassandra’s distributed architecture** → ensures no downtime if a node fails.
* **ZooKeeper** → ensures unique ID assignment even if services restart.
* **Kubernetes Auto-Scaling** → adjusts replicas based on CPU/memory usage.
* **Load Balancers (NGINX/K8s)** → distribute traffic evenly.

---

## **Why This Design Works in Production**

* **High availability** — every layer is replicated and stateless.
* **Observability built-in** — allows real-time debugging and scaling decisions.
* **Resilient to failures** — auto-healing and self-recovery mechanisms.
* **Cache-optimized** — majority of requests never hit the database.
* **Horizontal scalability** — every tier can scale independently.

---

## **Deployment Flow**

1. **Build Docker images** for each microservice:

   ```bash
   docker build -t auth-service .
   docker build -t url-service .
   docker build -t redirect-service .
   ```
2. **Push to registry** (e.g., Docker Hub or AWS ECR).
3. **Apply Kubernetes manifests**:

   ```bash
   kubectl apply -f k8s/
   ```
4. **Monitor in Grafana**, adjust autoscaling rules as needed.

---

## **Example API Endpoints**

### Auth Service

```
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
```

### URL Service

```
POST /api/url/shorten
GET /api/url/:shortId
DELETE /api/url/:shortId
GET /api/url/all
```

### Redirect Service

```
GET /:shortId  → 302 Redirect to long URL
```

---

## **Future Improvements**

* Add **custom short URLs**.
* Add **analytics tracking** (click count, user insights).
* Add **user plans (Free / Premium)** with rate limits.
* Integrate **CI/CD pipeline** with GitHub Actions.
* Implement **service mesh (Istio/Linkerd)** for more secure service-to-service communication.
