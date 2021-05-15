import initStore from "./initStore";
import {boundDispatchToStore} from "../dispatch";
import createSliceTree from "../slice/createSliceTree";
import {_Vue as Vue} from "../install";
import {unifyObjectStyle} from "../utils";

function installMutations(store, sliceNode, namespace, localContext) {
    const mutations = sliceNode.mutations;
    Object.keys(mutations).forEach((mutationName) => {
        const handler = mutations[mutationName];
        const actionName = namespace + '@' + mutationName;
        store._actions[actionName] = function(payload) {
            handler.call(store, localContext.state, payload)
        }
    });
}

function installEffects(store, sliceNode, namespace, localContext) {
    const effects = sliceNode.effects;
    Object.keys(effects).forEach((effectName) => {
        const handler = effects[effectName];
        const actionName = namespace + '@' + effectName;
        store._actions[actionName] = function(payload) {
            return handler.call(store, localContext, payload);
        }
    });
}

function makeNamespaceLocalContextMap(rootSliceNode) {
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

function installSlices(store, sliceNode) {
    const namespaceLocalContextMap = store._namespaceLocalContextMap;
    const namespace = sliceNode.namespace;
    const localContext = namespace ? namespaceLocalContextMap[namespace] : store._globalContext;
    installMutations(store, sliceNode, namespace, localContext);
    installEffects(store, sliceNode, namespace, localContext);
    sliceNode.children.forEach((childSliceNode) => installSlices(store, childSliceNode));
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
    store._namespaceLocalContextMap = makeNamespaceLocalContextMap(rootSliceNode);
    installSlices(store, rootSliceNode);
    createStoreVm(store, state);
    return store;
}

export default createStore;
