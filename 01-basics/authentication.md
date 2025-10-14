# Basic Authentication

**Basic Authentication** is an HTTP authentication method where the client sends the username and password with each request encoded in Base64.
The server verifies the credentials on every request before granting access.

**How It Works:**

1. The client sends an HTTP request with an `Authorization` header:

   ```
   Authorization: Basic base64(username:password)
   ```
2. The server decodes and validates the credentials.
3. If valid, the server responds with the requested resource.

**Advantages:**

* Simple to implement
* Supported by all HTTP clients and servers

**Disadvantages:**

* Credentials are exposed (even if Base64-encoded)
* Requires HTTPS to be secure
* Not suitable for stateless or large-scale systems

**Use Cases:**

* Internal or test APIs
* Systems where simplicity matters more than scalability or security

---

# Token-Based Authentication

**Token-Based Authentication** replaces credentials with a token after successful login. The token is used for all subsequent requests, maintaining statelessness between client and server.

**How It Works:**

1. The client sends credentials (username and password) to the server.
2. The server verifies them and returns a **token** (e.g., JWT).
3. The client stores the token (usually in localStorage or cookies).
4. The client includes the token in each request header:

   ```
   Authorization: Bearer <token>
   ```
5. The server validates the token and grants access.

**Advantages:**

* Stateless (no session storage on the server)
* Scalable and efficient for distributed systems
* Supports expiration and role-based access control
* Works across multiple domains and platforms

**Disadvantages:**

* Requires secure token storage on the client
* Token invalidation before expiration is complex

**Use Cases:**

* RESTful APIs
* Mobile and single-page applications
* Microservices-based authentication systems

**Common Implementations:**

* JSON Web Tokens (JWT)
* OAuth 2.0

---

After authentication, tokens need to be stored on the client side so they can be sent with each request. The two common storage methods are **Local Storage** and **Cookies**.

### 1. Local Storage

* Tokens are stored in the browser’s **local machine storage** (`window.localStorage`).
* They persist even after the browser is closed, until manually cleared.
* **No automatic expiration** — the developer must handle token expiry manually (e.g., using JWT `exp` claim).
* Vulnerable to **XSS (Cross-Site Scripting)** attacks because JavaScript can access stored tokens.

**Use case:**
Suitable for non-critical applications or short-lived tokens where simplicity is preferred.

### 2. Cookies

* Tokens are stored in the **browser’s cookie storage**, sent automatically with each request to the same domain.
* Cookies can have an **expiration time** and optional flags for security:

  * `HttpOnly` → inaccessible to JavaScript (prevents XSS)
  * `Secure` → sent only over HTTPS
  * `SameSite` → restricts cross-site usage (prevents CSRF)
* Expire automatically based on server-defined duration.

**Use case:**
Preferred for web applications requiring strong security, especially when using **HttpOnly** and **Secure** cookies.

### Summary

| Feature                    | Local Storage         | Cookies                            |
| -------------------------- | --------------------- | ---------------------------------- |
| **Expiry**                 | No automatic expiry   | Configurable expiry time           |
| **Access**                 | JavaScript accessible | Can be `HttpOnly` (hidden from JS) |
| **Security Risk**          | Prone to XSS          | Prone to CSRF (if not configured)  |
| **Auto Sent with Request** | No                    | Yes (to same domain)               |
| **Best For**               | SPAs, short sessions  | Secure web sessions                |
