import express from "express";
import { openPage } from "../scraper/scraper.mjs";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/notes", async (req, res) => {
  const result = await openPage();
  console.log("Result is:");
  res.send(await result);
});

app.listen(PORT);
