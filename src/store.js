import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: null
  },
  getters: {
    getItems: state => {
      return state.items
    }
  },
  mutations: {
    SET_ITEMS: state => {
      let items = []
      db.collection('items')
        .orderBy('createdAt')
        .onSnapshot(snapshot => {
          items = []
          snapshot.forEach(doc => {
            items.push({ id: doc.id, title: doc.data().title })
          })

          state.items = items
        })
    }
  },
  actions: {
    setItems: context => {
      console.log('test')
      context.commit('SET_ITEMS')
    }
  }
})
