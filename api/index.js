import express from "express";
import { execSync } from "child_process";
import config from "dotenv";
import cors from "cors";

config.config();

const app = express();

const port = (() => {
  if (!process.env.PORT) return 3000;
  else return Number(process.env.PORT);
})();

app.use(cors());
app.get("/", (req, res) => {
  const version = execSync("node --version").toString();
  res.json(JSON.parse(JSON.stringify({ data: version })));
});

app.listen(port, () => {
  console.log("listening on port: ", port);
});
