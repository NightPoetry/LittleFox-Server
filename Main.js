const RemoteFunctionServer = require("./Server/RemoteFunctionServer");
const AddServer = require("./Server/StaticServer.js").AddServer;
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const commands = {
	"remote": (options) => {
		options.port = options.port || 2328;
		options.dir_path = options.dir_path || ".";
		RemoteFunctionServer(options.port, options.dir_path);
	},
	"serve": (options) => {
		options.port = options.port || 80;
		options.dir_path = options.dir_path || ".";
		options.default_homepage = options.default_homepage || "index.html";
		console.log("serve运行URL",AddServer(options.port, options.dir_path, options.default_homepage).url);
	}
};

const optionAliases = {
	"-d": "dir_path",
	"--dir": "dir_path",
	"-p": "port",
	"--port": "port",
	"-h": "default_homepage",
	"--homepage": "default_homepage"
};

let options = {}; // 选项对象

console.log("请输入具体指令");

rl.on('line', (input) => {
	const args = input.split(" ");
	const command = args[0];
	options = {}; // 每次输入指令时清空选项对象
	for (let i = 1; i < args.length; i++) {
		const arg = args[i];
		if (arg.startsWith("-")) {
			const optionName = optionAliases[arg];
			if (optionName) {
				options[optionName] = args[i + 1];
				i++; // 跳过下一个参数
			} else {
				console.log(`无效选项：${arg}`);
			}
		} else {
			console.log(`无效参数：${arg}`);
		}
	}
	if (commands[command]) {
		commands[command](options);
	} else {
		console.log("无效指令，请重新输入");
	}
});