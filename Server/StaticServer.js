const Koa = require("koa")
const path = require("path")
const static = require("koa-static")
const mount = require('koa-mount');
const Router = require('koa-router');
const fs = require('fs-extra');
const {
	basename
} = require("path");
let port_pool = new Set()
let router_pool = new Map(); //key = port
let pathMessage = new Map(); //key = router
let app_pool = new Map(); //key = port
let history = [];//历史指令
function StaticServer(port, dir_path, default_homepage = "index.html") {
	//不同的port用不同的app，这样同一个项目可以在多个端口开放。
	const router = new Router();
	let app = new Koa();
	router.get(`/${path.basename(dir_path)}`, async (ctx) => {
		ctx.response.redirect(`/${path.basename(dir_path)}/${default_homepage}`);
	})
	app.use(router.routes())
	app.use(mount(`/${path.basename(dir_path)}`, static(dir_path)))
	if (!port_pool.has(port)) {
		app.listen(port);
		port_pool.add(port);
		router_pool.set(port, router);
		app_pool.set(port, app);
		pathMessage.set(router, dir_path);
	} else {
		let router = router_pool.get(port);
		let app = app_pool.get(port);
		router.get(`/${path.basename(dir_path)}`, async (ctx) => {
			ctx.response.redirect(`/${path.basename(dir_path)}/${default_homepage}`);
			// ctx.res.writeHead(200);
			// ctx.res.write(fs.readFileSync(path.join(dir_path, "./" + default_homepage)), 'binary')
			// ctx.res.end();
		})
		app.use(router.routes())
		app.use(mount(`/${path.basename(dir_path)}`, static(dir_path)))
	}
}
//开启服务
function AddServer(port, dir_path, default_homepage = "index.html") {
	history.push(arguments);//记得electron也要使用一次记录，然后所谓的重启直接在electron端重启koa进程即可，不需要在这里重启。
	StaticServer(...arguments);
	return {url:`/${path.basename(dir_path)}/${default_homepage}`}
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