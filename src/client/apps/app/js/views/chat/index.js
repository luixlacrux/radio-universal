import Backbone from 'backbone'
import $ from 'jquery'

class ChatMain extends Backbone.View {
  get el () { return $('#chat') }
  get events () {
    return {
      'click #btn-more': 'showLeftMenu',
      'click .Chat-opacity': 'hideLeftMenu'
    }
  }

  initialize () {
    this.$leftMenu = this.$el.find('#chat-leftMenu')
    this.$opacity = this.$el.find('.Chat-opacity')
  }

  showLeftMenu (ev) {
    ev.preventDefault()
    this.$opacity.show()
    this.$leftMenu.animate({ left: '0px' }, 600)
  }

  hideLeftMenu (ev) {
    this.$opacity.hide()
    this.$leftMenu.animate({ left: '-100%' }, 600)
  }
}

export default ChatMain
