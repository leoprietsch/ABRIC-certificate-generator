import { parse } from "csv-parse";
import express from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import Certificate from "./entities/Certificate";

const app = express();
const port = process.env.PORT;

app.use(fileUpload());
app.use(express.json());

app.post("/", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file as UploadedFile;

  const headers = ["name", "project", "fair", "prize", "email"];

  parse(
    file.data,
    {
      columns: headers,
      from: 2,
      trim: true,
    },
    (error, results: Certificate[]) => {
      if (error) {
        console.error(error);
        res.send(error);
      }

      res.send(results);
    }
  );
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
