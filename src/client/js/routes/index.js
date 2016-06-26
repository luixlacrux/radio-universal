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

import { textFormat } from 'src/client/js/utils'

class Router extends Backbone.Router {
  get routes () {
    return {
      "": "start"
    }
  }

  initialize () {
    this.initEvents() // initializing  globals events
    // uncomment the following line to enable socket.io
    // this.initSocket() // initializing  socket events
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

    this.events.on('message:send', text => this.sendMessage(text))
    this.events.on('message:received', message => this.receivedMessage(message))
    this.events.on('messages', messages => this.lastMessages(messages))
    this.events.on('user:add', user => this.addUser(user))
    this.events.on('user:remove', user => this.removeUser(user))
    this.events.on('users', users => this.listUsers(users))
  }

  initSocket () {
    // set up socket io
    this.socket = io.connect('localhost:3000')

    this.socket.on('message', message => this.events.trigger('message:received', message))
    this.socket.on('messages', messages => this.events.trigger('messages', messages))
    this.socket.on('user:add', user => this.events.trigger('user:add', user))
    this.socket.on('user:remove', user => this.events.trigger('user:remove', user))
    this.socket.on('users', users => this.events.trigger('users', users))
  }

  sendMessage (text) {
    let message = {
      text: text,
      username: this.chatProfileView.model.get('username'),
      avatar: this.chatProfileView.model.get('avatar'),
      user_id: this.chatProfileView.model.get('id')
    }

    // emit message to socketio
    //this.socket.emit('message', message)
    // add message to collection
    message.text = textFormat(message.text)
    message.date = moment().format()
    message.me = true
    this.messages.add(new Message(message))
  }

  receivedMessage (message) {
    message.text = textFormat(message.text)
    message.date = moment().format()
    this.messages.add(new Message(message))
  }

  lastMessages (messages) {
    this.messages.reset()
    console.log('Received last messages')
    messages.forEach(this.receivedMessage, this)
  }

  addUser (user) {
    this.users.add(new User(user))
  }

  listUsers (users) {
    this.users.reset()
    users.forEach(this.addUser, this)
  }

  removeUser (user) {
    let item = this.user.findWhere({ id: user.id })
    this.user.remove(item)
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
