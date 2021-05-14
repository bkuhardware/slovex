function initStore() {
    const store = Object.create(null);
    store.state = {};
    store.getters = {};
    store._actions = {};
    return store;
}

export default initStore;
