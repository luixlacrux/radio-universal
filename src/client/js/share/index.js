import $ from 'jquery'

const shareFacebook = '//www.facebook.com/share.php'
const shareTwitter = '//twitter.com/intent/tweet'

const titlePost = $('#title-post').text()
const username = 'radiouniversal101.3FM'
const text = 'Me gusto este artículo sobre ' + titlePost

let generateUrl = {
  facebook: () => `${shareFacebook}?u=${window.location.href}`,
  twitter: () => `${shareTwitter}?text=${text}&url=${window.location.href}&via=${username}`
}

if ($('#btns-share').length) {
  $('#share-facebook').attr('href', generateUrl.facebook())
  $('#share-twitter').attr('href', generateUrl.twitter())
}
