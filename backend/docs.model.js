const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Docs = new Schema({
  doc_title: {
    type: String
  },
  doc_contents: {
    type: String
  },
  doc_slug: {
    type: String
  } //,
  //doc_last_edited: {
  //    type: Date  // to be added soon
  //}
});

module.exports = mongoose.model("heroku_zfhjfjf0", Docs);
