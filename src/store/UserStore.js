import UserService from '@/services/UserService.js'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export const LOG_IN = 'user/action/logIn';
export const SIGN_OUT = 'user/action/signOut';

export default {
    strict: true,
    state: {
        user: {},
    },




    actions: {
        [LOG_IN](context, { user }) {
            return UserService.logIn(user)
                .then(message => message)
                .catch(err => err)
        },

        [SIGN_OUT](contex) {
            return UserService.signOut()
            .then(result => result)
            .catch(err=> console.warn(err, 'failed to sign out'))
        }
    }

};
