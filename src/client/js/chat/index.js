import $ from 'jquery'

const $el = $('#chat')
const $menuLeft = $el.find('#chat-leftMenu')
const $opacity = $el.find('.Chat-opacity')

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
export default chat

//const $chatLeftMenu = $('#chat-leftMenu')
