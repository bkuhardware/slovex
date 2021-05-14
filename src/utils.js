export function isObject(val) {
    return typeof val == 'object' && val != null;
}

export function unifyObjectStyle(type, payload) {
    if (isObject(type) && type.type) {
        type = type.type;
        payload = type;
    }
    if (typeof type != 'string')
        console.error('type of action is expected as string.');
    return { type, payload };
}
