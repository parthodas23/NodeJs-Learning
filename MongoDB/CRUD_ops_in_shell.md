### 🧩 Step 1: Create (or Switch to) a Database

```jsx
use myDatabase

```

- This command tells MongoDB to **use** a database named `myDatabase`.
- If it doesn’t exist yet, MongoDB will **create it automatically** when you insert data into it.
- You’ll see:
    
    ```
    switched to db myDatabase
    
    ```
    

---

### 📁 Step 2: Create a Collection and Insert a Document

```jsx
db.users.insertOne({ name: "Partho", age: 22, country: "Bangladesh" })

```

- `db` means the current database (`myDatabase` in this case).
- `users` is the **collection** (like a table in SQL).
- `insertOne()` adds **one document** (record) into the `users` collection.
- Each document in MongoDB is stored in **JSON-like format** (key-value pairs).

✅ Result:

A new collection `users` is created automatically, and your first record (document) is added.

---

### 📦 Step 3: Insert Multiple Documents

```jsx
db.users.insertMany([
  { name: "Riya", age: 21, country: "India" },
  { name: "John", age: 25, country: "USA" },
  { name: "Aisha", age: 23, country: "Bangladesh" }
])

```

- `insertMany()` lets you insert **multiple documents at once**.
- MongoDB stores each object `{ ... }` as one record inside the `users` collection.

---

### 🔍 Step 4: Show Databases and Collections

```jsx
show dbs

```

- Displays all databases stored in MongoDB.

```jsx
show collections

```

- Displays all collections (like tables) inside the **current** database.

---

### 🔎 Step 5: Retrieve (Find) Data

```jsx
db.users.find()

```

- Shows **all documents** inside the `users` collection.

To make the result easier to read:

```jsx
db.users.find().pretty()

```

- Adds formatting to the output (nice line breaks and indentation).

Find specific users:

```jsx
db.users.find({ country: "Bangladesh" })

```

- Filters documents — only shows users where `country` is `"Bangladesh"`.

---

### ✏️ Step 6: Update Data

```jsx
db.users.updateOne({ name: "Partho" }, { $set: { age: 23 } })

```

- Finds one document with `name: "Partho"`.
- `$set` updates only the specified field (`age`) to `23`.

You can check if it worked:

```jsx
db.users.find({ name: "Partho" })

```

---

### 🗑️ Step 7: Delete a Document

```jsx
db.users.deleteOne({ name: "John" })

```

- Deletes **one** document where `name` is `"John"`.

If there were multiple Johns, it would only delete the **first one** it finds.

---

### 🔢 Step 8: Count Documents

```jsx
db.users.countDocuments()

```

- Counts the **total number of documents** (records) in the `users` collection.

---

### 💥 Step 9: Drop (Delete) a Collection or Database

Delete the collection:

```jsx
db.users.drop()

```

- Deletes the entire `users` collection (and all documents inside).

Delete the whole database:

```jsx
db.dropDatabase()

```

- Deletes the **current database** (`myDatabase`).

⚠️ Once dropped, the data is gone permanently.

---

### 🚪 Step 10: Exit the Mongo Shell

```jsx
exit

```

- Closes the MongoDB shell session.

---

Would you like me to also explain **how these commands look if you write them in a Node.js project using Mongoose or the native MongoDB driver**? It will help connect what you do in the shell with how you do it in your code.

### You said:

what would be each command output or how can i check the output like what this command does?

### ChatGPT said:

Excellent question, Partho 👍 — that’s how real developers learn databases deeply!

Let’s go through **each MongoDB shell command**, what it *does*, and what *output* or *feedback* you’ll see in the `mongosh` terminal.

You’ll also learn **how to check** the results directly from your database 👇

---

### 🧩 Step 1: Create (or Switch to) a Database

```jsx
use myDatabase

```

**Output:**

```
switched to db myDatabase

```

✅ MongoDB switches to the database named `myDatabase`.

If it doesn’t exist yet, it will be created automatically *when you insert data later*.

You can verify your current database:

```jsx
db

```

**Output:**

```
myDatabase

```

---

### 📁 Step 2: Insert One Document

