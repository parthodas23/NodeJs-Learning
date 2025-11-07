const express = require("express");
const app = express();
app.use(express.json());

const notes = [
  {
    id: 1,
    title: "learning nodejs",
    content: "will learn how to implement the CRUD routes.",
  },
];

// Read
app.get("/notes", (req, res) => {
  if (!notes) return res.status(404).json({ message: "Notes not found" });
  res.status(201).json(notes);
});

//Create
app.post("/notes", (req, res) => {
  const newData = {
    id: notes.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  notes.push(newData);
  if (!newData)
    return res.status(404).json({ message: "Request data not found" });
  res.status(201).json(notes);
});

// Update
app.put("/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === parseInt(req.params.id));

  if (!note) return res.status(404).json({ message: "Id couldn't found." });
  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;

  res.status(200).json({ message: "notes updated", note });
});

// delete
app.delete("/notes/:id", (req, res) => {
  const noteIndex = notes.findIndex((n) => n.id === parseInt(req.params.id));

  if (noteIndex === -1)
    return res.status(404).json({ message: "Id couldn't found." });

  notes.splice(noteIndex, 1);

  res.status(200).json({ message: "Notes deleted", notes });
});

app.listen(3000, () => {
  console.log("running 3000");
});
