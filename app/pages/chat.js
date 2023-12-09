const socket = io('http://localhost:3333')

const params = new URLSearchParams(window.location.search)
const username = params.get("username")
const room = params.get("select_room")

const messages = document.querySelector('.messages')

const element = document.querySelector('.username')
element.innerHTML = `Hey ${username} - ${room}` 

socket.emit('select_room', {
    username,
    room
}, (response) => {
    messages.innerHTML += response.map(item => {
        return createLayout({
            createdAt: item.createdAt,
            message: item.message,
            username: item.username
        })
    }).join('')
})

const inputMessage = document.querySelector('#message')
inputMessage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const message = e.target.value

        const data = {
            username,
            room,
            message
        }

        socket.emit('message', data)

        e.target.value = ''
    }
})

socket.on('message', (data) => {
    const { username, room, createdAt, message } = data

    const layout = createLayout({
        username,
        message,
        createdAt
    })

    messages.innerHTML += layout
})

function createLayout({username, message, createdAt}) {
    return `
        <div>
            <strong>${username}</strong>
            <span>${message} - ${createdAt}</span>
        </div>
    `
}