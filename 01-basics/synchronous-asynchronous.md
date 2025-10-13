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
