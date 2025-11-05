### 🌐 What is a REST API?

**REST** stands for **Representational State Transfer**.

It’s a set of **rules or principles** for designing web APIs that let different systems communicate over the internet — usually using **HTTP** (the same protocol your browser uses).

An **API (Application Programming Interface)** is like a *messenger* that lets one software talk to another.

So, a **REST API** is basically a **way to build APIs** that follow REST principles.

---

### ⚙️ Example (Real-life Analogy)

Imagine you’re using a food delivery app:

- You (the client) send a **request** to the restaurant’s server to get the **menu**.
- The restaurant’s server **responds** with the menu data (usually in JSON).

That’s how REST APIs work — one side (client) requests data, and the other (server) responds.

---

### 📩 How REST APIs Work

REST APIs use **HTTP methods** to perform different actions:

| HTTP Method | Action | Example |
| --- | --- | --- |
| **GET** | Retrieve data | Get all users |
| **POST** | Create new data | Add a new user |
| **PUT** | Update existing data | Edit user details |
| **DELETE** | Remove data | Delete a user |

---

### 🧠 Example in Code

Suppose we have an API for users at `https://api.example.com/users`.

| Task | HTTP Method | Endpoint | Description |
| --- | --- | --- | --- |
| Get all users | GET | `/users` | Returns all users |
| Get one user | GET | `/users/1` | Returns user with ID 1 |
| Create user | POST | `/users` | Creates a new user |
| Update user | PUT | `/users/1` | Updates user with ID 1 |
| Delete user | DELETE | `/users/1` | Deletes user with ID 1 |

---

### 📦 Common Data Format

REST APIs mostly use **JSON** format for data exchange because it’s lightweight and easy to read.

Example response from a REST API:

```json
{
  "id": 1,
  "name": "Partho",
  "role": "Developer"
}
```

---

### 🔥 In short:

> A REST API allows clients (like your browser or app) to communicate with a server using standard HTTP methods and JSON data, following REST principles.
> 

---

---

## ⚙️ REST API Design Principles

### 1. **Statelessness**

👉 Each API request should contain *all the information needed* to process it.

The server does **not store any session or user state** between requests.

**Example:**

If you send a login request, your token (like a JWT) should be sent again with every next request — the server doesn’t “remember” you.

```
GET /users
Authorization: Bearer <token>

```

✅ Benefits:

- Scalable (each request is independent)
- Easier to debug and maintain

---

### 2. **Client-Server Separation**

The **client (frontend)** and **server (backend)** are separate systems that interact through API calls.

- The **client** only handles the user interface.
- The **server** handles logic, data, and database operations.

✅ Benefits:

- Independent development
- Easier to update or replace one side without affecting the other

---

### 3. **Uniform Interface**

This is the **heart of REST** — everything should follow a consistent pattern.

Key aspects:

- **Resource-based URLs** → `/users`, `/products`, `/orders`
- **HTTP Methods** define actions:
    - `GET` → Read
    - `POST` → Create
    - `PUT` → Update
    - `DELETE` → Remove
- **Consistent responses** (usually JSON)
- **Meaningful status codes**

✅ Benefits:

- Easier for developers to understand and use your API

---

### 4. **Resource Identification**

In REST, **everything is treated as a resource** — like users, posts, comments, etc.

Each resource is identified by a **unique URL (endpoint)**.

Example:

```
GET /users         → Get all users
GET /users/1       → Get user with ID 1
POST /users        → Create a new user
DELETE /users/1    → Delete user with ID 1

```

✅ Benefits:

- Clean and predictable endpoints
- Simple navigation between related resources

---

### 5. **Use of Standard HTTP Methods and Status Codes**

Use the right HTTP methods and status codes to make your API self-explanatory.

| HTTP Method | Purpose |
| --- | --- |
| **GET** | Retrieve data |
| **POST** | Create new data |
| **PUT** | Update existing data |
| **DELETE** | Delete data |

| Status Code | Meaning |
| --- | --- |
| **200 OK** | Successful request |
| **201 Created** | Resource created |
| **400 Bad Request** | Invalid input |
| **401 Unauthorized** | Authentication required |
| **404 Not Found** | Resource doesn’t exist |
| **500 Internal Server Error** | Server error |

---

### 6. **Layered System**

A REST API can be designed with **layers** — for example, you might have:

- A load balancer
- A caching layer
- An authentication layer
- The main API server

Each layer has its own responsibility.

✅ Benefits:

- Better scalability
- Enhanced security and performance

---

### 7. **Cacheability**

To improve performance, API responses can be **cached** (stored temporarily).

Example:

If `/users` data doesn’t change often, cache it so the client doesn’t have to ask the server every time.

✅ Benefits:

- Faster performance
- Reduces load on the server

---