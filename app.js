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
// Create get, post, and delete route chain for requests targeting all articles
app.route("/articles")
.get(function(req, res){
    Article.find(function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        } else {
            res.send(err);
        }
    });
})
.post(function(req, res){
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err){
        if(!err){
            res.send("Successfully added a new article.");
        } else {
            res.send(err);
        }
    });
})
.delete(function(req, res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("Successfully deleted all articles.");
        } else {
            res.send(err);
        }
    });
    });
    ///////////////////////// End all article route chain ////////////////////////////
// Route chain for request targeting a specific article
app.route("/articles/:articleTitle")
.get(function(req, res){
Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
    if(foundArticle){
        res.send(foundArticle);
    } else {
        res.send("No articles matching that title was found.");
    }
});
})
.put(function(req, res){
    Article.updateOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        function(err){
            if(!err){
                res.send("Successfully updated article.");
            }
        }
    );
})
.patch(function(req, res){
    Article.updateOne(
        {title: req.params.articleTitle},
        {$set: req.body},
        function(err){
            if(!err){
                res.send("Successfully updated article.");
            } else {
                res.send(err);
            }
        }
    );
})
.delete(function(req, res){
    Article.deleteOne(
        {title: req.params.articleTitle},
        function(err){
            if(!err){
                res.send("Successfully deleted the corresponding article.");
            } else {
                res.send(err);
            }
        }
    );
});




///////////////////////////// End async function main ////////////////////////
};


// Heroku port
let port = process.env.PORT || 3000
app.listen(port, ()=>{
console.log("server running on " + port)})