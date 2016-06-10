import $ from 'jquery'

const $el = $('#login-dropdown')

// button close
$el.find('.icon-close').click(ev => {
  ev.preventDefault()
  dropdown.up()
})

let dropdown = {
  up: () => $el.slideUp(200),
  hide: () => $el.slideDown(200)
}

export default dropdown
