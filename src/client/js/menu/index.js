import $ from 'jquery'

const $el = $('#menu')
const $opacity = $('#opacity')

let menu = {
  show: (ev) => {
    ev.preventDefault()
    $opacity.show()
    $el.animate({ left: '0px' }, 800)
  },
  hide: () => {
    $opacity.hide()
    $el.animate({ left: '-100%'}, 800)
  }
}

export default menu
