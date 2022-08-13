require("dotenv").config();
const express = require("express");
const connectToMongo = require("./data/db.js");
const PORT = process.env.PORT || 8000;
const { errorHandling } = require("./middlewares/errorHandling.js");
const Cors = require("cors");
const path = require("path");


connectToMongo();

const app = express();
app.use(Cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/events", require("./rest/_club.js"));
app.use("/api/users", require("./rest/_user.js"));

//frontend aanroepen
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Zet in production"));
}

app.use(errorHandling);

app.listen(PORT, () => console.log(`server draait op poort: ${PORT}`.yellow));
