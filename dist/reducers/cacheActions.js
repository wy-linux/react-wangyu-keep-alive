"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyAction = exports.createdAction = exports.createAction = exports.DESTROY = exports.CREATED = exports.CREATE = void 0;
exports.CREATE = 'CREATE';
exports.CREATED = 'CREATED';
exports.DESTROY = 'DESTROY';
const createAction = (cacheId, reactElement) => ({
    type: exports.CREATE,
    payload: { cacheId, reactElement }
});
exports.createAction = createAction;
const createdAction = (cacheId, doms) => ({
    type: exports.CREATED,
    payload: { cacheId, doms }
});
exports.createdAction = createdAction;
const destroyAction = (cacheId) => ({
    type: exports.DESTROY,
    payload: { cacheId }
});
exports.destroyAction = destroyAction;
