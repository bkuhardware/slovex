function getSliceNamespace(rawNamespace, parentNamespace) {
    if (!rawNamespace)
        return parentNamespace;
    return parentNamespace ? `${parentNamespace}.${rawNamespace}` : rawNamespace;
}

function createSliceTree(rawSlice, parentNamespace) {
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

export default createSliceTree;
