# 🚀 Mongoose & Data Modeling Learning Notes

## 📚 What I Learned Today

Today I explored:

* Mongoose
* Data Modeling Basics
* Relationships between different fields
* Schema & Models
* MongoDB relations using Mongoose
* Todo App Data Structure
* StackBlitz
* GitHub workflow
* Cloud coding tools

---

# 🟢 What is Mongoose?

Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.

It helps:

* create schemas
* define models
* validate data
* manage MongoDB easily

Install:

```bash id="2e4v1m"
npm install mongoose
```

---

# 🟢 What is Schema?

Schema = blueprint/structure of data.

Example:

```js id="2e4v1n"
const userSchema = new mongoose.Schema({
    username: String,
    email: String
});
```

Defines:

* fields
* data types
* validation rules

---

# 🟢 What is a Model?

Model = interface to interact with database.

Example:

```js id="2e4v1o"
const User = mongoose.model("User", userSchema);
```

Used for:

* create data
* read data
* update data
* delete data

---

# 🟢 Basic Data Modeling

Learned how to structure database collections properly.

Example:

```txt id="2e4v1p"
User
 ├── username
 ├── email
 └── password
```

```txt id="2e4v1q"
Todo
 ├── title
 ├── completed
 └── createdBy
```

---

# 🟢 Mongoose Relationships

Learned relationships between collections using:

```js id="2e4v1r"
mongoose.Schema.Types.ObjectId
```

and:

```js id="2e4v1s"
ref: "User"
```

Example:

```js id="2e4v1t"
createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
}
```

This creates connection between:

* Todo
* User

---

# 🟢 Todo & SubTodo Modeling

Practiced modeling using:

* User
* Todo
* SubTodo

Relationship example:

```txt id="2e4v1u"
User → Todo → SubTodo
```

---

# 🟢 timestamps Option

Learned:

```js id="2e4v1v"
{ timestamps: true }
```

Automatically creates:

* createdAt
* updatedAt

---

# 🟢 Tools Explored

## 🔹 [StackBlitz](https://stackblitz.com?utm_source=chatgpt.com)

Online cloud IDE for:

* Node.js
* React
* Fullstack projects

Used for:

* practice
* quick coding
* testing

---

## 🔹 [GitHub Codespaces](https://github.com/features/codespaces?utm_source=chatgpt.com)

Cloud-based VS Code environment.

Used for:

* remote development
* team collaboration
* professional cloud coding

---

## 🔹 [CodeSandbox](https://codesandbox.io?utm_source=chatgpt.com)

Browser-based development environment.

Useful for:

* frontend/backend demos
* sharing projects

---

## 🔹 [Eraser.io](https://www.eraser.io?utm_source=chatgpt.com)

Used for:

* system design
* database diagrams
* architecture flow

---

# 🟢 Important Concepts Learned

```txt id="2e4v1w"
Schema = structure of data
Model = interact with database
ObjectId = relation between collections
ref = reference another model
```

---

# 🟢 MongoDB Relation Example

```txt id="2e4v1x"
User
  ↓
Todo
  ↓
SubTodo
```

---

# 🟢 GitHub Practice

Today I also:

* pushed project to GitHub
* practiced project structure
* explored backend folder organization

---

# 🟢 Key Learning Summary

```txt id="2e4v1y"
Mongoose helps structure and manage MongoDB data efficiently.
```

```txt id="2e4v1z"
Data modeling is important for scalable backend applications.
```

```txt id="2e4v200"
Relationships are created using ObjectId and ref.
```
