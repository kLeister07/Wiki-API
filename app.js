const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


// Run main function and catch error, run async function for mongoose
main().catch(err => console.log(err));
async function main() {
  // For local server
  await mongoose.connect('mongodb://localhost:27017/wikiDB');
  // For mongoDB atlas
//   await mongoose.connect('mongodb+srv://admin-kevin:toyotamr2@atlascluster.4jtuj3y.mongodb.net/wikiDB');
 
// Create schema
const articleSchema = {
    title: String,
    content: String
};
// Create model
const Article = mongoose.model("Article", articleSchema);





    // End async function main
};


// Heroku port
let port = process.env.PORT || 3000
app.listen(port, ()=>{
console.log("server running on " + port)})