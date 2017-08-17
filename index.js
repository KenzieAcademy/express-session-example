const express = require("express");
const session = require("express-session");
const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
    if (typeof req.session.count === "undefined") {
      req.session.count = 0;
    }
    if (req.originalUrl === '/down' && req.session.count === 0) {
      const error = new Error('AAAAAAHHH');
      req.status = 500;
      next(error);
    } else {
      next();
    }
});

app.use((err, req, res, next) => {
  // res.send('TESTING');
  res.redirect('/');
});

app.get("/", (req, res) => {
  res.send(`
      <a href="/down">-</a>
      <span>${req.session.count}</span>
      <a href="/up">+</a>
  `)
});

app.get("/up", (req, res) => {
  req.session.count += 1;
  res.redirect("/");
});

app.get("/down", (req, res) => {
  req.session.count -= 1;
  res.redirect("/");
});



app.listen(3000, () => console.log("Mm...fresh outta puns today...."));
