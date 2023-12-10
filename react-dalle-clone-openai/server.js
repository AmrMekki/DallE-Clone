const PORT = 8000;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
const fs = require("fs");
const multer = require("multer");

const openai = require("openai");

const API_KEY = process.env.API_KEY;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    console.log("file", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("file");
let filePath;

app.post("/images", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: req.body.message,
      n: 2,
      size: "1024x1024",
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      options
    );
    const data = await response.json();
    console.log(data.data);
    res.send(data.data);
  } catch (error) {
    console.error(error);
  }
});

app.post("/upload", async (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    filePath = req.file.path;
    console.log(filePath);
    res.send(filePath);
  });
});

app.post("/variations", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "multipart/form-data",
    },
    body: JSON.stringify({
      image: fs.createReadStream(filePath),
      n: 2,
      size: "256x256",
    }),
  };
  try {
    const image = await openai.images.createVariation({
        image: fs.createReadStream("otter.png"),
      });
    
    console.log(image.data);
    // const response = await fetch(
    //   "https://api.openai.com/v1/images/variations",
    //   options
    // );
    // const data = await response.json()
    // console.log(data);
    // res.send(response.data.data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log("Your server is running on PORT " + PORT));