```jsx
db.users.insertOne({ name: "Partho", age: 22, country: "Bangladesh" })

```

**Output:**

```json
{
  acknowledged: true,
  insertedId: ObjectId("673a3fda9e6d5dfb0f8a6e91")
}

```

✅ This means MongoDB successfully inserted the document.

The `insertedId` is a unique `_id` automatically assigned by MongoDB.

To **check the document**, run:

```jsx
db.users.find()

```

You’ll see something like:

```json
[
  { _id: ObjectId("673a3fda9e6d5dfb0f8a6e91"), name: "Partho", age: 22, country: "Bangladesh" }
]

```

---

### 📦 Step 3: Insert Multiple Documents

```jsx
db.users.insertMany([
  { name: "Riya", age: 21, country: "India" },
  { name: "John", age: 25, country: "USA" },
  { name: "Aisha", age: 23, country: "Bangladesh" }
])

```

**Output:**

```json
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("673a40bb9e6d5dfb0f8a6e92"),
    '1': ObjectId("673a40bb9e6d5dfb0f8a6e93"),
    '2': ObjectId("673a40bb9e6d5dfb0f8a6e94")
  }
}

```

To check:

```jsx
db.users.find().pretty()

```

**Output:**

```json
[
  { _id: ..., name: "Partho", age: 22, country: "Bangladesh" },
  { _id: ..., name: "Riya", age: 21, country: "India" },
  { _id: ..., name: "John", age: 25, country: "USA" },
  { _id: ..., name: "Aisha", age: 23, country: "Bangladesh" }
]

```

---

### 🔍 Step 4: Show Databases and Collections

```jsx
show dbs

```

**Output example:**

```
admin         0.000GB
config        0.000GB
local         0.000GB
myDatabase    0.001GB

```

```jsx
show collections

```

**Output:**

```
users

```

---

### 🔎 Step 5: Retrieve (Find) Data

```jsx
db.users.find()

```

**Output:**

Displays all documents:

```json
[
  { _id: ..., name: "Partho", age: 22, country: "Bangladesh" },
  { _id: ..., name: "Riya", age: 21, country: "India" },
  { _id: ..., name: "John", age: 25, country: "USA" },
  { _id: ..., name: "Aisha", age: 23, country: "Bangladesh" }
]

```

Filter specific:

```jsx
db.users.find({ country: "Bangladesh" })

```

**Output:**

```json
[
  { _id: ..., name: "Partho", age: 22, country: "Bangladesh" },
  { _id: ..., name: "Aisha", age: 23, country: "Bangladesh" }
]

```

---

### ✏️ Step 6: Update Data

```jsx
db.users.updateOne({ name: "Partho" }, { $set: { age: 23 } })

```

**Output:**

```json
{
  acknowledged: true,
  matchedCount: 1,
  modifiedCount: 1
}

```

✅ This means 1 document matched and was updated.

To check:

```jsx
db.users.find({ name: "Partho" })

```

**Output:**

```json
{ _id: ..., name: "Partho", age: 23, country: "Bangladesh" }

```

---

### 🗑️ Step 7: Delete a Document

```jsx
db.users.deleteOne({ name: "John" })

```

**Output:**

```json
{ acknowledged: true, deletedCount: 1 }

```

✅ One document deleted.

To verify:

```jsx
db.users.find()

```

You’ll see all users except John.

---

### 🔢 Step 8: Count Documents

```jsx
db.users.countDocuments()

```

**Output:**

```
3

```

(Depending on how many remain after deletion)

---

### 💥 Step 9: Drop (Delete) a Collection or Database

Delete the collection:

```jsx
db.users.drop()

```

**Output:**

```
true

```

✅ Means the collection was successfully dropped.

Delete the whole database:

```jsx
db.dropDatabase()

```

**Output:**

```json
{ "ok" : 1, "dropped" : "myDatabase" }

```

✅ Confirms the database was deleted.

---

### 🚪 Step 10: Exit the Mongo Shell

```jsx
exit

```

**Effect:**

The `mongosh` session closes — you’re back to your normal terminal prompt (e.g., `$` or `PS>`).