import Backbone from 'backbone'
import $ from 'jquery'
import Router from 'src/client/apps/app/js/routes'
import bxSlider from 'src/client/apps/app/js/slider'

$(() => {
  window.App = new Router()

  $('.slider4').bxSlider({
    mode: 'horizontal',
    slideWidth: 350,
    minSlides: 1,
    maxSlides: 4,
    moveSlides: 1,
    slideMargin: 5,
    auto: true,
    autoStart: true,
    //tickerHover: true,
    infiniteLoop: true,
    speed: 500,
    pause: 1500,
    useCss: true
  });
})
