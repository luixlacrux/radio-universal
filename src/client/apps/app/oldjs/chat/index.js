import $ from 'jquery'

const $el = $('#chat')
const $menuLeft = $el.find('#chat-leftMenu')
const $opacity = $el.find('.Chat-opacity')
const $chatRoom = $el.find('#chat-messages')
const $chatSend = $el.find('#chat-send')

var $chatTemplate = `<div class="message">
  <img class="message-userImage" src="assets/images/profile3.jpg" alt="user">
  <div class="message-container">
    <div class="author">Me</div>
    <div class="text">:message:</div>
    <time class="date">Hace 0 min</time>
  </div>`

$chatSend.keypress(ev => {
  let key = e
  if (ev.keyCode === 13 && !ev.shiftKey){
    ev.preventDefault()
    $chatSend.submit()
  }
})

$chatSend.submit(ev => {
  ev.preventDefault()
  let msg = $chatSend.find('.message').val()
  $chatSend.find('.message').val('')
  let message = $chatTemplate
    .replace(':message:', textFormt(msg))

  let $message = $(message)

  $chatRoom.animate({ scrollTop: $chatRoom.get(0).scrollHeight }, 700)
  $chatRoom.append($message)
})

let chat = {
  leftShow: ev => {
    ev.preventDefault()
    $opacity.show()
    $menuLeft.animate({ left: '0px' }, 800)
  },
  leftHide: () => {
    $opacity.hide()
    $menuLeft.animate({ left: '-100%'}, 800)
  }
}

let textFormt = (text) => {
  return text.replace(/\r?\n/g, '<br>')
}

export default chat

//const $chatLeftMenu = $('#chat-leftMenu')
