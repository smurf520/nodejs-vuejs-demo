import Vue        from 'vue'
import Vuex       from 'vuex'
import actions    from './actions'
import mutations  from './mutations'
import getters    from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoading: false,
    isToasting: false,
    articles: [],
    article: {},
    user: {name: '', pwd: ''},
    links: [],
    test:'this is test',
  },
  getters,
  mutations,
  actions
})
export default store
