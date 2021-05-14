import initStore from "./initStore";
import {boundDispatchToStore} from "../dispatch";
import createSliceTree from "../slice/createSliceTree";

function installSlices(store, sliceNode) {
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
    const store = initStore();
    boundDispatchToStore(store);
    const sliceTree = createSliceTree(rootSlice, '');
    addParentState(sliceTree, store.state);
    installSlices(store, sliceTree);
    createStoreVm(store);
    return store;
}

export default createStore;
