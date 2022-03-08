const socket = io()
const title = document.head.querySelector("title")
const container = document.querySelector(".messages-container")
const usersContainer = document.getElementById("active-users")

let SAVE_MSG = "save-receive-message"
let saved_msg = []
const message = {
    send : function(e){
        e.preventDefault()
        socket.emit("send-message", users.user_id, this.querySelector("#message-input").value)
        this.querySelector("#message-input").value = ''
    },

    receive : function(sender , msg){ // sender is user_id which sends us message
        // save messages to localstorage
        let alreadyExist = saved_msg.findIndex(save => save.key == sender)
        if(alreadyExist < 0){
            saved_msg.push({[sender] : [[], []], key : sender})
            alreadyExist = saved_msg.length - 1
        }

        if(users.user_id === sender){
            ShowMessage(msg);
            saved_msg[alreadyExist][sender][0].push(msg) // 0 index is read msgs
        }
        else{
            saved_msg[alreadyExist][sender][1].push(msg) // 1 index is unread msgs

            const sender_user_ele = document.getElementById(`${sender}`)
            const count_unread = saved_msg[alreadyExist][sender][1].length;

            users.unread_icon.add(sender_user_ele, count_unread)
        }

        localStorage.setItem(SAVE_MSG , JSON.stringify(saved_msg))

        if(document.hidden) title.innerHTML = `📲(${this.totalUnreadMsgs()}) Profile - ${__name}`

    },

    totalUnreadMsgs() {
        const totalUnreadMSGs = saved_msg.reduce((prev , current) => {
            return prev + current[current.key][1].length
        }, 0)
        return totalUnreadMSGs
    }
}
function ShowMessage(msg){
    const msgBox = document.createElement('div')
    msgBox.innerHTML = msg
    container.appendChild(msgBox)
}

const users = {
    user_id : null,  // store active user id to whom we chat
    set(_users){
        usersContainer.innerHTML = ''
        _users.forEach( user => {
            if(user == __name) return;
            const userDiv = document.createElement('div')
            userDiv.classList.add('user')
            userDiv.setAttribute('id', `${user}`)
            userDiv.innerHTML = `<span class="user-name">${user}</span>`
            usersContainer.appendChild(userDiv)
        })

        if(this.user_id){
            // add selected icon when user id is selected but text not show or removed
            const userDiv = document.getElementById(this.user_id)
            if(!userDiv)
            {
                this.user_id = null // if our previous user not not live we make it null
                return;
            }
            prevClickElement = userDiv
            this.selected_icon.add(userDiv)

        }
    },
    selected_icon : {
        add(userDiv){
            const select = document.createElement('span')
            select.innerHTML = "Selected"
            select.classList.add('select-user')
            userDiv.appendChild(select)
        },
        remove(){
            prevClickElement && prevClickElement.removeChild(prevClickElement.lastElementChild)
        }
    },
    unread_icon : {
        add(userDiv, count_unread){
            // if already exists don't create again just write text
            const isUnreadLie = userDiv.querySelector('.count-unread')
            if(isUnreadLie){
                isUnreadLie.innerHTML = count_unread
                return;
            }
            // not exists create
            const unread_div = document.createElement('span')
            unread_div.innerHTML = count_unread
            unread_div.classList.add('count-unread')
            userDiv.appendChild(unread_div)
        },
        remove(){
            prevClickElement && prevClickElement.removeChild(prevClickElement.querySelector(".count-unread"))
        }
    }
}

let prevClickElement = null
usersContainer.addEventListener("click" , (e)=>{
    // if we click again clicked element or if invalid click encounter than return
    if(prevClickElement == e.target || !e.target.querySelector('.user-name')) return;

    // gets click user id 
    users.user_id = e.target.querySelector('.user-name').innerText 

    // selected icon add and remove
    users.selected_icon.remove()
    const userDiv = prevClickElement = e.target
    users.selected_icon.add(userDiv)

    // if unread_msg_icon added than remove it on click 
    const isUnreadLie = userDiv.querySelector('.count-unread')
    isUnreadLie && users.unread_icon.remove()

    // changed unread msgs to read msgs and store to localstorage
    let alreadyExist = saved_msg.findIndex(save => save.key == users.user_id)

    if(alreadyExist > -1){
        let read_msg   = saved_msg[alreadyExist][users.user_id][0] 
        let unread_msg = saved_msg[alreadyExist][users.user_id][1] 
        saved_msg[alreadyExist][users.user_id][0] = [...read_msg, ...unread_msg]
        unread_msg.length = 0
        localStorage.setItem(SAVE_MSG, saved_msg)
    }

    // clear msg_container && append all msgs to container
    container.innerHTML = ''
    alreadyExist > -1 && saved_msg[alreadyExist][users.user_id][0].forEach( msg => ShowMessage(msg))

})


const __name = prompt("What is your name ?")
title.innerText = `Profile - ${__name}`

socket.emit('connection-on', __name)
socket.on('active-users', (_users)=> users.set(_users))
socket.on("receive-message", (sender, msg)=> message.receive(sender, msg))

document.querySelector('#form').addEventListener('submit', message.send)

const connection = {
    off(){
        socket.emit("connection-off", __name)
        localStorage.clear()
    }
}

window.addEventListener("focus", ()=>{
    title.innerText = `Profile - ${__name}`
})