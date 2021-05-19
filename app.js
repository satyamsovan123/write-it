//jshint esversion: 6

let visit = 0;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://user:password@clusterName.gh2uv.mongodb.net/dbName?retryWrites=true&w=majority", {
// mongoose.connect("mongodb://localhost:27017/writeItDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

const blogsSchema = new mongoose.Schema({
  title: String,
  content: String
});

const visitSchema = new mongoose.Schema({
  noOfVisitors: Number
});

const Post = mongoose.model("Post", blogsSchema);
const Visit = mongoose.model("Visit", visitSchema);

let fetchPostErr = false;
app.get("/", function(req, res){
  visit = visit + 1;
  const newVisit = new Visit({
    noOfVisitors: visit
  });
  newVisit.save();

  Post.find({},function(err, allPosts){
    if(!err){
      res.render("index", {posts: allPosts, fetchPostErr: fetchPostErr});
    }
    else{
      fetchPostErr = true;
      res.render("index", {fetchPostErr: fetchPostErr});
    }
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  // console.log(req.body.article);
  // console.log(req.body.title);
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content
  });
  newPost.save(function(err){
    if(!err){
      res.redirect("/");
    }
    else{
      res.redirect("/compose");
    }
  });
});

let fetchArticleErr = false;
let fetchedArticle = "";
let templating = false;
app.get("/post/:postID", function(req, res){
  templating = true;
  Post.findOne({_id: req.params.postID}, function(err, article){
    if(!err){
      // console.log(article);
      fetchedArticle = article;
      // res.render("fullpost", {article: article, fetchArticleErr: fetchArticleErr});
      // res.render("about", {article: article, fetchArticleErr: fetchArticleErr});
      // res.redirect("/about");
      res.render("about", {article: fetchedArticle, fetchArticleErr: fetchArticleErr, templating: templating});
    }
    else{
      fetchArticleErr = true;
      // res.render("fullpost", {article: article, fetchArticleErr: fetchArticleErr});
      // res.render("about", {article: article, fetchArticleErr: fetchArticleErr});
      // res.redirect("/about");
      res.render("about", {article: fetchedArticle, fetchArticleErr: fetchArticleErr, templating: templating});

    }
  });

});


app.get("/about", function(req, res){
  // res.render("about");
  templating = false;
  res.render("about", {article: fetchedArticle, fetchArticleErr: fetchArticleErr, templating: templating});

});

let port = 3000;
app.listen(process.env.PORT || port, function(){
  console.log("Server is running");
});
