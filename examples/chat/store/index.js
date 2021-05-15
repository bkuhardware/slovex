import Vue from 'vue'
import Slovex from 'slovex'
import * as getters from './getters'
import * as effects from './effects'
import mutations from './mutations'
import createLogger from '../../../src/plugins/logger'

Vue.use(Slovex)

const state = {
  currentThreadID: null,
  threads: {
    /*
    id: {
      id,
      name,
      messages: [...ids],
      lastMessage
    }
    */
  },
  messages: {
    /*
    id: {
      id,
      threadId,
      threadName,
      authorName,
      text,
      timestamp,
      isRead
    }
    */
  }
}

export default Slovex.createStore({
  state,
  actions: effects,
  mutations
})
