// import express from "express";
// const app = express();

// app.get('/',(req,res)=>{
//     console.log("connected from ", req.ip);
//     res.send("HOME");});

// app.listen(8000,()=>{
//     console.log("started");
// });

// const WebSocket = require('ws')

// const wss = new WebSocket.Server({server});

// wss.on('connection', function (ws) {
//     console.log('new connection')
// })
// import "index.html"
import {WebSocketServer} from "ws";
import {createServer} from "http";
import express from "express";
import path from "path";
const app = express();
app.get('/',(req,res)=>{
    res.sendFile("C:/Users/rushi/projects/project1/index.html");
})
app.listen(4000,()=>{
    console.log("server listenining 4000");
})
const server = createServer();
const wss = new WebSocketServer({
    server
});
const port = 8000;
server.listen(port,function(){
    console.log("ready for socket at 8000");
})

wss.on("connection", (client,req)=> {
    // console.log(req.socket);
    console.log("connected", req.socket.localPort, req.socket.remoteAddress, req.socket.remotePort);
    
    // const name = req.headers.name;
    
    // wss.clients.forEach(c => console.log(c.name));
    client.on('close', ()=>{
        console.log("disconnected");
    })
    
    client.on("message", (data)=>{
        // console.log(data,typeof(data));
        // const dta1 = data.toJSON();
        // console.log(dta1);
        const dta = data.toString();
        console.log(dta);
        const dict = JSON.parse(dta);
        console.log(dict);
        // console.log(dta1,typeof(dta1));
        // console.log(dta,typeof(dta));
        // console.log(dict,typeof(dict));
        // console.log(wss.clients);
        // console.log(dict["to"]);

        // console.log(dta,dta1,dict,data);
        // console.log(typeof(data));
        // client.send("sent");
        if (dict["user"]){
            client.name = dict["user"];
            console.log(dict["user"]);
        }
        else{
            wss.clients.forEach(receiver =>{
            // console.log(receiver.name);
            if(receiver.name == dict["to"]){
                const msg = {
                    "from": client.name,
                    "data": dict["data"]
                };
                const dep = JSON.stringify(msg);
                receiver.send(dep);
                console.log(dep);
            }
        
        }) 
        }

    })

});
