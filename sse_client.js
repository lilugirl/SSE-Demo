'use strict';

if (window.EventSource) {
  //创建 EventSource 对象链接服务器
  const source = new EventSource('http://localhost:2002');

  // 链接成功后会触发open事件
  source.addEventListener('open', () => {
    console.log('Connected');
  }, false);


  // 服务器发送信息到客户端时，如果没有event字段 ，默认会触发message事件
  source.addEventListener('message', e => {
    console.log(`data:${e.data}`);
  }, false);


  // 自定义EventHandler，在收到字段为slide的消息时触发
  source.addEventListener('slide', e => {
    console.log(`data:${e.data}`);
  });


  // 链接异常时触发error事件 并自动重连
  source.addEventListener('error', e => {
    if (e.target.readState === EventSource.CLOSED) {
      consolelog('Disconnected');
    } else if (e.target.readState === EventSource.CONNECTING) {
      console.log('Connecting...');
    }
  }, false);





} else {
  console.error('Your brower doesn\'t support SSE');
}