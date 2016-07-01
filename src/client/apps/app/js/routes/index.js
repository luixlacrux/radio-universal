// Module Dependecies
import Backbone from 'backbone'
import moment from 'moment'
import es from 'moment/locale/es'
import _ from 'underscore'
import $ from 'jquery'

// Models
import Message from 'src/client/apps/app/js/models/message'
import Profile from 'src/client/apps/app/js/models/profile'
import User from 'src/client/apps/app/js/models/user'

// Collections
import Messages from 'src/client/apps/app/js/collections/messages'
import Users from 'src/client/apps/app/js/collections/users'

// Views
import MainView from 'src/client/apps/app/js/views/main'
import TextNotificationView from 'src/client/apps/app/js/views/main/notification'
import ChatMainView from 'src/client/apps/app/js/views/chat'
import ChatSendView from 'src/client/apps/app/js/views/chat/send'
import ChatProfileView from 'src/client/apps/app/js/views/chat/profile'
import ChatMessagesView from 'src/client/apps/app/js/views/chat/messages'
import ChatUsersView from 'src/client/apps/app/js/views/chat/users'
import ReqSongView from 'src/client/apps/app/js/views/reqSong'

import { textFormat } from 'src/client/apps/app/js/utils'

class Router extends Backbone.Router {
  get routes () {
    return {
      "": "start"
    }
  }

  initialize () {
    this.initEvents() // initializing  globals events
    // uncomment the following line to enable socket.io
    //this.initSocket() // initializing  socket events
    this.messages = new Messages()
    this.users = new Users()
    // Views
    this.mainView = new MainView()
    this.textNotificationView = new TextNotificationView()
    this.chatMainView = new ChatMainView()
    this.chatSendView = new ChatSendView()
    this.chatProfileView = new ChatProfileView({ model: new Profile() })
    this.chatMessagesView = new ChatMessagesView({ collection: this.messages })
    this.chatUsersView = new ChatUsersView({ collection: this.users })
    this.reqSongView = new ReqSongView()

    Backbone.history.start({
      root: '/',
      pushState: true
    })

  }

  initEvents () {
    this.events = {}
    _.extend(this.events, Backbone.Events)

    // set up events for messages
    this.events.on('message:send', text => this.sendMessage(text))
    this.events.on('message:received', message => this.receivedMessage(message))
    this.events.on('messages', messages => this.lastMessages(messages))
    // set up events for list users
    this.events.on('user:add', user => this.addUser(user))
    this.events.on('user:remove', user => this.removeUser(user))
    this.events.on('users', users => this.listUsers(users))
    // set up events for request song
    this.events.on('reqSong', data => this.emitReqSong(data))
  }

  initSocket () {
    // set up socket io
    this.socket = io.connect('http://localhost:3000')

    this.socket.on('message', message => this.events.trigger('message:received', message))
    this.socket.on('messages', messages => this.events.trigger('messages', messages))
    this.socket.on('user:add', user => this.events.trigger('user:add', user))
    this.socket.on('user:remove', user => this.events.trigger('user:remove', user))
    this.socket.on('users', users => this.events.trigger('users', users))
  }


  start () {
    this.messages.add(new Message({
      avatar: null,
      username: 'Chat',
      text: 'Bienvenido chat este es un mensaje de prueba',
      date: moment().format()
    }))
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

  emitReqSong (data) {
    let reqSong = {
      username: this.chatProfileView.model.get('username'),
      avatar: this.chatProfileView.model.get('avatar'),
      song: data.name,
      text: data.text
    }
    console.log(reqSong)
    // emit reqSong to server
    //this.socket.emit('reqSong', reqSong)
  }
}

export default Router
