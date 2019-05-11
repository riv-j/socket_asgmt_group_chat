const express = require('express');
const app = express();
const server = app.listen(1337, function(){
  console.log('Listening on port 1337');
});
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

io.on('connection', function(socket){
  socket.on('user_name', function(name){
    socket.emit('new_user', {name: name});
  });
  
});

app.get('/', function(res, req){
  res.prependListener('index');
})