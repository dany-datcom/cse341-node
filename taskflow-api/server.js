const express = require("express");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./swagger.json");

const { connectDB } = require("./database/connect");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/users", require("./routes/users"));
app.use("/projects", require("./routes/projects"));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT || 8080, () => {
    console.log("Server Running");
  });
};

startServer();