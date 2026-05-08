# 🚀 MERN Backend Learning Notes

---
## 🚀 Live Preview
[Live App](https://backend-learning-gsdj.onrender.com/)

## 📚 Topics Covered

* Node.js
* Express.js Response Methods
* Axios
* CORS Policy
* Proxy
* Arrow Function Return
* Production Build
* Dist Folder
* Deployment Basics

---

# 🟢 Node.js

Node.js allows JavaScript to run outside the browser.

Used for:

* Backend APIs
* Servers
* Real-time apps

---

# 🟢 Express Response Methods

```js
res.send()
res.json()
res.status()
res.redirect()
res.sendFile()
```

---

# 🟢 Axios

Axios is used to send HTTP requests.

Install:

```bash
npm install axios
```

Example:

```js
axios.get('/api/users');
```

---

# 🟢 CORS

CORS = Cross-Origin Resource Sharing

Controls communication between different origins.

Example:

```txt
Frontend → localhost:5173
Backend  → localhost:3000
```

Fix:

```bash
npm install cors
```

```js
const cors = require('cors');

app.use(cors());
```

---

# 🟢 Proxy

Proxy acts as middle layer between frontend and backend.

Flow:

```txt
Frontend → Proxy → Backend
```

Vite Proxy Example:

```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true
    }
  }
}
```

---

# 🟢 Arrow Function Return

```js
// Explicit Return
const add = (a, b) => {
  return a + b;
};

// Implicit Return
const add2 = (a, b) => (
  a + b
);
```

---

# 🟢 process.env.PORT

```js
const PORT = process.env.PORT || 3000;
```

Used for:

* Local development
* Production deployment

---

# 🟢 Build & Dist Folder

Build project:

```bash
npm run build
```

Creates:

```txt
dist/
```

Purpose:

* Optimized production files
* Faster loading
* Static deployment

---

# 🟢 Development vs Production

| Development | Production      |
| ----------- | --------------- |
| npm run dev | npm run build   |
| Hot Reload  | Optimized Files |
| Dev Server  | Static Files    |

---

# 🟢 Serving Frontend from Backend

```js
app.use(express.static('dist'));
```

---

# 🟢 Production Deployment

## Beginner Setup

```txt
Frontend Build → dist → Backend → Deploy
```

## Modern Production Setup

```txt
Frontend (Vercel)
        ↓
Backend API (Render)
        ↓
Database
```

---

# 🧠 Key Notes

```txt
Axios = sends requests
CORS = controls permission
Proxy = redirects requests
```

```txt
npm run dev   → development
npm run build → production
```

```txt
dist folder = optimized static files
```
