import {_Vue as Vue} from '../install';

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

export default initStore;
