const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());

app.get("/professional", (req, res) => {
  const data = {
    professionalName: "Dany Jimenez",
    base64Image: "",

    nameLink: {
      firstName: "Dany",
      url: "https://github.com/dany-datcom"
    },

    primaryDescription: "I am a software development student passionate about backend development.",
    workDescription1: "I have experience in technical support and networking.",
    workDescription2: "Currently learning Node.js and JavaScript.",

    linkTitleText: "My Links",

    linkedInLink: {
      text: "LinkedIn",
      link: "www.linkedin.com/in/dany-jimenez-051672b4"
    },

    githubLink: {
      text: "GitHub",
      link: "https://github.com/dany-datcom"
    }
  };

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});