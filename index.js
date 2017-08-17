const express = require("express");
const app = express();

let count = 0;


app.get("/", (req, res) => {
  res.send(`
      <a href="/down">-</a>
      <span>${count}</span>
      <a href="/up">+</a>
  `)
});

app.get("/up", (req, res) => {
  count += 1;
  res.redirect("/");
});

app.get("/down", (req, res) => {
  count -= 1;
  res.redirect("/");
});

app.listen(3000, () => console.log("Mm...fresh outta puns today...."));
