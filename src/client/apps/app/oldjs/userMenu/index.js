import $ from 'jquery'

const $el = $('#user-menu')

let userMenu = {
  toggle: ev => {
    ev.preventDefault()
    ev.stopPropagation()
    $el.fadeToggle(200)
  },
  hide: ev => {
    $el.fadeOut(200)
  }
}
export default userMenu
