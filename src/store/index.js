import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editable: false,
    fireUser: null,
    user: null,
    boardTypeList: localStorage.getItem('boardTypeList') === 'true',
    searchText: '',
    site: {
      menu: [
        {
          title: 'home',
          icon: 'mdi-home',
          subItems: [
            {
              title: 'Dashboard',
              to: '/'
            },
            {
              title: 'About',
              to: '/about'
            }
          ]
        },
        {
          title: 'about',
          active: true,
          icon: 'mdi-account',
          subItems: [
            {
              title: 'xxx',
              to: '/xxx'
            }
          ]
        }
      ],
      title: '나만의 사이트 만들기',
      footer: 'CodeEats Company.'
    }
  },
  mutations: {
    setEdit (state, edit) {
      state.editable = edit
    },
    setFireUser (state, fu) {
      state.fireUser = fu
    },
    setUser (state, user) {
      state.user = user
    },
    toggleBoardType (state) {
      state.boardTypeList = !state.boardTypeList
      localStorage.setItem('boardTypeList', state.boardTypeList)
    },
    setSearchText (state, text) {
      state.searchText = text
    }
  },
  actions: {
  },
  modules: {
  }
})
