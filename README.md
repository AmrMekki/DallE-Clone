# DallE-Clone

## Acknowledgment
This project is done following a tutorial from the great [Code with Ania Kubów](https://www.youtube.com/channel/UC5DNytAJ6_FISueUfzZCVsw)

## Overview
This project is a DallE Clone done using the OpenAI Api for **Image Generation / Image Variation**

## How to work on project
- Make sure to have `NodeJs` `npm` `React`
- Install the following npm packages `dotenv` `express` `cors` `fs` `fs-extra` `multer` (Or you can simply run npm install with the cloned package.json)
- Clone Project
- Run `npm install`
- After your node_modules is download
- Create an `.env` file with the API Key inside it `API_KEY = sk-....`
- change directory `cd .\react-dalle-clone-openai\`
- Run `npm run start:frontend` for the React Application
- Run `npm run start:backend` for the Node Server


## Preview

### UI
![UIScreen](https://github.com/AmrMekki/DallE-Clone/assets/59305451/091cdad3-320e-4492-a6fd-79ff8269245e)
A simple UI with a surprise me button to generate random sentences, a generate button, and the ability to upload pictures and 

### Image Creation

#### Surprise Me
![SurpriseMe](https://github.com/AmrMekki/DallE-Clone/assets/59305451/e358bb48-29f3-43c1-8816-c209f94d50b6)
An example of the surprise me button

#### Results
![PromptResults](https://github.com/AmrMekki/DallE-Clone/assets/59305451/e89b36a6-cd55-4e3f-b037-a8ca8cef8326)
We can now see the returned images from the DallE API
The number of returned images can be controlled through the `n` parameter in the body request to the API

### Image Variation

#### Uploading an image
Another route to take is to upload a picture
> Picture has to be 256x256 and in `png` format, in the future I will resize and reformat inside the application itself

![PictureUpload](https://github.com/AmrMekki/DallE-Clone/assets/59305451/ce3a6bbe-b18c-4c82-8d45-92421d571c41)
Now when we click generate we will see the produced variations of our selected image

#### Variation Results
![Variations](https://github.com/AmrMekki/DallE-Clone/assets/59305451/83515aaf-5921-4999-aacd-c0c06376c6c2)


