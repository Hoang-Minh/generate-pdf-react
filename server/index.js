const express = require("express");
const pdf = require("html-pdf");
const cors = require("cors");
const flash = require("connect-flash");
const pdfTemplate = require("./documents");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());

// app.use((req, res, next) => {
//   res.locals.error = req.flash("error");
//   res.locals.success = req.flash("success");
//   next();
// });

// POST -PDF generate pdf
app.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (error) => {
    if (error) {
      console.log(error);
      //req.flash("error", "Something is wrong, unable to create a pdf");
      return res.send(Promise.reject(error));
    }
    //req.flash("success", "Successful create pdf");
    console.log("success !!!");
    return res.send(Promise.resolve());
  });
});

app.get("/fetch-pdf", (req, res) => {
  console.log("fetch pdf !!!");
  res.sendFile(`${__dirname}/result.pdf`);
});

app.listen(port, () => {
  console.log(`server is up at ${port}`);
});
