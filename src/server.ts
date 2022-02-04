import express from "express";
import fileUpload, { UploadedFile } from "express-fileupload";

const app = express();
const port = process.env.PORT;

app.use(fileUpload());
app.use(express.json());

app.get("/", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  const file = req.files.file as UploadedFile;

  res.send(file);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
