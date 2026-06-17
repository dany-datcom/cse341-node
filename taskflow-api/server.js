const express = require("express");
const session = require("express-session");
const swaggerUi = require("swagger-ui-express");

require("dotenv").config();

const passport = require("./config/passport");
const swaggerDocument = require("./swagger.json");
const { connectDB } = require("./database/connect");

const app = express();

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "test-secret-key", 
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth"));

app.use("/users", require("./routes/users"));
app.use("/projects", require("./routes/projects"));
app.use("/tasks", require("./routes/tasks"));
app.use("/teams", require("./routes/teams"));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);


app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  console.error(err.stack);
  res.status(500).json({ 
    error: "Internal Server Error",
    message: err.message 
  });
});


const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};


if (require.main === module) {
  startServer();
}

module.exports = app;