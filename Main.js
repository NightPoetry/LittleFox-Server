const RemoteFunctionServer = require("./Server/RemoteFunctionServer");
const AddServer = require("./Server/StaticServer.js").AddServer;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("请输入具体指令");

rl.on('line', (input) => {
  const args = input.split(" ");
  const command = args[0];
  if (command === "start") {
    const port = args[1] || 8080;
    const path = args[2] || ".";
    const server = new RemoteFunctionServer(port, path);
    server.start();
  } else if (command === "serve") {
    const port = args[1] || 80;
    const dir_path = args[2] || ".";
    const default_homepage = args[3] || "index.html";
    AddServer(port, dir_path, default_homepage);
  } else {
    console.log("无效指令，请重新输入");
  }
});