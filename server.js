const express = require("express");
const morgan = require("morgan");
const app = express();
const playstore = require("./playstore.js");
app.use(morgan("common"));
const cors = require("cors");
app.use(cors());
app.use(morgan("common")); // let's see what 'common' format looks like

app.get("/apps", (req, res) => {
  const { genres, sort } = req.query;

  if (sort) {
    if (!["rating", "app"].includes(sort)) {
      return res.status(400).send("Sort must be one of rating or app");
    }
  }
  if (genres) {
    if (
      !["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(
        genres
      )
    ) {
      return res
        .status(400)
        .send(
          "Genres must be one of Action, Puzzle, Strategy, Casual, Arcade or Card"
        );
    }
  }
  let results = playstore;

  if (genres) {
    results = playstore.filter((a) => a.Genres == genres);
  }

  if (sort === "rating") {
    results.sort((a, b) => {
      return a.Rating > b.Rating ? 1 : a.Rating < b.Rating ? -1 : 0;
    });
  } else if (sort === "app") {
    results.sort((a, b) => {
      return a.App.toLowerCase() > b.App.toLowerCase()
        ? 1
        : a.App.toLowerCase() < b.App.toLowerCase()
        ? -1
        : 0;
    });
  }
  res.json(results);
});

module.exports = app;

// app.listen(8000, () => {
//   console.log("Server started on PORT http://localhost:8000/apps");
// });
