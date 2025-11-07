const express = require("express");
const router = express.Router();

const authMiddleware = (req, res, next) => {
  const userId = req.header("X-User-ID");
  if (!userId || isNaN(parseInt(userId))) {
    return res.status(401).json({ error: "Access denied." });
  }
  req.userId = parseInt(userId);
  next();
};

router.get("/:postId", async (req, res) => {
  try {
    const comments = await req.db.all(
      `
      SELECT c.id, c.texto, u.username
      FROM Comment c
      JOIN User u ON c.userId = u.id
      WHERE c.postId = ?
      ORDER BY c.id DESC
    `,
      [req.params.postId]
    );
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Error while searching for comments." });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { postId, texto } = req.body;
  const userId = req.userId;

  if (!postId || !texto)
    return res.status(400).json({ error: "Mandatory post ID and text." });

  try {
    const result = await req.db.run(
      "INSERT INTO Comment (postId, texto, userId) VALUES (?, ?, ?)",
      [postId, texto, userId]
    );
    res.status(201).json({
      id: result.lastID,
      postId,
      texto,
      userId,
      message: "Commentary criated.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while creating comment." });
  }
});

module.exports = router;
