import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/templates/chat/profile.hbs'

class ChatProfileView extends Backbone.View {
  get el () { return $('#chat-user') }

  initialize () {
    this.listenTo(this.model, 'change', this.render, this)
  }

  render () {
    this.$el.empty()
    this.$el.html(template(this.model.toJSON()))
  }
}

export default ChatProfileView
