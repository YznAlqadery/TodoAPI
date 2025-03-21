import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
// If there a PORT value in the environment, use it, otherwise use 8000
const PORT = process.env.PORT || 8000;

// Get the file path from the URL of the current module
// import.meta.url is the URL of the current module
const __filename = fileURLToPath(import.meta.url);
// Get the directory path from the file path
const __dirname = dirname(__filename);

//Middleware
app.use(express.json());
// Serve the HTML file from the public directory (/public)
// Tells express to serve all files from the public folder as static assets /
// file. Ay requests for the CSS files will be resolved to the public directory.
app.use(express.static(path.join(__dirname, "../public")));

// Serve the static files from the public directory (/public)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
