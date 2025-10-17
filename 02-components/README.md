# 02 - Components

This section covers the **core building blocks** of system design.
Each component plays a specific role in improving scalability, availability, reliability, and performance of large-scale distributed systems.
From this stage onward, you will complement the theoretical understanding with **hands-on practical implementations** using Node.js, Express, Nginx, and other real-world tools.

---

## Topics Covered

| File                          | Description                                                                                                                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **api-gateway.md**            | Explains the API Gateway architecture. Covers request routing, aggregation, authentication, and rate limiting. Practical: build a simple API Gateway in Node.js to route requests to multiple microservices. |
| **CDN.md**                    | Covers Content Delivery Networks, how they cache static assets closer to users to reduce latency. Practical: integrate a CDN (like Cloudflare) in a sample project.                                          |
| **consistency-models.md**     | Describes consistency levels such as strong, eventual, and causal consistency. Practical: simulate consistency trade-offs using database replicas or mock services.                                          |
| **message-queue.md**          | Explains asynchronous communication between services using message brokers. Practical: set up RabbitMQ or Kafka for background task processing.                                                              |
| **monitoring-and-logging.md** | Discusses how to observe, log, and monitor systems for reliability. Practical: integrate Winston, PM2, or ELK stack for logging and metrics.                                                                 |
| **rate-limiting.md**          | Explains rate limiting techniques to prevent abuse and control API traffic. Practical: implement rate limiting in Express using middleware like `express-rate-limit`.                                        |
| **reverse-proxy.md**          | Describes reverse proxies and their use in load balancing, SSL termination, and caching. Practical: configure Nginx as a reverse proxy for your backend services.                                            |
