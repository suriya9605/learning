import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

export const _filename = fileURLToPath(import.meta.url);
export const _dirname = path.dirname(_filename);

console.log(_filename, "_filename");
console.log(_dirname, "_dirname");

app.get("/", (req, res) => {
  res.send("Hello from ES6 module!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
