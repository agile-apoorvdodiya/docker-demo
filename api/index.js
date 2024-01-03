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

// fetch version of nodejs
app.get("/", (req, res) => {
  const version = execSync("node --version").toString();
  res.json(JSON.parse(JSON.stringify({ data: version })));
});

// configure multer
const useMulter = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + extname(file.originalname));
    },
  }),
});

// upload files
app.post("/upload", useMulter.single("file"), (req, res) => {
  if (req.file) return res.json(req.file);
  else
    return res.status(400).json({
      message: "No file was provided",
    });
});

app.get("/list-files", (req, res) => {
  const uploadPath = join(__dirname, "uploads");
  const list = readdirSync(uploadPath);
  res.json({ uploadPath, list });
});

app.get("/call-service", (req, res) => {
  fetch(process.env.SERVER_2)
    .then((response) => {
      console.log("res success??", response.status);
      response.json().then((jsonResponse) => {
        res.json(jsonResponse);
      });
    })
    .catch((err) => {
      console.log("api error >> ", err);
      return res.status(500).json({ message: "somehing went wrong" });
    });
});

app.listen(port, () => {
  console.info("listening on port: ", port);
});
