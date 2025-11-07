const express = require("express");
const cors = require("cors");
const openDb = require("./config/database");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

(async () => {
  const db = await openDb();

  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  app.use("/auth", authRoutes);
  app.use("/posts", postRoutes);
  app.use("/comments", commentRoutes);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
