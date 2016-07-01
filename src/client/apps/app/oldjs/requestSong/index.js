import $ from 'jquery'

const $el = $('#requestSong')
const $opacity = $('#opacity')

// button close
$el.find('.icon-close').click(ev => {
  ev.preventDefault()
  requestSong.hide()
})

let requestSong = {
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

export default requestSong
