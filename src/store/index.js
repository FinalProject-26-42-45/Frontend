import { createStore } from 'vuex'
import { auth } from './authen.module'

const store = createStore({
  modules: {
    auth,
  },
});

export default store;
// export default createStore({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })