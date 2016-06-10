import $ from 'jquery'

const $el = $('#login')
const $opacity = $('#opacity')

// button close
$el.find('.icon-close').click(ev => {
  ev.preventDefault()
  login.hide()
})

let login = {
  show: (ev) => {
    ev.preventDefault()
    $opacity.show()
    $el.fadeIn(200)
  },
  hide: () => {
    $opacity.hide()
    $el.fadeOut(200)
  }
}

export default login
