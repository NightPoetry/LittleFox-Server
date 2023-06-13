//注意端口和静态资源端口不能重复
const Koa = require("koa")
const cors = require("@koa/cors")
const path = require("path")
const static = require("koa-static")
const mount = require('koa-mount');
const Router = require("koa-router");
const bodyParser = require('koa-bodyparser')
const TraversingDir = require("../../Tool/TraversingDir");
const router = new Router();
let func_dir_path_set = new Set()
let port_pool = new Set()
/**
 * @param {String} server_path 远程方法服务文件夹路径
 * @param {String} server_port 远程方法服务端口
 */
function RemoteFunctionServer(server_port, server_path) {
	let app = new Koa()
	let root_func_name = path.basename(server_path)
	if (func_dir_path_set.has(root_func_name)) {
		console.error("方法路径重复，或方法文件夹已经被加载过！")
	} else {
		func_dir_path_set.add(root_func_name);
	}
	//添加方法路由
	app.use(cors()) //允许跨域
	app.use(bodyParser())
	TraversingDir(server_path, () => {}, (filedir, relative_path) => {
		if (path.dirname(filedir) == "node_modules") return false;
	}, async (file_path, relative_path) => {
		let rel_path = relative_path.replace('\\', '/');
		let url_path = rel_path.substring(0, rel_path.indexOf('.'));
		if (path.extname(file_path) == ".js") {
			console.log("url_path", `/func/${root_func_name}/${url_path}`)
			router.post(`/func/${root_func_name}/${url_path}`, async (ctx) => {
				let func = require(file_path);
				try {
					let body_obj = ctx.request.body;
					console.log(body_obj);
					ctx.body = await func[body_obj.name](...(body_obj.data)) ?? "";
				} catch (e) {
					console.warn(e);
				}
			});
		}
	}, () => {
		app.use(router.routes())
		console.log("远程函数路由添加成功！");
	})
	if (!port_pool.has(server_port)) {
		app.listen(server_port);
		port_pool.add(server_port);
	}
}
//远程方法调用格式：单例名，方法名，参数对象
module.exports = RemoteFunctionServer