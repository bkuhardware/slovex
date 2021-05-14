import initStore from "./initStore";
import {boundDispatchToStore} from "../dispatch";
import createSliceTree from "../slice/createSliceTree";

function installSlices(store, slices) {

}

function createStoreVm(store) {

}

function createStore(rootSlice) {
    const store = initStore();
    boundDispatchToStore(store);
    const slices = createSliceTree(rootSlice, '');
    installSlices(store, slices);
    createStoreVm(store);
    return store;
}

export default createStore;
