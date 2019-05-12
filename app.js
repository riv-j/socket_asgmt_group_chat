// APP SETUP //
const express = require('express');
const path = require('path');  
const app = express();
const server = app.listen(1337, function(){
  console.log('Listening on port 1337');
});
const io = require('socket.io')(server);

var connections = [];
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// APP SETUP //

// LISTEN for connection emission
io.on('connection', function(socket){ 
  // socket is pushed to the connections array
  // this is simply to keep count of how many
  // connections are currently opened
  connections.push(socket);
  console.log(`Connected users: `, connections.length)

  // Once connected, begin listening for user name
  socket.on('user_name', function(data){ 
    // when name received from client, alert everyone
    io.emit('new_user', {name: data.name,id: socket.id}); 
  });

  socket.on('disconnect', function(){
    // when there a connection closes
    // update everyone with the socket id
    io.emit("user_disconnect", socket.id)
  });

});

app.get('/', function(req, res){
  res.render('index');
})