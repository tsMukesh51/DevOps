import express, { type NextFunction, type Request, type Response } from "express";

const app = express();

app.get('/', (req, res) => {
  res.json({
    message: "Namaste, welcome",
  });
});

app.get('/timer', async (req, res) => {
  await new Promise(s => setTimeout(s, Math.random() * 10000));
  res.json({
    message: "Did nothing actually",
  });
});

app.get('/cpu', async (req, res) => {
  const BIG_INT = 10_000_000_000;
  for (let i = 0; i < BIG_INT; i++) {
    const rand = Math.random();
  }
  res.json({
    message: "Did something, nothing",
  });
});

app.listen(3000, () => console.log(`Listening at 3000`));