import AuthenService from "../service/AuthenService";

const users = JSON.parse(localStorage.getItem('users'));
const initialState = users
    ? { status: { loggedIn: true }, users }
    : { status: { loggedIn: false }, users: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, users) {
            return AuthenService.login(users).then(
                users => {
                    commit('loginSuccess', users);
                    return Promise.resolve(users);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthenService.logout();
            commit('logout');
        },
        register({ commit }, users) {
            return AuthenService.register(users).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => { 
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        loginSuccess(state, users) {
          state.status.loggedIn = true;
          state.users = users;
        },
        loginFailure(state) {
          state.status.loggedIn = false;
          state.users = null;
        },
        logout(state) {
          state.status.loggedIn = false;
          state.users = null;
        },
        registerSuccess(state) {
          state.status.loggedIn = false;
        },
        registerFailure(state) {
          state.status.loggedIn = false;
        }
      }
};