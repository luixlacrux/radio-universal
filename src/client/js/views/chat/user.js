import Backbone from 'backbone'
import $ from 'jquery'
import template from 'src/client/templates/chat/user.hbs'

class User extends Backbone.View {
  get tagName () { return 'li' }
  get className () { return 'item' }

  render () {
    let model = this.model.toJSON()
    let html = template(model)
    this.$el.html(html)
    return this
  }
}

export default User