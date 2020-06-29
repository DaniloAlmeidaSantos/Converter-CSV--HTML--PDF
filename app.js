// Packages
const express       = require("express");
const app           = express();
const bodyParser    = require("body-parser");
const connection    = require("./Models/database/database");

// Converter source
const Reader        = require("./src/Reader");
const Processor     = require("./src/Processor");
const Table         = require("./src/Table");
const HtmlParser    = require("./src/HtmlParser");
const Writer        = require("./src/Writer");
const PDFWriter     = require("./src/PDFWriter");

var lector  = new Reader();
var write   = new Writer();

// Middleware
const multer = require("./Middlewares/multer");

// Models
const HTML  = require("./Models/HTML");
const PDF   = require("./Models/PDF");
const CSV   = require("./Models/CSV");

// View Engine
app.set('view engine', 'ejs');

// Static
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Connecting in database
connection
    .authenticate()
    .then(() => {
        console.log("Connection is success!");
    }).catch((error) => {
        console.log(error);
    });

app.get("/", (req, res) => {
    HTML.findAll().then(html => {
        PDF.findAll().then(pdf => {
            res.render("index", {html: html, pdf: pdf});
        })
    })
});

app.post("/upload", multer.single('file'), (req, res) => {
    if (req.file) {
        CSV.create({file: req.file.filename}).then(() => {
            res.redirect("/converter");
        }).catch(error => {
            console.log("Error: " + error);
        })
    } else {
        res.send("<h1>Error</h1> <a href='/'> voltar </a>");
    }
});

app.get("/converter", async (req, res) => {
    try {
        var csv = await CSV.findOne({order: [['id', 'DESC']]});
        
        var data = await lector.Read("./uploads/" + csv.file);
        var dataProccess = Processor.Process(data);

        // Count rows and columns in table
        var object = new Table(dataProccess);
        
        // Transforming file in .HTML file
        var html = await HtmlParser.Parser(object);
        var nameFile     = Date.now();

        // Converting 
        write.Write("./public/convert/" + nameFile + ".html", html);
        PDFWriter.writePdf("./public/convert/" + nameFile + ".PDF", html);

        // Inserting file in Database
        HTML.create({file: nameFile + ".html"});
        PDF.create({file: nameFile + ".PDF"});

        res.render("success");
    } catch(error) {
        console.log(error);
        res.redirect("/");
    }
});

app.get("/iframe/html/:id", (req, res) => {
    var id = req.params.id;

    HTML.findOne({where: {id: id}}).then(file => {
        res.render("iframe", {file: file});
    })
});

app.get("/iframe/pdf/:id", (req, res) => {
    var id = req.params.id;

    HTML.findOne({where: {id: id}}).then(file => {
        res.render("iframe", {file: file});
    })
});

// Port where is running
app.listen(8080, () => {
    console.log("Server is running");
});