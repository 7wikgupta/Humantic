const express = require("express");
const app = express();
const port = 3000;
// const apiKey = 'lGn48f2kxrL6bZUd8vH1jJpS7tW0e9yM';

const programmingLanguagesRouter = require("./routes/programmingLanguages");
app.use(express.json());

const API_KEY = 'lGn48f2kxrL6bZUd8vH1jJpS7tW0e9yM';
const IP_WHITELIST = '192.168.51.66';





app.use((req, res, next) => {
  // Check for the presence of the API key in the request headers
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(401).json({ message: 'Unauthorized: Missing API key' });
  }

  // Verify the API key
  if (apiKey !== API_KEY) {
    return res.status(401).json({ message: 'Unauthorized: Invalid API key' });
  }

  const clientIp = req.ip;

  // if (!clientIp) {
  //   return res.status(401).json({ message: 'Unauthorized: Missing IP header' });
  // }
  // if (clientIp !== IP_WHITELIST) {
  //   return res.status(401).json({ message: 'Unauthorized: IP address not in whitelist' });
  // }
  next();

});

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/programming-languages", programmingLanguagesRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});