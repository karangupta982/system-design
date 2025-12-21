## REST (Representational State Transfer)

**REST is an architectural style**, not a technology and not an API.

It is a **set of constraints and principles** that define **how distributed systems should communicate over HTTP**.

### REST defines *rules*, such as:

* Client–Server separation
* Stateless communication
* Uniform interface
* Resource-based URLs
* Use of standard HTTP methods
* Cacheability
* Layered system

REST answers the question:

> *“How should a web system be designed?”*

It does **not** provide:

* Code
* Libraries
* Endpoints
* Implementations

REST is **conceptual**.

---

## REST API

A **REST API** is an **actual implementation** of REST principles.

It is a **web API** that:

* Exposes resources via URLs
* Uses HTTP methods
* Follows (most or all) REST constraints

REST API answers the question:

> *“How do I expose data and operations following REST principles?”*

### Example of a REST API

```
GET    /users        → fetch users
POST   /users        → create user
GET    /users/10     → fetch user with id 10
PUT    /users/10     → update user
DELETE /users/10     → delete user
```

This API **follows REST**, so it is called a **RESTful API**.

---

## Key Differences (Interview Table)

| Aspect     | REST                             | REST API                    |
| ---------- | -------------------------------- | --------------------------- |
| Type       | Architectural style              | Implementation              |
| Nature     | Concept / design principles      | Actual web service          |
| Defines    | Rules & constraints              | Endpoints & operations      |
| Code       | ❌ No code                        | ✅ Yes                       |
| Technology | Independent of language          | Built using frameworks      |
| Example    | Statelessness, uniform interface | `/api/users`, `/api/orders` |

---

## Relationship Between Them

* **REST** → *the guideline*
* **REST API** → *the product built using that guideline*

### Analogy (Very Effective in Interviews)

* **REST** is like **traffic rules**
* **REST API** is like **a car following those rules**

You can have:

* An API **not following REST** → Not RESTful
* An API **following REST rules** → REST API

---

## Important Interview Clarifications

### Are they the same?

**No.**

* REST = design philosophy
* REST API = implementation of that philosophy

### Is every API a REST API?

**No.**
Examples of non-REST APIs:

* SOAP
* GraphQL
* gRPC
* RPC-style HTTP APIs

### Can a REST API violate REST?

Yes.
Many “REST APIs” in real projects are **partially RESTful**, not strictly REST.

---

## One-Line Interview Answer

> **REST is an architectural style that defines how APIs should be designed, while a REST API is an actual API implementation that follows REST principles.**
