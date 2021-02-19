import express from "express";

import Logger from "./lib/Logger";
import "./database";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  return response.status(200).json({
    message: "Olá mundo!!!",
  });
});

app.listen(3333, () => {
  Logger.debug("Server running on http://localhost:3333");
});
