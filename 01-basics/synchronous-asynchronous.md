# Synchronous Systems and Consistency

## Concept
In synchronous systems, operations occur in a **strict sequence** — each step waits until the previous one is successfully completed.  
This ensures **strong consistency**, meaning all nodes or components always see the same data at the same time.

## How It Maintains Consistency
- The **write operation** is confirmed only after all replicas or databases acknowledge the change.
- This guarantees that every read after the write will return the most recent data.
- However, it increases **latency** because processes must wait for confirmation from all nodes.

## Use Cases
Synchronous communication is used where **data correctness** is more important than speed:
- **Banking Systems** – ensuring balance accuracy across accounts.  
- **Payment Gateways** – confirming transactions before completion.  
- **Ticket Booking Systems** – preventing double booking.  
- **Real-time Decision Systems** – requiring up-to-date information for each action.

## Trade-off
- **Pros:** Ensures accuracy, reliability, and immediate consistency.  
- **Cons:** Slower response time, poor scalability under high load.

In summary, synchronous systems prioritize **consistency** over **performance**, making them ideal for operations where correctness is critical.

--- 

# Asynchronous Systems and Eventual Consistency

## Concept
In asynchronous systems, operations do **not wait** for other components or replicas to complete before moving forward.  
The system allows temporary inconsistencies with the goal of achieving **eventual consistency** — all parts of the system will become consistent over time.

## How It Works
- When a write happens, it’s sent to one or more nodes and acknowledged immediately.
- Background processes or message queues propagate updates to other nodes later.
- During this delay, some nodes may have **stale data**, but consistency is restored eventually.

## Use Cases
Asynchronous communication is used where **speed and scalability** are more important than immediate consistency:
- **Social Media Feeds** – posts or likes may appear after a short delay.  
- **E-commerce Inventory Updates** – minor delay in reflecting stock changes.  
- **Analytics Systems** – where data freshness is less critical.  
- **Notification Systems** – sending messages asynchronously for better throughput.

## Trade-off
- **Pros:** Faster response time, better scalability, handles high traffic efficiently.  
- **Cons:** Temporary inconsistency, more complex error handling.

In summary, asynchronous systems prioritize **performance and availability** over **immediate consistency**, making them ideal for large-scale, distributed applications.
