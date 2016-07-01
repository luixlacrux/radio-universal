import Backbone from 'backbone'
import $ from 'jquery'
import User from 'src/client/apps/app/js/views/chat/user'

class Users extends Backbone.View {
  get el () { return $('#list-users') }

  initialize () {
    this.listenTo(this.collection, 'add', this.addOne, this)
    this.listenTo(this.collection, 'reset', this.addAll, this)
    this.listenTo(this.collection, 'remove', this.render, this)
  }

  render () {
    this.$el.empty()
    this.addAll()
  }

  removeOne (user_id) {
    let user = this.collection.findWhere({ id: user_id })
    this.collection.remove(user)
  }

  addOne (user) {
    let userView = new User({ model: user })
    this.$el.append(userView.render().el)
  }

  addAll () {
    this.collection.forEach(this.addOne, this)
  }
}

export default Users
