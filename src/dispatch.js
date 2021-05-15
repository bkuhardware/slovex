import {unifyObjectStyle} from "./utils";

export function boundDispatchToStore(store) {
    store.dispatch = function boundedDispatch(_type, _payload) {
        return dispatch.call(store, _type, _payload);
    }
}

function dispatch(_type, _payload) {
    const { type, payload } = unifyObjectStyle(_type, _payload);
    const store = this;
    const action = store._actions[type];
    if (!action) {
        return console.error(`No action is matched with type ${type}.`);
    }
    return action(payload);
}

export default dispatch;
