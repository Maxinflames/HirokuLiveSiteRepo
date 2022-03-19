import http from "http"; // imported pre-bundled module(s)
import fs from "fs";
import mime from 'mime-types'; // third-party module
let lookup = mime.lookup; // Alias for mime.lookup

const port = process.env.PORT || 3000;

// Create an Instance of a Server (Immutable)
const server = http.createServer((req, res) => {
  let path = req.url as string;
  if(path == "/" || path == "/home")
  {
    path = "/index.html";
  }

  let mime_type = lookup(path.substring(1)) as string;

  fs.readFile(__dirname + path, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end("ERROR: 404 - File Not Found! " + err.message);
      return;
    }
    res.setHeader("X-Content-Type-Options", "nosniff"); // security guard
    res.writeHead(200, {'Content-Type': mime_type});
    res.end(data);
  });
});

// like addEventListener("user req on port")
server.listen(port, () => {
  console.log(`Server running at Port:${port}`);
});
