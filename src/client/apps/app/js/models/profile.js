import Backbone from 'backbone'

class Profile extends Backbone.Model {
  get url () { return '/profile.json' }

  initialize () {
    this.fetch()
  }
}

export default Profile
