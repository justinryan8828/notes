const router = require("express").Router();
const { join } = require("path");

router.get("/", (req, res) => {
  return res.sendFile(join(__dirname, "..", "public/index.html"));
});

router.get("/notes", (req, res) => {
  return res.sendFile(join(__dirname, "..", "public/notes.html"));
});

module.exports = router;