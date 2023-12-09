import { io } from "./app"
import { Message, User } from './types/room'

const users: User[] = []
const messages: Message[] = []

io.on('connection', socket => {
    socket.on('select_room', (data: Omit<User, 'socketId'>, callback) => {
        const { room, username } = data

        socket.join(room)

        const userAlreadyExist = users.find(user => {
            return user.username === username && user.room === room
        })

        if (userAlreadyExist) {
            userAlreadyExist.socketId = socket.id
        } else {
            users.push({
                socketId: socket.id,
                room,
                username
            })
        }
        
        const messagesRoom = getMessagesRoom(room)
        callback(messagesRoom)
    })

    socket.on('message', (data) => {
        const { username, message, room } = data

        const saveMessage: Message = {
            username,
            message,
            room,
            createdAt: new Date()
        }

        messages.push(saveMessage)

        io.to(room).emit('message', saveMessage)
    })
})

function getMessagesRoom(room: string) {
    const message = messages.filter(item => {
        return item.room === room
    })

    return message
}