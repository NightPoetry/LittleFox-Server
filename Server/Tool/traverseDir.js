const fs = require("fs-extra")
const path = require("path")


function traversingDir(filePath, root_handle, dir_handle, file_handle, completed_fuc = () => {}) {
	//根据文件路径读取文件，返回文件列表
	let root_path = filePath
	let files = fs.readdirSync(filePath)
	root_handle();
	//遍历读取到的文件列表
	files.forEach(function(filename) {
		//获取当前文件的绝对路径
		var filedir = path.join(filePath, filename);
		//根据文件路径获取文件信息，返回一个fs.Stats对象
		let stats = fs.statSync(filedir)
		var isFile = stats.isFile(); //是文件
		var isDir = stats.isDirectory(); //是文件夹
		if (isFile) {
			file_handle(filedir, path.relative(root_path, filedir));
		}
		if (isDir) {
			if (dir_handle(filedir, path.relative(root_path, filedir)))
				traversingDir(filedir, () => {}, dir_handle, file_handle, () => {}); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
		}
	});
	// setTimeout(() => {
	completed_fuc();
	// },10000)
}
module.exports = traversingDir