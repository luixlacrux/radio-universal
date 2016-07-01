import Backbone from 'backbone'
import $ from 'jquery'
import RequestView from 'src/client/apps/admin/js/views/request/request'

class List extends Backbone.View {
  get el () { return $('#requests') }

  initialize () {
    this.listenTo(this.collection, 'add', this.addOne, this)
    this.listenTo(this.collection, 'reset', this.addAll, this)
  }

  render () {
    this.$el.empty()
    this.addAll()
  }

  addOne (request) {
    let requestView = new RequestView({ model: request })
    this.$el.append(requestView.render().el)
    this.$el.animate({ scrollTop: this.$el.get(0).scrollHeight }, 700)
  }

  addAll () {
    this.collection.forEach(this.addOne, this)
  }
}

export default List