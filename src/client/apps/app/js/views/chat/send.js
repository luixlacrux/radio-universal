import Backbone from 'backbone'
import $ from 'jquery'

class Send extends Backbone.View {
  get el () { return $('#chat-send') }
  get events () {
    return {
      'submit': 'sendMessage',
      'keypress': 'matchEnter'
    }
  }

  initialize () {
    this.$inputText = this.$el.find('.message')
  }

  matchEnter (ev) {
    if (ev.keyCode === 13 && !ev.shiftKey) {
      ev.preventDefault()
      this.$el.submit()
    }
  }

  sendMessage (ev) {
    ev.preventDefault()
    let exp = /.\S/i
    let text = this.$inputText.val()
    if (exp.test(text)) {
      this.$inputText.val('')
      App.events.trigger('message:send', text)
      this.$inputText.focus()
    }
  }
}

export default Send
