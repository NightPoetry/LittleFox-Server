# LittleFox-Server
a small web server，can use cli or api to run.
## Init����ʼ����
 ```bash
 $ npm init
 ```
## ����̨�����й���

����һ�����ڿ���̨�������й��ߣ�֧����������ָ�

- `remote`: Զ�̺���������������һ���ļ���·����һ���˿ں���Ϊ����������һ��Զ�̺���������������ָ���˿ڣ�����ָ���ļ���·����Ѱ�Һ�����ִ�С�
- `server`: ��̬�ļ�������������һ���ļ���·����һ���˿ںź�һ��Ĭ����ҳ·����Ϊ����������һ����̬�ļ�������������ָ���˿ڣ�����ָ���ļ���·����Ѱ���ļ������ظ������ߡ���������·����һ��Ŀ¼����ָ��Ŀ¼�е���ҳ�������ָ����ҳ��ʹ��Ĭ����ҳ��

### ʹ�÷���

����ͨ������̨��������ָ����ʹ�øù��ߣ�

```bash
$ node Main.js
 remote -d /path/to/dir -p 8080
```

�����ָ�������һ��Զ�̺��������������� 8080 �˿ڣ����� `/path/to/dir` Ŀ¼��Ѱ�Һ�����ִ�С�

```bash
$ node Main.js
 server -d /path/to/dir -p 8080 -h /path/to/default/homepage.html
```

�����ָ�������һ����̬�ļ������������� 8080 �˿ڣ����� `/path/to/dir` Ŀ¼��Ѱ���ļ������ظ������ߡ���������·����һ��Ŀ¼���򷵻� `/path/to/default/homepage.html` �ļ���

### ָ�����˵��

#### `remote` ָ��

- `-d, --dir_path`: �����������ʾ�ļ���·����
- `-p, --port`: ��ѡ��������ʾ�˿ںţ�Ĭ��Ϊ `26688`��

#### `server` ָ��

- `-d, --dir_path`: �����������ʾ�ļ���·����
- `-p, --port`: ��ѡ��������ʾ�˿ںţ�Ĭ��Ϊ `80`��
- `-h, --default_homepage`: ��ѡ��������ʾĬ����ҳ·����Ĭ��Ϊ `index.html`��

### ����˵��

#### `RemoteFunctionServer(port, path)`

- `port`: �����������ʾ�˿ںš�
- `path`: �����������ʾ�ļ���·����

�ú�������һ��Զ�̺���������������ָ���˿ڣ�����ָ���ļ���·����Ѱ�Һ�����ִ�С�

#### `AddServer(port, dir_path, default_homepage)`

- `port`: �����������ʾ�˿ںš�
- `dir_path`: �����������ʾ�ļ���·����
- `default_homepage`: ��ѡ��������ʾĬ����ҳ·����Ĭ��Ϊ `index.html`��

�ú�������һ����̬�ļ�������������ָ���˿ڣ�����ָ���ļ���·����Ѱ���ļ������ظ������ߡ���������·����һ��Ŀ¼���򷵻�Ĭ����ҳ��

### API��ʽ
ʹ��API��ʽʱ����
```javascript
const RemoteFunctionServer = require(: "./Server/RemoteFunctionServer");
const AddServer = require("./Server/StaticServer.js").AddServer;
```
����ͬ��
## ʾ��

����������� Node.js ��Ŀ��ʹ�� LittleFox-Server ��ʾ�����룺

```javascript
const RemoteFunctionServer = require("./Server/RemoteFunctionServer");
const AddServer = require("./Server/StaticServer.js").AddServer;

// ����Զ�̺���������
const port = 8080;
const path = "/path/to/dir";
RemoteFunctionServer(port, path);

// ������̬�ļ�������
const dir_path = "/path/to/dir";
const default_homepage = "/path/to/default/homepage.html";
AddServer(80, dir_path, default_homepage);
```

��δ���������һ��Զ�̺����������������˿� 8080������ `/path/to/dir` Ŀ¼�в���Ҫִ�еĺ�������������һ����̬�ļ��������������˿� 80������ `/path/to/dir` Ŀ¼�е��ļ����ظ������ߡ���������·����һ��Ŀ¼����ʹ�� `/path/to/default/homepage.html` �ļ���ΪĬ����ҳ��

# LittleFox-Server

LittleFox-Server is a small web server that can be run using both CLI and API. It supports the following two commands:

- `remote`: Remote function server. Receives a directory path and a port number as parameters, starts a remote function server that listens on the specified port, and looks for functions in the specified directory path to execute.
- `server`: Static file server. Receives a directory path, a port number, and a default homepage path as parameters, starts a static file server that listens on the specified port, and looks for files in the specified directory path to return to the requester. If the requested path is a directory, use the specified homepage in the directory. If no homepage is specified, use the default homepage.

## Usage

You can use the following commands in the CLI to use this tool:

```bash
$ node Main.js
 remote -d /path/to/dir -p 8080
```

This command starts a remote function server that listens on port 8080 and looks for functions to execute in the `/path/to/dir` directory.

```bash
$ node Main.js
 server -d /path/to/dir -p 8080 -h /path/to/default/homepage.html
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