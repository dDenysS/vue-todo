import Vue from 'vue'
import Vuex from 'vuex'

import types from '@/store/types'

Vue.use(Vuex)

const notesLocalStorage = localStorage.getItem('notes')

export default new Vuex.Store({
  state: {
    notes: notesLocalStorage ? JSON.parse(notesLocalStorage) : []
  },
  getters: {
    getNoteById: state => id => state.notes.find(note => note.id === id)
  },
  mutations: {
    [types.ADD_NOTE](state, { note }) {
      state.notes.push(note)
      localStorage.setItem('notes', JSON.stringify(state.notes))
    },
    [types.EDIT_NOTE](state, { note }) {
      const notes = state.notes.slice()
      const index = notes.findIndex(item => item.id === note.id)

      notes[index] = note

      state.notes = notes
      localStorage.setItem('notes', JSON.stringify(state.notes))
    },
    [types.REMOVE_NOTE](state, { id }) {
      state.notes = state.notes.filter(note => note.id !== id)
      localStorage.setItem('notes', JSON.stringify(state.notes))
    }
  }
})
