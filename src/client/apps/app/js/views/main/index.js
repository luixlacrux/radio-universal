import Backbone from 'backbone'
import $ from 'jquery'

class Main extends Backbone.View {
  get el () { return $('body') }
  get events () {
    return {
      'click': 'hide',
      'click #btn-menu': 'showMenu',
      'click #btn-login': 'showLogin',
      'click #btn-reqSong': 'showReqSong',
      'click #btn-down': 'bodyScrollTop',
      'click #avatar': 'toggleUserMenu',
      'click #close-drop': 'hideLoginDrop',
      'click .x-close': 'btnClose',
      'click #opacity': 'hideOpacity'
    }
  }

  initialize () {
    this.$menu = this.$el.find('#menu')
    this.$login = this.$el.find('#login')
    this.$opacity = this.$el.find('#opacity')
    this.$userMenu = this.$el.find('#user-menu')
    this.$requestSong = this.$el.find('#requestSong')
    this.$loginDrop = this.$el.find('#login-dropdown')
    this.$portada = this.$el.find('#portada')
  }

  btnClose (ev) {
    ev.preventDefault()
    this.hideLogin()
    this.hideReqSong()
  }

  bodyScrollTop () {
    this.$el.animate({ scrollTop: this.$portada.get(0).scrollHeight + 80  }, 1000)
  }

  hideOpacity () {
    this.hideMenu()
    this.hideLogin()
    this.hideReqSong()
  }

  hide () {
    this.hideUserMenu()
  }

  hideLoginDrop (ev) {
    ev.preventDefault()
    this.$loginDrop.slideUp(200)
  }

  showReqSong (ev) {
    ev.preventDefault()
    this.$opacity.show()
    this.$requestSong.fadeIn(200)
  }

  hideReqSong (ev) {
    if (ev) ev.preventDefault()
    this.$opacity.hide()
    this.$requestSong.fadeOut(200)
  }

  toggleUserMenu (ev) {
    ev.stopPropagation()
    this.$userMenu.fadeToggle(200)
  }

  hideUserMenu () {
    this.$userMenu.fadeOut(200)
  }

  showMenu (ev) {
    ev.preventDefault()
    this.$opacity.show()
    this.$menu.animate({ left: '0px' }, 800)
  }

  hideMenu () {
    this.$opacity.hide()
    this.$menu.animate({ left: '-100%' }, 800)
  }

  showLogin (ev) {
    this.$opacity.show()
    this.$login.fadeIn(200)
  }

  hideLogin () {
    this.$opacity.hide()
    this.$login.fadeOut(200)
  }
}

export default Main
