var fs = require("fs");
var http = require("http");
const path = require("path")

PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, "index.html");
const PRODUCT_HTML_FILE_PATH = path.join(__dirname, "index.html")



const handleApiRequest = (req, res) => {
    fs.readFile(DATA_FILE_PATH, "utf-8", (err, data) => {

        if (err) {
            res.writeHead(500);
            res.end(err);
            return;
        }
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(data);
    })
}

const handleProductPageRequest = (req, res) => {
    fs.readFile( PRODUCT_HTML_FILE_PATH, "utf-8", (err, data) => {

        if (err) {
            res.writeHead(500);
            res.end(err);
            return;
        }
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(data);
    })
}


const server = http.createServer(function (req, res) {
    const baseURL = req.protocol + "://" + req.headers.host + "/";
    const reqUrl = new URL(req.url, baseURL);

    let path = reqUrl.pathname
    console.log("path", path)

    switch (path) {
        case "/api":
            handleApiRequest(req, res);
            break;
        case "/product":
            handleProductPageRequest(req, res);
            break;
        default:
            res.writeHead(200);
            res.end(path);

    }

})

server.listen(PORT, () => {
    console.log(`server listining in port ${PORT}`)
})