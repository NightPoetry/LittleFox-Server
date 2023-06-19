const Koa = require('koa');

class PortPool {
	constructor() {
		if (PortPool.instance) {
			return PortPool.instance;
		}
		this.ports = {};
		PortPool.instance = this;
	}

	addPort(port) {
		if (!this.ports[port]) {
			const app = new Koa();
			this.ports[port] = app;
			app.listen(port); // 监听端口
		}
		return this.ports[port];
	}

	getApp(port) {
		return this.ports[port];
	}
}

module.exports = PortPool;
//单例模式