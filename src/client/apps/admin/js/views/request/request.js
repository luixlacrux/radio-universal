import Backbone from 'backbone'
import moment from 'moment'
import es from 'moment/locale/es'
import $ from 'jquery'
import template from 'src/client/apps/admin/handlebars/request.hbs'

class Request extends Backbone.View {
  get tagName () { return 'div' }
  get className () { return 'message' }

  render () {
    let request = this.model.toJSON()
    let html = template(request)
    this.$el.html(html)
    this.initTime = this.model.get('date')
    this.updateTime()
    return this
  }

  updateTime () {
    let relativeTime = moment(this.initTime).fromNow()
    this.$el.find('.date').html(relativeTime)
    setTimeout(() => this.updateTime(), 60000)
  }
}

export default Request