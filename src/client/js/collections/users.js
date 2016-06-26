import Backbone from 'backbone'
import User from 'src/client/js/models/user'

class Users extends Backbone.Collection {
  get url () { return '/users.json' }
  get model () { return User }
  /*constructor(options) {
    super(options)
    this.model = User
  }*/

  initialize () {
    this.fetch()
  }
}

export default Users
