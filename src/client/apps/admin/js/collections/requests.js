import Backbone from 'backbone'
import Request from 'src/client/apps/admin/js/models/request'

class Requests extends Backbone.Collection {
  constructor (options) {
    super(options)
    this.model = Request
  }
}

export default Requests