import Vue from 'vue'
import Vuex from 'vuex'
import TenantsStore from './TenantsStore.js'
import UserStore from './UserStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
    modules : {
        TenantsStore,
        UserStore,
    },
})
