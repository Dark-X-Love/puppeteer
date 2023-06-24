const express = "express";
const { openPage } = "../scraper/scraper.js";


const PORT = process.env.PORT || 3000;

express.get("/notes", async (req, res) => {
  const result = await openPage();
  console.log("Result is:");
  res.send(await result);
});

app.listen(PORT);
