var ws = require("websocket.io");
var server = ws.listen(8080,
  function () {
    console.log("ws start");
  }
);

var clients = [];
server.on("connection", function(ws){
  clients.push(ws);
  
  var _userId = getRandNumberFromRange(1,99);
  var _data = '{"type":"SET_USER_ID","userId":' + _userId + '}';
  ws.send(_data)
  ws.userId = _userId; 

  clients.forEach(function(client){
    //client.send("UserId:" + client.userId + " has joined the chatroom!");
    var _data = '{"type":"ADD_PLAYER","userId":' + ws.userId + '}';
    client.send(_data);
    //setInterval(function(ws){
    //client.send("Hello!");
    //},3000)
    /*
    for (i=0;i<clients.length;i++){
      var _data = '{"type":"ADD_PLAYER","userId":' + ws.userId + '}';
      clients[i].send(_data);
    }*/
  })
    
  ws.on("message",function(message){
    console.log(message);
    for (i=0;i<clients.length;i++){
      clients[i].send(message);
    }
  })
  
  ws.on("close",function(){
      var x = clients.indexOf(ws);
      clients.splice(x,1);
      console.log(clients.name + " clients are  still in the room");
      clients.forEach(function(client){
      var _data = '{"type":"REMOVE_PLAYER","userId":' + ws.userId + '}';
      client.send(_data);
    })
  })
});


var getRandNumberFromRange = function (min,max) {
    var rand = min + Math.floor( Math.random() * (max - min));
    return rand;
};

