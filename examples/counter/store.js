import Vue from 'vue'
import Slovex, {createStore} from 'slovex'

Vue.use(Slovex);

// root state object.
// each Vuex instance is just a single state tree.
const state = {
    count: 0
}

// mutations are operations that actually mutate the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
    increment (state) {
        state.count++
    },
    decrement (state) {
        state.count--
    }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const effects = {
    incrementIfOdd ({ dispatch, state }) {
        if ((state.count + 1) % 2 === 0) {
            dispatch('@increment')
        }
    },
    incrementAsync ({ dispatch }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                dispatch('@increment')
                resolve()
            }, 1000)
        })
    }
}

const store = createStore({
    state,
    effects,
    mutations
});

export default store;
