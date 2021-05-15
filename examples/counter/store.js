import Vue from 'vue';
import Slovex from 'slovex';

Vue.use(Slovex);

const { createStore } = Slovex;

const store = createStore({
    state: {
        gay: true,
        sex: 1
    },
    slices: [
        {
            state: {
                test: 1
            },
            mutations: {
                setTest(state, value) {
                    state.test = value;
                    state.gay = !state.gay;
                    state.sex += 10000;
                }
            }
        }
    ]
});

console.log(store);

export default store;
