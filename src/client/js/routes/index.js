// Module Dependecies
import Backbone from 'backbone'
import moment from 'moment'
import es from 'moment/locale/es'
import _ from 'underscore'
import $ from 'jquery'

// Models
import Message from 'src/client/js/models/message'
import Profile from 'src/client/js/models/profile'
import User from 'src/client/js/models/user'

// Collections
import Messages from 'src/client/js/collections/messages'
import Users from 'src/client/js/collections/users'

// Views
import MainView from 'src/client/js/views/main'
import ChatMainView from 'src/client/js/views/chat'
import ChatSendView from 'src/client/js/views/chat/send'
import ChatProfileView from 'src/client/js/views/chat/profile'
import ChatMessagesView from 'src/client/js/views/chat/messages'
import ChatUsersView from 'src/client/js/views/chat/users'

class Router extends Backbone.Router {
  get routes () {
    return {
      "": "start"
    }
  }

  initialize () {
    this.initEvents()
    this.messages = new Messages()
    this.users = new Users()
    // Views
    this.mainView = new MainView()
    this.chatMainView = new ChatMainView()
    this.chatSendView = new ChatSendView()
    this.chatProfileView = new ChatProfileView({ model: new Profile() })
    this.chatMessagesView = new ChatMessagesView({ collection: this.messages })
    this.chatUsersView = new ChatUsersView({ collection: this.users })

    Backbone.history.start({
      root: '/',
      pushState: true
    })

  }

  initEvents () {
    this.events = {}
    _.extend(this.events, Backbone.Events)

    this.events.on('message:send', (text) => this.preSend(text))
    //this.events.on('menu:hide', () => this.header.hideMenu())
  }

  preSend (text) {
    this.messages.add(new Message({
      text: text,
      username: this.chatProfileView.model.get('username'),
      avatar: this.chatProfileView.model.get('avatar'),
      date: moment().format()
    }))
  }

  start () {
    this.messages.add(new Message({
      avatar: null,
      username: 'Chat',
      text: 'Bienvenido chat este es un mensaje de prueba',
      date: moment().format()
    }))
  }
}

export default Router
