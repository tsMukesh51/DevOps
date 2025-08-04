import express from "express";
import { prismaClient } from "db";

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  prismaClient.user.findMany()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})

app.post("/user", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
  }

  prismaClient.user.create({
    data: {
      username,
      password
    }
  })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})

app.get("/", (req, res) => {
  res.send("<p>See User List at: http://dpl-dockr.tsm51.dev</p><p>Create user by post at: http://http.dpl-dockr.tsm51.dev</p>");
})

const server = app.listen(3000, () => console.log(`http listening at 3000`));


process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  server.close(() => {
    console.log('shut down gracefully')
    process.exit(0)
  })
});
process.on('SIGINT', () => {
  console.log('SIGINT received');
  server.close(() => {
    console.log('shut down gracefully')
    process.exit(0)
  })
});