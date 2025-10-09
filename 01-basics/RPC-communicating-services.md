# gRPC, ConnectRPC, and Communication Between Microservices

When building distributed systems or microservice-based applications, different services often need to communicate with each other. These services may be written in **different programming languages** (for example, a Go backend talking to a Node.js frontend or a Python analytics service).
To enable this communication efficiently, we use **Remote Procedure Call (RPC) frameworks** such as **gRPC**, **ConnectRPC**, and others.

This document explains what they are, how they work, and why they are used.

---

## 1. The Problem: Communication Between Services

In a microservices architecture:

* Each service runs independently.
* Services often use different programming languages.
* They need to communicate to share data or trigger actions.

### Example

A `User Service` written in Go may need to talk to an `Email Service` written in Node.js.
If they communicate using HTTP and JSON, this works but can be **slow and inefficient** for large-scale systems because:

* JSON is text-based and needs serialization and deserialization.
* There is no strict schema, so data inconsistencies may occur.
* Network bandwidth is wasted due to verbose data format.

This is where **gRPC** and similar frameworks come in.

---

## 2. What is gRPC?

**gRPC** (Google Remote Procedure Call) is an open-source high-performance RPC framework developed by Google.
It allows one service to **directly call functions (remote procedures)** in another service — as if they were local functions — even if they are written in different languages.

### Key Features

* Uses **Protocol Buffers (Protobuf)** for data serialization.
* Supports multiple languages (Go, Java, C++, Python, Node.js, etc.).
* Uses **HTTP/2** for communication.
* Supports features like **streaming**, **authentication**, and **load balancing**.

---

## 3. How gRPC Works

The main idea behind gRPC is to use a **shared interface definition** that describes the structure of requests and responses.

### Step-by-Step

1. **Define Service in `.proto` File**
   Example:

   ```proto
   syntax = "proto3";

   service UserService {
       rpc GetUser (UserRequest) returns (UserResponse);
   }

   message UserRequest {
       string user_id = 1;
   }

   message UserResponse {
       string name = 1;
       string email = 2;
   }
   ```

2. **Generate Code for Each Language**
   The `.proto` file is compiled using the `protoc` tool to generate code for different languages.

   * For Go, it generates Go types and functions.
   * For Node.js, it generates JavaScript/TypeScript clients.

   This ensures that both sides understand the same data structure without manually converting formats.

3. **Run the Services**

   * The **server** implements the service (e.g., `GetUser` function).
   * The **client** calls the service using generated code.
   * Data is serialized into a **binary Protobuf format**, sent over HTTP/2, and deserialized back on the other side.

4. **Communication Happens**
   The client simply calls:

   ```typescript
   const response = await userClient.GetUser({ user_id: "123" });
   ```

   It feels like a local function call, but it’s actually a network call handled by gRPC.

---

## 4. Why gRPC Is Efficient

| Aspect         | gRPC                        | Traditional REST (JSON/HTTP) |
| -------------- | --------------------------- | ---------------------------- |
| Data Format    | Binary (Protobuf)           | Text (JSON)                  |
| Transport      | HTTP/2                      | HTTP/1.1                     |
| Speed          | Faster (smaller payload)    | Slower                       |
| Type Safety    | Strongly typed via `.proto` | Schema-less                  |
| Streaming      | Supported                   | Limited                      |
| Multi-language | Built-in support            | Manual conversions           |

gRPC is designed for **high performance**, **low latency**, and **multi-language interoperability**, making it ideal for internal microservice communication.

---

## 5. What is ConnectRPC?

**ConnectRPC** (or simply **Connect**) is a modern alternative to gRPC, created by **Buf** (the company behind Protocol Buffers tooling).
It aims to make RPC simpler, more flexible, and web-friendly.

### Key Highlights

* Works over both **HTTP/1.1** and **HTTP/2** (while gRPC mostly requires HTTP/2).
* Uses the same **Protocol Buffers** format as gRPC.
* Fully compatible with **gRPC clients and servers**.
* Easier to use in browsers and TypeScript environments.
* Supports both binary (Protobuf) and JSON formats.

### Why ConnectRPC Exists

gRPC works very well for backend-to-backend communication but is less friendly for browsers and some web-based APIs. ConnectRPC solves this by:

* Supporting **browser clients** directly.
* Providing **simple error handling** and **human-readable responses**.
* Maintaining **backward compatibility** with gRPC.

---

## 6. Other RPC Frameworks

| Framework    | Description                                       | Notes                                                        |
| ------------ | ------------------------------------------------- | ------------------------------------------------------------ |
| **Thrift**   | Developed by Facebook; similar to gRPC but older. | Supports many languages.                                     |
| **JSON-RPC** | Uses JSON instead of Protobuf.                    | Simpler but slower.                                          |
| **GraphQL**  | Query language for APIs, not exactly RPC.         | Great for flexible queries but higher overhead.              |
| **REST API** | The most common approach using HTTP and JSON.     | Easier to use but less efficient for internal communication. |

---

## 7. When to Use What

| Use Case                            | Recommended Approach                  |
| ----------------------------------- | ------------------------------------- |
| Internal microservice communication | gRPC or ConnectRPC                    |
| Browser to backend                  | REST API or ConnectRPC                |
| Public APIs (for external clients)  | REST or GraphQL                       |
| Real-time streaming                 | gRPC (supports bidirectional streams) |

---

## 8. Summary

| Concept        | Description                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------ |
| RPC            | Remote Procedure Call — allows one program to call a function in another program over a network. |
| gRPC           | High-performance RPC framework by Google using Protocol Buffers.                                 |
| ConnectRPC     | Modern, web-friendly alternative to gRPC compatible with HTTP/1.1 and browsers.                  |
| Protobuf       | Binary serialization format defining the structure of requests and responses.                    |
| Main Advantage | Language-independent, efficient, and strongly typed communication between services.              |
