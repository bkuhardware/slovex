import {unifyObjectStyle} from "./utils";

export function boundDispatchToStore(store) {
    store.dispatch = function boundedDispatch(_type, _payload) {
        return dispatch.call(store, _type, _payload);
    }
}

function dispatch(_type, _payload) {
    const { type, payload } = unifyObjectStyle(_type, _payload);
    const store = this;

}

export default dispatch;
