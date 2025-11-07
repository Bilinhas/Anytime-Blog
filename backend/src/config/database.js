const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

async function openDb() {
  const db = await sqlite.open({
    filename: "./blog.db",
    driver: sqlite3.Database,
  });

  await db.run(`
        CREATE TABLE IF NOT EXISTS User (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        );
    `);

  await db.run(`
        CREATE TABLE IF NOT EXISTS Post (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT,
            texto TEXT,
            userId INTEGER,
            FOREIGN KEY(userId) REFERENCES User(id)
        );
    `);

  await db.run(`
        CREATE TABLE IF NOT EXISTS Comment (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            texto TEXT,
            postId INTEGER,
            userId INTEGER,
            FOREIGN KEY(postId) REFERENCES Post(id),
            FOREIGN KEY(userId) REFERENCES User(id)
        );
    `);

  return db;
}

module.exports = openDb;
