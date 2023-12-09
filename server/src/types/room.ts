export interface User {
    socketId: string
    username: string
    room: string
}

export interface Message {
    username: string
    message: string
    room: string
    createdAt: Date
}