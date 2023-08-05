const router = require("express").Router();
const { join } = require("path");
const { readFile, writeFile } = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const dbPath = join(__dirname, "..", "db/db.json");

async function readDb() {
  return readFile(dbPath).then((data) => {
    return JSON.parse(data);
  });
}

// GET NOTES

router.get("/notes", (req, res) => {
  console.info("notes recieved");
  return readDb()
    .then((notes) => {
      console.info("notes sent");

      if (notes.length === 0) {
        return res.status(200).json([]);
      }
      return res.status(200).json(notes);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

// Save Notes

async function saveNotes(newNote) {
  return readDb().then(async (notes) => {
    let newNotes = notes;
    newNotes.push(newNote);

    return writeFile(dbPath, JSON.stringify(newNotes)).then(() => {
      console.log("Added to file");
    });
  });
}

router.post("/notes", (req, res) => {
  const { title, text } = req.body;
  if (!(title && text)) {
    console.info("No title  and text");
    return res.status(400);
  }
  const newNote = {
    title,
    text,
    id: uuidv4(),
  };

  return saveNotes(newNote)
    .then(() => {
      console.info("Added note to db");
      return res.status(201);
    })
    .catch((err) => {
      console.info("Did not save new note");
      return res.status(500).json(err);
    });
});

module.exports = router;
