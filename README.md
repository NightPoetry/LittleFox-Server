# LittleFox-Server
a small web server,can use cli or api to run.
## 控制台命令行工具

这是一个基于控制台的命令行工具，支持以下两个指令：

- `remote`: 远程函数服务器，接收一个文件夹路径和一个端口号作为参数，启动一个远程函数服务器，监听指定端口，并在指定文件夹路径下寻找函数并执行。
- `server`: 静态文件服务器，接收一个文件夹路径、一个端口号和一个默认主页路径作为参数，启动一个静态文件服务器，监听指定端口，并在指定文件夹路径下寻找文件并返回给请求者。如果请求的路径是一个目录，请指定目录中的主页，如果不指定主页则使用默认主页。

### 使用方法

可以通过控制台输入以下指令来使用该工具：

```bash
$ node Main.js remote -d /path/to/dir -p 8080
```

上面的指令会启动一个远程函数服务器，监听 8080 端口，并在 `/path/to/dir` 目录下寻找函数并执行。

```bash
$ node cli.js server -d /path/to/dir -p 8080 -h /path/to/default/homepage.html
```

上面的指令会启动一个静态文件服务器，监听 8080 端口，并在 `/path/to/dir` 目录下寻找文件并返回给请求者。如果请求的路径是一个目录，则返回 `/path/to/default/homepage.html` 文件。

### 指令参数说明

#### `remote` 指令

- `-d, --dir_path`: 必填参数，表示文件夹路径。
- `-p, --port`: 可选参数，表示端口号，默认为 `26688`。

#### `server` 指令

- `-d, --dir_path`: 必填参数，表示文件夹路径。
- `-p, --port`: 可选参数，表示端口号，默认为 `80`。
- `-h, --default_homepage`: 可选参数，表示默认主页路径，默认为 `index.html`。

### 函数说明

#### `RemoteFunctionServer(port, path)`

- `port`: 必填参数，表示端口号。
- `path`: 必填参数，表示文件夹路径。

该函数启动一个远程函数服务器，监听指定端口，并在指定文件夹路径下寻找函数并执行。

#### `AddServer(port, dir_path, default_homepage)`

- `port`: 必填参数，表示端口号。
- `dir_path`: 必填参数，表示文件夹路径。
- `default_homepage`: 可选参数，表示默认主页路径，默认为 `index.html`。

该函数启动一个静态文件服务器，监听指定端口，并在指定文件夹路径下寻找文件并返回给请求者。如果请求的路径是一个目录，则返回默认主页。

### API形式
使用API形式时请用
```javascript
const RemoteFunctionServer = require(: "./Server/RemoteFunctionServer");
const AddServer = require("./Server/StaticServer.js").AddServer;
```
功能同上
## 示例

以下是如何在 Node.js 项目中使用 LittleFox-Server 的示例代码：

```javascript
const RemoteFunctionServer = require("./Server/RemoteFunctionServer");
const AddServer = require("./Server/StaticServer.js").AddServer;

// 启动远程函数服务器
const port = 8080;
const path = "/path/to/dir";
RemoteFunctionServer(port, path);

// 启动静态文件服务器
const dir_path = "/path/to/dir";
const default_homepage = "/path/to/default/homepage.html";
AddServer(80, dir_path, default_homepage);
```

这段代码启动了一个远程函数服务器，监听端口 8080，并在 `/path/to/dir` 目录中查找要执行的函数。还启动了一个静态文件服务器，监听端口 80，并将 `/path/to/dir` 目录中的文件返回给请求者。如果请求的路径是一个目录，则使用 `/path/to/default/homepage.html` 文件作为默认主页。

# LittleFox-Server

LittleFox-Server is a small web server that can be run using both CLI and API. It supports the following two commands:

- `remote`: Remote function server. Receives a directory path and a port number as parameters, starts a remote function server that listens on the specified port, and looks for functions in the specified directory path to execute.
- `server`: Static file server. Receives a directory path, a port number, and a default homepage path as parameters, starts a static file server that listens on the specified port, and looks for files in the specified directory path to return to the requester. If the requested path is a directory, use the specified homepage in the directory. If no homepage is specified, use the default homepage.

## Usage

You can use the following commands in the CLI to use this tool:

```bash
$ node Main.js remote -d /path/to/dir -p 8080
```

This command starts a remote function server that listens on port 8080 and looks for functions to execute in the `/path/to/dir` directory.

```bash
$ node cli.js server -d /path/to/dir -p 8080 -h /path/to/default/homepage.html
```

This command starts a static file server that listens on port 8080 and returns files in the `/path/to/dir` directory to the requester. If the requested path is a directory, use the `/path/to/default/homepage.html` file as the homepage.

## Command Parameters

### `remote` Command

- `-d, --dir_path`: Required. Specifies the directory path.
- `-p, --port`: Optional. Specifies the port number. Default is `26688`.

### `server` Command

- `-d, --dir_path`: Required. Specifies the directory path.
- `-p, --port`: Optional. Specifies the port number. Default is `80`.
- `-h, --default_homepage`: Optional. Specifies the default homepage path. Default is `index.html`.

## Function Description

### `RemoteFunctionServer(port, path)`

- `port`: Required. Specifies the port number.
- `path`: Required. Specifies the directory path.

This function starts a remote function server that listens on the specified port and looks for functions to execute in the specified directory path.

### `AddServer(port, dir_path, default_homepage)`

- `port`: Required. Specifies the port number.
- `dir_path`: Required. Specifies the directory path.
- `default_homepage`: Optional. Specifies the default homepage path. Default is `index.html`.

This function starts a static file server that listens on the specified port and returns files in the specified directory path to the requester. If the requested path is a directory, use the specified homepage in the directory. If no homepage is specified, use the default homepage.
## API Usage

If you want to use LittleFox-Server in your Node.js project, you can use the following API:

```javascript
const RemoteFunctionServer = require("./Server/RemoteFunctionServer");
const AddServer = require("./Server/StaticServer.js").AddServer;
```

These functions provide the same functionality as the CLI commands. You can use `RemoteFunctionServer` to start a remote function server and `AddServer` to start a static file server.

## Example

Here's an example of how to use LittleFox-Server in your Node.js project:

```javascript
const RemoteFunctionServer = require("./Server/RemoteFunctionServer");
const AddServer = require("./Server/StaticServer.js").AddServer;

// Start a remote function server
const port = 8080;
const path = "/path/to/dir";
RemoteFunctionServer(port, path);

// Start a static file server
const dir_path = "/path/to/dir";
const default_homepage = "/path/to/default/homepage.html";
AddServer(80, dir_path, default_homepage);
```

This code starts a remote function server that listens on port 8080 and looks for functions to execute in the `/path/to/dir` directory. It also starts a static file server that listens on port 80 and returns files in the `/path/to/dir` directory to the requester. If the requested path is a directory, use the `/path/to/default/homepage.html` file as the homepage.
