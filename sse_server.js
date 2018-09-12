'use strict';
const http = require('http');

// 服务器声明接下来发送的是事件流
http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',

  });

  //发消息
  setInterval(() => {
    res.write('event:slide\n'); //
    res.write(`id: ${+new Date()}\n`); //消息ID
    res.write(`data:${+new Date()}\n`); //消息数据
    res.write('retry:10000\n'); //重连时间
    res.write('\n\n');
  }, 3000);


  // 发送注释保持长链接
  setInterval(() => {
    res.write(':\n\n');
  }, 12000);

}).listen(2002);