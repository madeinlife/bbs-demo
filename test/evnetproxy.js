var EventProxy = require('eventproxy');
var ep = EventProxy();

ep.on('error',function(msg){
	console.log('=======error=======');
	console.log(msg);
});
ep.on('ok',function(data){
	console.log('=====ok========');
	console.log(data);
});

ep.emit('error','错误信息1');
ep.emit('ok','ok信息内容');
ep.emit('error','error2');
