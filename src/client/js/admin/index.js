import $ from 'jquery'

const $prevImage = $('.Edit-label img')

let blogImage = {
  change: ev => {
    let photo = ev.target.files[0]
    let url = window.URL.createObjectURL(photo)
    $prevImage.attr('src', url)
  }
}

export default blogImage
