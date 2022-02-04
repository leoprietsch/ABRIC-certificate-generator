import express from "express";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Initial setup");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
