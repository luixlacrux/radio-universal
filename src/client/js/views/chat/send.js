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
      App.events.trigger('message:send', this.textFormt(text))
      this.$inputText.focus()
    }
  }

  textFormt (text) {
    let exp ={
     http: /(\b(https?|ftps?|git):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
     blank: /\r?\n/g
   }

    return text.replace(exp.http, "<a href='$1' target='_blank'>$1</a>")
                .replace(exp.blank, '<br>')
  }
}

export default Send
