const Koa = require("koa")
const path = require("path")
const static = require("koa-static")
const mount = require('koa-mount');
const Router = require('koa-router');
const fs = require('fs-extra');
const http = require("http");
const ws = require('ws')
const sharp = require('sharp');
const {
	basename
} = require("path");
let router_pool = new Map(); //key = port
let pathMessage = new Map(); //key = router
let history = []; //历史指令
const PortPool = require('./Tool/PortPool.js');
const port_pool = new PortPool();
// 生成缩略图的函数
function generateThumbnail(imagePath) {
	const thumbnailDir = path.join(path.dirname(imagePath), "thumbnail");
	const thumbnailPath = path.join(thumbnailDir, `${path.basename(imagePath, path.extname(imagePath))}_thumbnail${path.extname(imagePath)}`);
	console.log(thumbnailPath);

	if (!fs.existsSync(imagePath)) {
		console.error("原始图片不存在");
		return null;
	}

	if (!fs.existsSync(thumbnailDir)) {
		fs.mkdirSync(thumbnailDir);
	}

	if (fs.existsSync(thumbnailPath)) {
		const thumbnailStat = fs.statSync(thumbnailPath);
		const expirationTime = 24 * 60 * 60 * 1000; // 24小时的有效期
		const currentTime = new Date().getTime();

		if (thumbnailStat.isFile() && (currentTime - thumbnailStat.mtime.getTime()) < expirationTime) {
			return thumbnailPath;
		}
	}

	return new Promise((resolve, reject) => {
		sharp(imagePath)
			.resize(200, 200)
			.toFile(thumbnailPath, (err, info) => {
				if (err) {
					console.error(err);
					reject(err);
				} else {
					console.log(info);
					resolve(thumbnailPath);
				}
			});
	});
}

function StaticServer(port, dir_path, default_homepage = "index.html") {
	const validImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
	const router = new Router();
	let app = port_pool.addPort(port);

	router.get(`/${path.basename(dir_path)}`, async (ctx) => {
		ctx.response.redirect(`/${path.basename(dir_path)}/${default_homepage}`);
	});


	router.get(new RegExp(`^/${path.basename(dir_path)}/(.*)$`), async (ctx, next) => {
		const imagePath = ctx.params[0].replace(`/${path.basename(dir_path)}/`, '');
		const isHQ = ctx.query.hq === 'true'; //加u人hq=true;就能获取高清图片。

		// 判断请求的路径是否是一个图片
		console.log(imagePath);
		const ext = path.extname(imagePath).toLowerCase();
		if (!validImageExtensions.includes(ext)) {
			await next();
			return; //交由后续插件
		}

		// 根据hq参数决定返回缩略图还是原图
		if (isHQ) {
			// 返回原图
			ctx.response.type = 'image/jpeg'; // 根据实际图片类型进行设置
			ctx.response.body = fs.createReadStream(path.join(dir_path, imagePath));
		} else {
			// 返回缩略图
			const thumbnailPath = await generateThumbnail(path.join(dir_path, imagePath));
			ctx.response.type = 'image/jpeg'; // 根据实际缩略图类型进行设置
			ctx.response.body = fs.createReadStream(thumbnailPath);
		}
	});

	app.use(router.routes());
	app.use(mount(`/${path.basename(dir_path)}`, static(dir_path)));
}
//开启服务
function AddServer(port, dir_path, default_homepage = "index.html") {
	history.push(arguments); //记得electron也要使用一次记录，然后所谓的重启直接在electron端重启koa进程即可，不需要在这里重启。
	StaticServer(...arguments);
	return {
		url: `/${path.basename(dir_path)}/${default_homepage}`
	}
}

function RunningPageMessage() {
	function ProjectMessage(port, dir_path) {
		this.port = port;
		this.name = path.basename(dir_path);
		this.path = dir_path;
	}
	let project_messages = [];
	for (let port of port_pool) {
		let router = router_pool.get(port);
		let path = pathMessage.get(router);
		project_messages.push(new ProjectMessage(port, path));
	}
	return project_messages;
}
module.exports.AddServer = AddServer;
module.exports.RunningPageMessage = RunningPageMessage;