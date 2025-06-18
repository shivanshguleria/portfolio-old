var express = require('express');
var router = express.Router();

const path = require('path');
const app = require('../app.js')
const packageVersion = require("../package.json");
const views = require('../views.json')
const routes = require("./routes.json")       
const fs = require('fs');
const { json } = require('express/lib/response.js');
require('dotenv').config();
let projectsUrl = "/projects/"

// 1 GET commit version from GITHUB API  *START*
let appVer = "<sdsd>";
console.log(appVer)
let options = {
  headers: {
    'User-agent': "shivanshguleria"
  }
}



//2 Upload new book  *START*
if(process.env.PORT === "3000"){
  //GET upload 
  router.get('/files/upload', (req, res) => {
    res.render("upload", {
      title: "Upload"
    });
  });
  
  //POST upload
  router.post('/upload', (req,res) => {
    let id = Object.keys(views.books).length + 1;
    let title = req.body.title;
    let author = req.body.cauthor;
    let link = "https://files.shivanshguleria.ml/src/books/" + title + ".pdf";
    let size = req.body.size;
    let page = req.body.pages;
    const data = fs.readFileSync("./views.json");
    let myObject= JSON.parse(data);
    let newData = {
      id: id,
      title: title,
      author: author,
      link: link,
      size: size,
      pages: page 
    };
    myObject['books'].push(newData);
    jsonStr = JSON.stringify(myObject);
    fs.writeFile("./views.json", jsonStr, (err) => {
      // Error checking
      if (err) throw err;
      console.log("New data added");
    });
    res.json({message: "Files Added"});
  })
  }
  else{
    router.get('/files/upload', (req, res) => {
      res.redirect("https://www.youtube.com/watch?v=H8ZH_mkfPUY");
    });
  
    router.post('/upload', (req,res) => {
      res.redirect("https://www.youtube.com/watch?v=H8ZH_mkfPUY");
    });
  }

// 2 *END*

//GET home page. 
router.get('/', function(req, res) {

  // res.redirect("https://shivanshguleria.xyz")
  res.render('index', {
    title: 'Shivansh Guleria',
    views: views
  });
});

router.get('/web', function(req, res) {
  res.render('index', {
    title: 'Shivansh Guleria',
    views: views
  });
});

//GET about
router.get('/about', function(req, res) {
  res.render('about', {
    title: 'About',
    version: appVer
  });
});

//GET 404
router.get('/404', function(req, res){
  res.render('404', {title: 'Page Not Found'});
});

//GET test
router.get('/test',function(req, res){
  res.render('test', {title : '!!This is a Test!!'})
})

//GET resume
router.get('/resume', function(req, res) {
  res.sendFile(path.resolve('public/Resume.pdf'));
});

//GET sitemap
router.get('/sitemap', function(req, res) {
  res.sendFile(path.resolve('public/sitemap.xml'));
});

//GET files
router.get('/files', function(req, res) {
  res.render('files', {
    title: "Files",
    views: views
  })
});

//GET projects
router.get('/projects',(req, res) => {
  res.render('projects', {
    title: "Projects",
    views: views
  })
})

router.get("/v3", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://fonts.googleapis.com" rel="preconnect" />
    <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
    <style>
      body {
        font-family: Roboto, sans-serif;
        font-weight: 500;
        background: #1f1f1f;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        margin: 0;
      }
      #main {
        padding: 0 24px;
        height: 100vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 40px;
      }
      h1 {
        font-size: 4em;
      }
      h3 {
        font-size: 2em;
      }
      a {
        color: #94594f;
        margin: 15px;
        text-decoration: none;
      }
      a:hover {
        color: #834f46;
      }
    </style>
  </head>
  <body>
    <div id="main">
      <div>
        <h1>Shivansh Guleria</h1>
      </div>
      <div>
        <h3>Final year student at SRM IST, Chennai</h3>
        <div>
          <a href="https://0x10.wiki">Blog</a>
          <a href="https://shivanshguleria.fly.dev#projects">Projects</a>
          <a href="https://shivanshguleria.fly.dev/resume">Resume</a>
        </div>
      </div>
    </div>
  </body>
</html>`);
});
//GET all misc proojects
for(let i = 0; i < routes.routes.length; i++) {
let link = routes.routes[i].link
let route = routes.routes[i].path
router.get(projectsUrl  + link, (req, res) => {
  res.sendFile(path.resolve(route))
})
}

//GET jsprojects/leadsTracker-extension
router.get(projectsUrl + "leadsTracker-extension", (req, res) => {
  res.redirect("https://files.shivanshguleria.ml/src/misc/leadsTracker.zip")
})

console.log(process.env.PORT)
module.exports = router;
