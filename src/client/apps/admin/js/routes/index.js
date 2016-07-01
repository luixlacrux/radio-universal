import Backbone from 'backbone'
import _ from 'backbone/node_modules/underscore'
import moment from 'moment'
import es from 'moment/locale/es'
import $ from 'jquery'

// Models 
import Request from 'src/client/apps/admin/js/models/request'

// Collections
import Requests from 'src/client/apps/admin/js/collections/requests'

// Views
import MainView from 'src/client/apps/admin/js/views/main'
import ListView from 'src/client/apps/admin/js/views/request/list'

class Router extends Backbone.Router {
  get routes () {
    return {
      "": "start"
    }
  }

  initialize () {
    // init events
    this.initEvents()

    //this.initSocket()

    this.requests = new Requests()
    this.main = new MainView()
    this.listView = new ListView({ collection: this.requests })

    Backbone.history.start({
      root: "/admin",
      pushState: true
    })
  }

  initEvents () {
    this.events = {}
    _.extend(this.events, Backbone.Events)

    this.events.on('reqSong', message => this.receivedReqSong(message)) 
    this.events.on('reqSongs', data => this.lastReqSongs(data)) 
  }

  initSocket () {
    this.socket = io.connect('http://localhost:3000')

    this.socket.on('reqSong', message => this.events.trigger('reqSong', message))
    this.socket.on('reqSongs', data => this.events.trigger('reqSongs', data))
  }

  start () {
    this.requests.add(new Request({
      avatar: null,
      username: 'test',
      song: 'la que quiero escuchar',
      text: 'epa colocala',
      date: moment().format()
    }))

    console.log('He iniciado')
  }

  receivedReqSong (message) {
    message.date = moment().format()
    this.requests.add(new Request(data))
  }

  lastReqSongs (data) {
    this.requests.reset()
    data.forEach(this.receivedReqSong, this)
  }
}

export default Router