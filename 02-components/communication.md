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
