function initStore() {
    const store = Object.create(null);
    store.state = {};
    store.getters = {};
    store._actions = {};
    store._namespaceSliceMap = Object.create(null);
    return store;
}

export default initStore;
