const PORT = 8000;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
const fs = require('fs');
const multer = require('multer');

const openai = require("openai");

const API_KEY = process.env.API_KEY

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        console.log('file', file);
        cb(null, Date.now()+ "-"+file.originalname);
    }
})
const upload = multer({storage: storage}).single('file');

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
      console.log(data.data)
      res.send(data.data)
  } catch (error) {
    console.error(error);
  }
});


app.post("/upload", async (req,res) => {
    upload(req, res, (err)=> {
        if(err instanceof multer.MulterError){
            return res.status(500).json(err);
        }else if(err){
            return res.status(500).json(err);
        }
        console.log(req.file);
    })

//     const options = {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           prompt: req.body.message,
//           n: 2,
//           size: "1024x1024",
//         }),
//       };
//   try {
//     const response = await fetch(
//         "https://api.openai.com/v1/images/generations",
//         options
//       );
//       const data = await response.json();
//       console.log(data.data)
//       res.send(data.data)
//   } catch (error) {
//     console.error(error);
//   }
});

app.listen(PORT, () => console.log("Your server is running on PORT " + PORT));
