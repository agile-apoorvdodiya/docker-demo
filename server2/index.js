const express = require("express");
const { execSync } = require("child_process");
const config = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const { extname, join } = require("path");
const { readdirSync } = require("fs");

config.config();

const app = express();

const port = (() => {
  if (!process.env.PORT) return 3000;
  else return Number(process.env.PORT);
})();

app.use(cors());

app.get("/", (req, res) => {
  let message = "This message is from server 2";
  res.json({ message });
});

app.listen(port, () => {
  console.info("listening on port: ", port);
});
