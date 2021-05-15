export function mapStateToComputed(_namespace, _items) {
    const { namespace, items } = normalizeMap(_namespace, _items);
    const computedObj = Object.create(null);
    items.forEach(({ key, val }) => {
        computedObj[key] = function wrappedState() {
            let state;
            if (namespace) {
                const localContext = getLocalContext(this.$slovex, namespace);
                state = localContext.state;
            }
            else {
                state = this.$slovex.state;
            }
            return state[val];
        }
    });
    return computedObj;
}

export function mapDispatchToMethods(_namespace, _items) {
    const { namespace, items } = normalizeMap(_namespace, _items);
    const methodsObj = Object.create(null);
    items.forEach(({ key, val }) => {
        methodsObj[key] = function wrappedMethod(payload) {
            let dispatch = store.dispatch;
            if (namespace) {
                const localContext = getLocalContext(this.$slovex, namespace);
                dispatch = localContext.dispatch;
            }
            return dispatch(val, payload);
        }
    })
    return methodsObj;
}

function normalizeItems(items) {
    if (!Array.isArray(items))
        return Object.keys(items).map((key) => ({ key, val: items[key] }));
    return items.map(item => {
        return typeof item === 'string' ? ({ key: item, val: item }) : item;
    });
}

function normalizeMap(namespace, items) {
    if (typeof namespace !== 'string') {
        items = namespace;
        namespace = '';
    }
    items = normalizeItems(items);
    return { namespace, items };
}


function getLocalContext(store, namespace) {
    const localContext = store._namespaceLocalContextMap[namespace];
    if (!localContext)
        console.error(`Undefined namespace ${namespace}`);
    return localContext;
}
