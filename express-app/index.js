const express = require("express");
const path = require("path");
const fs = require("fs");
const { createServer } = require('http');
const app = express();
const { Server } = require('socket.io');
const server = createServer(app);
const PORT = 3000;
const io = new Server(server);

let messages = [];

app.use(
  '/public',
  express.static(path.resolve(__dirname, "public"), {
    maxAge: 10000,
  })
);

// set the view engine to ejs
app.set("view engine", "ejs");

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat_message', (msg) => {
    console.log('message: ' , msg);
    // write messsage to  a database
    messages.push(msg);
    io.emit('chat_message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// get all pages
let results = [];
function scanPages(dirName) {
  const files = fs.readdirSync(dirName);
  for (const file of files) {
    const filePath = path.join(dirName, file);
    const fileStat = fs.statSync(filePath);
    if (fileStat.isDirectory()) {
      scanPages(filePath);
    } else {
      results.push(filePath);
    }
  }
}
scanPages(path.resolve(__dirname, "./pages"));

results = results.map((f) => {
  let rPath = f.split(path.resolve(__dirname, "./pages"))[1];
  let page = rPath.split("/index.ejs")[0];
  if (page == "") {
    page = "/";
  }
  return { page, renderPath: f, messages };
});


// main function
function main(pages) {
  for (let index = 0; index < pages.length; index++) {
    const { page, renderPath, messages } = pages[index];
    app.get(page, function (req, res) {
      res.render(renderPath, { messages });
    });
  }

  // run the server
  server.listen(PORT, () => console.log(`Listening to PORT :: ${PORT}`));
}

main(results);


// Steps 
/**
 *  1) create dir pages
 *  2) create folder name and it should have index.ejs
 *  3) loop through all folders in pages dir : which module to access the file system fs sync and async
 *  4) for each folder name we need to create a route
 *  5) for each route created we need to serve the index.ejs file present in the folder
 */


/**
 *  STEPS FOR WEBSOCKET 
 *  HTTP : concection between server and client (browser, mobile)
 *  handshake , GET, PUT POST
 *  http://, ws://, https:// wss://
 *  stateless and statefull 
 *  quiz_question server listens here for submissions
 *  leaderboard channel client listens for broadcasts
 */
