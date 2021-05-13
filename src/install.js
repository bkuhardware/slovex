let _Vue;

function applyMixin(VueClass) {
    VueClass.mixin({
        beforeCreate: addSlovexToVm
    })
}

function addSlovexToVm() {
    let store;
    const options = this.$options;
    if ((store = options.store) || (options.parent && (store = options.parent.$slovex)))
        this.$slovex = store;
}

function install(VueClass) {
    if (_Vue) {
        console.error('Slovex should only be install once');
        return;
    }
    _Vue = VueClass;
    applyMixin(VueClass);
}

export { install, _Vue };

