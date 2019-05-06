// inc and setup express
const express = require("express");
const app = express();
const docsRoutes = express.Router();

// use heroku port if defined
const PORT = process.env.PORT || 4000;

// cors req and db connectivity
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const DBString = process.env.MONGODB_URI;

// include our database module
let Docs = require("./docs.model");

// set up our app
app.use(cors());
app.use(bodyParser.json());
app.use("/docs", docsRoutes); // use docRoutes router for all req on /docs

// connect to database and set connection var
mongoose.connect(DBString, { useNewUrlParser: true });
const connection = mongoose.connection;

// try open the connection
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

// our main entry route, just return all the docs as json
docsRoutes.route("/").get(function(req, res) {
  Docs.find(function(err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.json(docs);
    }
  });
});

// if id matched then return single doc by ID
docsRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Docs.findById(id, function(err, docs) {
    res.json(docs);
  });
});

// for page view, provide slug and return single document
docsRoutes.route("/slug/:slug").get(function(req, res) {
  let slug = req.params.slug;
  Docs.findOne({ doc_slug: slug }, function(err, docs) {
    // docs is our json array
    res.json(docs);
  });
});

// update routine, match off id and then save post data
docsRoutes.route("/update/:id").post(function(req, res) {
  Docs.findById(req.params.id, function(err, docs) {
    if (!docs) res.status(404).send("data is not found");
    else
      docs.doc_title = req.body.doc_title;
      docs.doc_contents = req.body.doc_contents;
      docs.doc_slug = req.body.doc_slug;
      docs.doc_last_edited = "";
    docs
      .save()
      .then(docs => {
        res.json("Doc updated!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

// get post data and add new doc to the database
docsRoutes.route("/add").post(function(req, res) {
  let docs = new Docs(req.body);
  docs
    .save()
    .then(docs => {
      res.status(200).json({ docs: "Doc added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new doc failed");
    });
});


// find by id and then delete from database
docsRoutes.route("/delete/:id").get(function(req, res) {
  let id = req.params.id;
  Docs.findByIdAndDelete(id, function(err, docs) {
    if (err) {
      console.log("failed");
      throw err;
    }
    const response = {
      message: "Document successfully deleted",
      id: docs._id
    };
    return res.status(200).send(response);
  });
});

// listening
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
