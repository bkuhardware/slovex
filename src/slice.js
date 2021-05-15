function getSliceNamespace(rawNamespace, parentNamespace) {
    if (!rawNamespace)
        return parentNamespace;
    return parentNamespace ? `${parentNamespace}.${rawNamespace}` : rawNamespace;
}

export function createSliceTree(rawSlice, parentNamespace) {
    const sliceNode = {};
    sliceNode.state = rawSlice.state || {};
    sliceNode.getters = rawSlice.getters || {};
    sliceNode.mutations = rawSlice.mutations || {};
    sliceNode.effects = rawSlice.effects || {};
    const rawNamespace = rawSlice.namespace || '';
    sliceNode.name = rawNamespace;
    sliceNode.namespace = getSliceNamespace(rawNamespace, parentNamespace);
    sliceNode.noNamespaced = sliceNode.namespace === '';
    const childSlices = rawSlice.slices || [];
    sliceNode.children = childSlices.map((rawChildSlice) => createSliceTree(rawChildSlice, sliceNode.namespace));
    return sliceNode;
}

export function installSlices(store, sliceNode) {
    const namespaceLocalContextMap = store._namespaceLocalContextMap;
    const namespace = sliceNode.namespace;
    const localContext = namespace ? namespaceLocalContextMap[namespace] : store._globalContext;
    installMutations(store, sliceNode, namespace, localContext);
    installEffects(store, sliceNode, namespace, localContext);
    sliceNode.children.forEach((childSliceNode) => installSlices(store, childSliceNode));
}

function installMutations(store, sliceNode, namespace, localContext) {
    const mutations = sliceNode.mutations;
    Object.keys(mutations).forEach((mutationName) => {
        const handler = mutations[mutationName];
        const actionName = namespace + '@' + mutationName;
        store._actions[actionName] = function (payload) {
            handler.call(store, localContext.state, payload)
        }
    });
}

function installEffects(store, sliceNode, namespace, localContext) {
    const effects = sliceNode.effects;
    Object.keys(effects).forEach((effectName) => {
        const handler = effects[effectName];
        const actionName = namespace + '@' + effectName;
        store._actions[actionName] = function (payload) {
            return handler.call(store, localContext, payload);
        }
    });
}
