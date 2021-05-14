import initStore from "./initStore";
import {boundDispatchToStore} from "../dispatch";
import createSliceTree from "../slice/createSliceTree";
import {_Vue as Vue} from "../install";

function installState(sliceNode) {
    const parentState = sliceNode.parentState;
    const state = sliceNode.state;
    if (sliceNode.noNamespaced) {
        Object.keys(state).forEach((key) => {
            Vue.set(parentState, key, state[key]);
        });
    }
    else {
        Vue.set(parentState, sliceNode.name, state);
    }
}

function installSlices(store, sliceNode) {
    installState(sliceNode);
}

function createStoreVm(store) {

}

function addParentState(sliceNode, parentState) {
    sliceNode.parentState = parentState;
    if (!sliceNode.noNamespaced)
        parentState = sliceNode.state;
    sliceNode.children.forEach((childSliceNode) => addParentState(childSliceNode, parentState));
}

function createStore(rootSlice) {
    if (!Vue) {
        console.error('Slovex must be installed before creating a store.');
        return;
    }
    const store = initStore();
    boundDispatchToStore(store);
    const sliceTree = createSliceTree(rootSlice, '');
    addParentState(sliceTree, store.state);
    installSlices(store, sliceTree);
    createStoreVm(store);
    return store;
}

export default createStore;
