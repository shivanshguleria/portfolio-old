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
  res.send("1")
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

router.get("/v4", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>~</title>
<link rel="stylesheet" href="/v4.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">
  </head>
  <body>
    <main>
    <a class="a" style="font-size: larger;" href="https://shivanshguleria.xyz">View Latest Version</a>
    <br />
        <section class="links">
          <a class="a" href="#skill-heading">~/skills</a>
          <a class="a" href="#project-heading">~/projects</a>
          <a class="a" href="#exp-heading">~/experience</a>
          <a class="a" href="#writing-heading">~/writings</a>
          <!-- <a href=""></a> -->
        </section>
      <section class="heading">
        <h1>Shivansh Guleria</h1>

      </section>
      <section class="icons">
        <a href="https://github.com/shivanshguleria/"><img class="svg" src="/download.svg" alt="github svg" /></a>
        <a href="https://www.linkedin.com/in/shivanshguleria/"><img class="svg" src="/l.svg" alt="linkedin svg" /></a>
      </section>
      <section class="desc">
        <p>Hello there!</p>
        <!-- <p>I am Shivansh Guleria, I am from Mandi, Himachal Pradesh. Currently in second year of Engineering in CS. I am very much interested in Blockchain, AI/Ml.<br> Apart from this I am geek in finance, economics, cryptocurrency. During my free time i like to watch anime, go for a walk.</p>
      -->
    <p> I am a skilled software developer with expertise designing, developing, and deploying scalable applications with proficienncy in numerous
        programming languages and databases, particularly C++, JavaScript, Python, MongoDB, MySQL, and Postgres. Passionate about
        backend development and deep learning.
      </p>
    </section>
      <section class="skills" >
        <h2 id="skill-heading" class="marge">~/Skills</h2>
        <ul class="marge1">
          <li>Programming Languages & Tools</li>
          <ul>
            <li><p>Language- C/C++, Python, JavaScript</p></li>
            <li><p>Frameworks- ReactJS, NextJS, FastAPI</p></li>
            <li><p>Database- MySQL, Postgres, MongoDB, Redis</p></li>
            <li<p>Systems- Linux, Windows</p></li>
            <li><p>Other- Git, Bash, Docker</p></li>
          </ul>
        </ul>
      </section>
      <section class="project">
        <h2 id="project-heading">~/Projects</h2>
        <ul>
          <li>
            <a href="https://smilenshine/">~\smile & shine Dental Care/a>
            <p>Website created for smile N shine Dental Clinic</p>
          </li>
          <li>
            <a href="https://shortCuts.fly.dev/">~\shortCuts</a>
            <p>Your go to URL shortner</p>
          </li>
          <li>
            <a href="https://58eb193a4f9217dccd081aa801e3905ca7cc17202ed0f7453bdf69ae25ecff1.space/">~\fileFlow</a>
            <p>Easily share file across web</p>
          </li>
          <li>
            <a href="https://codefuel.fly.dev/">~\codeFuel</a>
            <p>Web application to upload courses and get certified</p>
          </li>
          <li>
            <a href="https://loc8r.shivanshguleria.ml/">~\Loc8r</a>
            <p>
              MEAN Stack application that helps you find wifi and places to work
              when you are out
            </p>
          </li>
          <li>
            <a href="https://github.com/ShivanshGuleria/Get-It-Quick"
              >~\Get-It-Quick</a
            >
            <p>Recommends jobs on basis of resume</p>
          </li>
          <li>
            <a href="/projects">~\Misc</a>
            <p>Projects Done as part of learning X skill</p>
          </li>
        </ul>
      </section>
      <section class="exp">
        <h2 id="exp-heading">~/Experience</h2>
        <ul>
          <li>
            <p>
              <a  href="https://srmiec.com/"
                >~\SRM Indian Energy Conference</a
              >
            </p>
            <ul>
              <li><p>AUG 2022-Aug 2023</p></li>
            </ul>
          </li>
          <li>
            <p>
              <a
                
                href="https://www.linkedin.com/company/aakash-research-labs/"
                >~\ARL (Aakash Research Lab)</a
              >
            </p>
            <ul>
              <li><p>July 2022-Sep 2023</p></li>
            </ul>
          </li>
        </ul>
      </section>
      <section class="blog-accord">
        <h2 id="writing-heading">~/Writings</h2>
        <ul>
            <li>
                <a href="https://shivasnhguleria.xyz/writings/">~\Migrating Database</a>
                <div>
                    <p>22 March 2024</p>
                    <!-- <p class="context">Conext of entry</p> -->
                </div>
            </li>
            <li>
                <a href="https://shivasnhguleria.xyz/writings/">~\Auto Link Deletion in shortCuts</a>
                <div>
                    <p>22 February 2024</p>
                    <!-- <p class="context">Conext of entry</p> -->
                </div>
            </li>
        </ul>
        <a href="https://shivasnhguleria.xyz/writings/">~\more</a>
      </section>
      <br>
      <hr >
     
<center>
    <footer>
        <a href="mailto:sg@shivanshguleria.xyz">~\Email</a>
        <a href="/">~\Pgp key</a>
      </footer>
</center>
    </main>
  </body>
</html>

`)
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
