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
            namespace: 'mySlice',
            state: {
                test: 1
            }
        }
    ]
});

console.log(store);

export default store;
