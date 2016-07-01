import Backbone from 'backbone'
import $ from 'jquery'

class Notification extends Backbone.View {
  get el () { return $('#notification') }
  get events () {
    return {
      'click .icon-close': 'hideNotification'
    }
  }

  initialize () {
    this.$text = this.$el.find('.text')
  }

  render () {
    this.$text.html(message)
    this.showNotification()
  }

  showNotification (ev) {
    if (ev) ev.preventDefault()
    this.$el.animate({ right: '1.5em' }, 500)
  }

  hideNotification (ev) {
    if (ev) ev.preventDefault()
    this.$el.animate({ right: '-100%' }, 500)
  }

}

export default Notification
