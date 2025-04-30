const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 8000;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads/test");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploads = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post("/upload", uploads.single("pfp-file"), async (req, res) => {
//   console.log(req.body, req.file);
  return res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
