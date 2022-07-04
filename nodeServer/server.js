let express = require('express');
const router = express.Router();
let app = express();
const port = process.env.PORT || 3000;


var http = require("http").Server(app);
var io = require("socket.io")(http);

const path = require("path");
const mainfile = path.join(__dirname, "../");
// console.log(__dirname)
app.use(express.static(mainfile));

app.get("/",function(req,res){
    res.sendFile(mainfile + "/index.html");

})

const activeusers = {};
io.on("connection", (socket)=>{    
            socket.on("new-user-joined", (username) => {
            console.log("New user",username);
            activeusers[socket.id]=username;
            socket.broadcast.emit("user-joined",username)
      
            socket.on("disconnect",()=>{
                console.log("user left",username);
                socket.broadcast.emit("user-left",username)
            })
            
        })

        socket.on("send",(message)=>{
            // console.log(message);
            socket.broadcast.emit("receive",{
                message: message,
                username: activeusers[socket.id]
            })
        })
    })

    

http.listen(port,function(){
    // if(err) throw err;
    console.log(`Server running at port ${port}`);
})
         
    





// const io = require('socket.io')(8000)



// io.on('connection', socket =>{
    
//             socket.on('new-user-joined', name => {
//             console.log("New user");
//             users[socket.id] = name;
//             socket.broadcast.emit('user-joined', name);
//         });
    
//         socket.on('send', message =>{
//             socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
//         });
//     })











