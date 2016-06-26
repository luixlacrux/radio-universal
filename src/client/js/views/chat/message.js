import Backbone from 'backbone'
import moment from 'moment'
import es from 'moment/locale/es'
import $ from 'jquery'
import template from 'src/client/templates/chat/message.hbs'

class Message extends Backbone.View {
  get tagName () { return 'div' }
  get className () { return 'message' }

  render () {
    let message = this.model.toJSON()
    let html = template(message)
    this.$el.html(html)
    this.addClassMe(message)
    this.initTime = this.model.get('date')
    this.updateTime()
    return this
  }

  updateTime () {
    let relativeTime = moment(this.initTime).fromNow()
    this.$el.find('.date').html(relativeTime)
    setTimeout(() => this.updateTime(), 60000)
  }

  addClassMe (message) {
    if (message.me)
      this.$el.addClass('me')
  }
}

export default Message
