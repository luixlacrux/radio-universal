import Backbone from 'backbone'
import $ from 'jquery'

class ReqSong extends Backbone.View {
  get el () { return $('#requestSong .RequestSong-form') }
  get events () {
    return {
      'submit': 'checkForm'
    }
  }

  initialize () {
    this.$name = this.$el.find('#song-name')
    this.$text = this.$el.find('#text')
  }

  checkForm (ev) {
    ev.preventDefault()
    let exp = /.*\S/i
    let data = { name: this.$name.val(), text: this.$text.val()}
    if (exp.test(data.name)) {
      this.sendRequest(data)
      this.$name.removeClass('alert')
    } else {
      this.$name.addClass('alert')
    }

  }

  sendRequest (data) {
    this.$name.val('')
    this.$text.val('')
    App.events.trigger('reqSong', data)
  }
}

export default ReqSong
