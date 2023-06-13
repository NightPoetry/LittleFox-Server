const RemoteFunctionServer = require(: "./Server/RemoteFunctionServer");
const AddServer = require("./Server/StaticServer.js").AddServer;
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (data) {
  // 解析控制台输入
  var input = data.trim().split(' ');
  var command = input[0];
  var options = {};
  // 解析指令参数
  for (var i = 1; i < input.length; i += 2) {
    var key = input[i].replace(/^-+/, '');
    var value = input[i + 1];
    options[key] = value;
  }
  // 执行对应的函数
  switch (command) {
    case 'remote':
      RemoteFunctionServer(options.port || 26688, options.dir_path);
      break;
    case 'server':
      AddServer(options.port, options.dir_path, options.default_homepage);
      break;
    default:
      console.log('Unknown command: ' + command);
  }
});

function RemoteFunctionServer(port, path) {
  // 在这里编写 RemoteFunctionServer 的代码
  console.log('RemoteFunctionServer is running on port ' + port + ' with path ' + path);
}

function AddServer(port, dir_path, default_homepage) {
  // 在这里编写 AddServer 的代码
  console.log('Server is running on port ' + port + ' with dir_path ' + dir_path + ' and default_homepage ' + default_homepage);
}