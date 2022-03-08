import { Server } from "socket.io"

const users = {}
const ioconnect = (server)=>{
    const io = new Server(server)
    
    io.on('connection', socket => {

        socket.on('connection-on' , (data)=> {
            users[data] = socket.id
            const users_arr = Object.keys(users)
            io.emit("active-users", users_arr)
        })

        socket.on('send-message', (user, msg)=>{
            const room_id = users[user]
            for(let sender in users)
                // sender contain key of users
                if(users[sender] === socket.id)
                    user = sender 
            
            room_id && socket.to(room_id).emit("receive-message", user ,msg)
        })

        socket.on("connection-off", (user)=>{
            delete users[user]
            const users_arr = Object.keys(users)
            io.emit("active-users", users_arr)
            socket.on("disconnect", ()=>{})
        })
    })
}

export default ioconnect;