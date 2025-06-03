const server=require("socket.io")(5000,{
    cors:"http://localhost:5500"
})

const users={}

server.on("connect",(socket)=>{   // connect is built in keyword  
    socket.on("new-user-joined",name=>{
        users[socket.id]=name  // when new user join then display user name
        socket.broadcast.emit("user-joined",name) // broadcast me jisne join usko chodkr baki sbko btata hai ki new user ne join kiya
    })

    socket.on("send",message=>{ // send event mtlb kisi ne msg send kiya
            socket.broadcast.emit("receive",{name:users[socket.id],message :message})
    })

    socket.on("disconnect",()=>{
        socket.broadcast.emit("user-left",users[socket.id])
        delete users[socket.id]
    })
})