# Load Balancing in System Design

---

## 1. What Is a Load Balancer?

A **Load Balancer** is a system component that distributes incoming network traffic or requests evenly across multiple servers or resources.

Its main goal is to:

* Prevent any single server from becoming overloaded.
* Improve system reliability, performance, and scalability.

In essence, a load balancer acts as the **traffic manager** of your infrastructure.

---

## 2. Why Load Balancing Is Needed

In a horizontally scaled system (multiple servers), requests must be efficiently distributed among available servers.
Without a load balancer:

* One server may receive too many requests.
* Others may remain underutilized.
* Failures in one node may cause downtime.

A load balancer ensures even distribution and seamless failover.
