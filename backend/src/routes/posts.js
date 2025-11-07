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

router.get("/", async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const posts = await req.db.all(
      `
        SELECT p.id, p.titulo, SUBSTR(p.texto, 1, 100) as resumo, u.username
        FROM Post p
        JOIN User u ON p.userId = u.id
        ORDER BY p.id DESC
        LIMIT ? OFFSET ?
      `,
      [limit, offset]
    );

    const { count } = await req.db.get("SELECT COUNT(*) as count FROM Post");
    res.json({ posts, totalPages: Math.ceil(count / limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while listing posts." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await req.db.get(
      `
        SELECT p.id, p.titulo, p.texto, u.username
        FROM Post p
        JOIN User u ON p.userId = u.id
        WHERE p.id = ?
      `,
      [req.params.id]
    );
    if (!post) return res.status(404).json({ error: "Post not found." });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Error while loading post." });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { titulo, texto } = req.body;
  const userId = req.userId;

  if (!titulo || !texto)
    return res.status(400).json({ error: "Mandatory title and text." });

  try {
    const result = await req.db.run(
      "INSERT INTO Post (titulo, texto, userId) VALUES (?, ?, ?)",
      [titulo, texto, userId]
    );
    res.status(201).json({ id: result.lastID, titulo, texto, userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while creating post." });
  }
});

module.exports = router;
