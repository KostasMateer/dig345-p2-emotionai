require('dotenv').config()
const path = require("path");
const express = require("express");
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "public")));

// api key
const apiKey = process.env.API_KEY;

// this is the default api endpoint
app.get("/api", async (req, res) => {
    res.json({
      message: "server is live",
    });
  });

// sets up path to serve static files
app.use(express.static(path.join(__dirname, "public")));

// starts the server
app.listen(port, async () => {
  console.log(`Social media app listening on port ${port}`);
});
