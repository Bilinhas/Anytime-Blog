const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Mandatory username and password." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await req.db.run(
      "INSERT INTO User (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    const novoUserId = result.lastID;
    res.status(201).json({
      id: novoUserId,
      username,
      message: "Successfully registered user.",
    });
  } catch (error) {
    if (error.errno === 19) {
      return res.status(409).json({ error: "Username already exists." });
    }
    console.error(error);
    res.status(500).json({ error: "Error while registering the user." });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Mandatory username and password." });
  }

  try {
    const user = await req.db.get("SELECT * FROM User WHERE username = ?", [
      username,
    ]);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    res.json({
      userId: user.id,
      username: user.username,
      message: "Login succesful.",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
