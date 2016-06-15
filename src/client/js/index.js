import $ from 'jquery'
import menu from 'src/client/js/menu'
import chat from 'src/client/js/chat'
import userMenu from 'src/client/js/userMenu'
import login from 'src/client/js/login'
import requestSong from 'src/client/js/requestSong'
import loginDropdown from 'src/client/js/loginDropdown'
import bxSlider from 'src/client/js/slider'
import share from 'src/client/js/share'
import blogImage from 'src/client/js/admin'

$(() => {
  const $buttonMenu = $('#btn-menu')
  const $buttonMore = $('#btn-more')
  const $buttonLogin = $('#btn-login')
  const $buttonReqSong = $('#btn-reqSong')
  const $buttonDown = $('#btn-down')
  const $opacityBody = $('#opacity')
  const $opacityChat = $('.Chat-opacity')
  const $uploadImage = $('#image')
  const $portada = $('#portada')
  const $avatar = $('#avatar')
  const $body = $('body')

  $('.slider4').bxSlider({
    mode: 'horizontal',
    slideWidth: 350,
    minSlides: 1,
    maxSlides: 4,
    moveSlides: 1,
    slideMargin: 5,
    auto: true,
    autoStart: true,
    tickerHover: true,
    infiniteLoop: true,
    speed: 500,
    pause: 1500,
    useCss: true
  });



  // events
  $buttonMenu.click(menu.show)
  $buttonMore.click(chat.leftShow)
  $buttonLogin.click(login.show)
  $buttonReqSong.click(requestSong.show)
  $opacityChat.click(chat.leftHide)
  $avatar.click(userMenu.toggle)
  $body.click(userMenu.hide)
  $uploadImage.change(blogImage.change)
  $opacityBody.click(ev => {
    menu.hide()
    login.hide()
    requestSong.hide()
  })
  $buttonDown.click(ev => $body.animate({ scrollTop: $portada.get(0).scrollHeight + 100  }, 1000))
})
