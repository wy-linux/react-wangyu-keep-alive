"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cacheActions_1 = require("./cacheActions");
function cacheReducer(cacheStates, action) {
    const cacheId = action.payload.cacheId;
    switch (action.type) {
        case cacheActions_1.CREATE:
            return Object.assign(Object.assign({}, cacheStates), { [cacheId]: {
                    cacheId: cacheId,
                    reactElement: action.payload.reactElement,
                    doms: undefined,
                    status: cacheActions_1.CREATE,
                    scrolls: 0
                } });
        case cacheActions_1.CREATED:
            return Object.assign(Object.assign({}, cacheStates), { [cacheId]: Object.assign(Object.assign({}, cacheStates[cacheId]), { doms: action.payload.doms, status: cacheActions_1.CREATED }) });
        case cacheActions_1.DESTROY:
            return Object.assign(Object.assign({}, cacheStates), { [cacheId]: Object.assign(Object.assign({}, cacheStates[cacheId]), { status: cacheActions_1.DESTROY }) });
        default:
            return Object.assign({}, cacheStates);
    }
}
exports.default = cacheReducer;
