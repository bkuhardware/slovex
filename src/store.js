import {boundDispatchToStore} from "./dispatch";
import {createSliceTree, installSlices} from "./slice";
import {_Vue as Vue} from "./install";
import {unifyObjectStyle} from "./utils";

function makeNamespaceLocalContextMap(store, rootSliceNode) {
    const namespaceLocalContextMap = Object.create(null);
    function registerLocalContext(sliceNode) {
        const namespace = sliceNode.namespace;
        if (namespace && !namespaceLocalContextMap[namespace]) {
            namespaceLocalContextMap[namespace] = {
                state: sliceNode.state,
                dispatch: function (_type, _payload) {
                    let {type, payload} = unifyObjectStyle(_type, _payload);
                    if (!type.length) {
                        console.error('Action type must not be empty string.');
                    }
                    const isGlobalType = type.indexOf('@') > -1;
                    if (!isGlobalType) {
                        type = namespace + '@' + type;
                    }
                    return store.dispatch(type, payload);
                }
            };
        }
        sliceNode.children.forEach((childSliceNode) => registerLocalContext(childSliceNode));
    }
    registerLocalContext(rootSliceNode);
    return namespaceLocalContextMap;
}

function createStoreVm(store, state) {
    store._vm = new Vue({
        data: {
            $$state: state
        }
    });
}

function createStateTree(rootSliceNode) {
    const state = {};
    function registerState(sliceNode, parentState) {
        const sliceState = sliceNode.state;
        if (sliceNode.noNamespaced) {
            Object.keys(sliceState).forEach((key) => {
                parentState[key] = sliceState[key];
            })
        }
        else {
            const key = sliceNode.name;
            parentState[key] = sliceState;
            parentState = sliceState;
        }
        sliceNode.children.forEach((childSliceNode) => registerState(childSliceNode, parentState));
    }
    registerState(rootSliceNode, state);
    return state;
}

function makeStoreGlobalContext(store) {
    store._globalContext = {
        get state() {
            return store.state;
        },
        dispatch: store.dispatch
    };
}

function initStore() {
    const store = Object.create(null);
    store.getters = {};
    store._actions = {};
    store._namespaceSliceMap = Object.create(null);
    store._vm = new Vue();
    store._namespaceLocalContextMap = Object.create(null);
    Object.defineProperty(store, 'state', {
        get: function() {
            return this._vm._data.$$state;
        }
    });
    return store;
}

function createStore(rootSlice) {
    if (!Vue) {
        console.error('Slovex must be installed before creating a store.');
        return;
    }
    const store = initStore();
    boundDispatchToStore(store);
    makeStoreGlobalContext(store);
    const rootSliceNode = createSliceTree(rootSlice, '');
    const state = createStateTree(rootSliceNode);
    store._namespaceLocalContextMap = makeNamespaceLocalContextMap(store, rootSliceNode);
    installSlices(store, rootSliceNode);
    createStoreVm(store, state);
    return store;
}

export default createStore;
