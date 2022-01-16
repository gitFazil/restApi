const http = require("http");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config();
const PORT = process.env.PORT;
const server = http.createServer(app);
server.listen(PORT, () =>
  console.log("server is runnig on port http://localhost:" + PORT)
);

// var fs = require("fs");
// //2.
// var server = http.createServer(function (req, resp) {
//   //3.
//   if (req.url === "/create") {
//     fs.readFile("index.html", function (error, pgResp) {
//       if (error) {
//         resp.writeHead(404);
//         resp.write("Contents you are looking are Not Found");
//       } else {
//         resp.writeHead(200, { "Content-Type": "text/html" });
//         resp.write(pgResp);
//       }

//       resp.end();
//     });
//   } else {
//     //4.
//     resp.writeHead(200, { "Content-Type": "text/html" });
//     resp.write(
//       "<h1>Product Manaager</h1><br /><br />To create product please enter: " +
//         req.url
//     );
//     resp.end();
//   }
// });
// //5.
