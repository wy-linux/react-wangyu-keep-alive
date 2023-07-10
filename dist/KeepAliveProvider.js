"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeepAliveProvider = exports.CacheContext = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const cacheReducer_1 = __importDefault(require("./reducers/cacheReducer"));
const cacheActions_1 = require("./reducers/cacheActions");
exports.CacheContext = (0, react_2.createContext)({
    cacheStates: {},
    mount: ({ cacheId, reactElement }) => { },
    handleScroll: (cacheId, event) => { },
    destroy: (cacheId) => { }
});
function KeepAliveProvider(props) {
    const [cacheStates, dispatch] = (0, react_2.useReducer)(cacheReducer_1.default, {});
    const mount = ({ cacheId, reactElement }) => {
        var _a;
        if (cacheStates[cacheId]) {
            const cacheState = cacheStates[cacheId];
            if (cacheState.status === cacheActions_1.DESTROY) {
                (_a = cacheState.doms) === null || _a === void 0 ? void 0 : _a.forEach(dom => { var _a; return (_a = dom.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(dom); });
                dispatch((0, cacheActions_1.createAction)(cacheId, reactElement));
            }
        }
        else {
            dispatch((0, cacheActions_1.createAction)(cacheId, reactElement));
        }
    };
    const handleScroll = (cacheId, event) => {
        if (cacheStates[cacheId]) {
            cacheStates[cacheId].scrolls = event.target.scrollTop;
        }
    };
    const destroy = (cacheId) => {
        dispatch((0, cacheActions_1.destroyAction)(cacheId));
    };
    return (react_1.default.createElement(exports.CacheContext.Provider, { value: { cacheStates, mount, handleScroll, destroy } },
        props.children,
        Object.values(cacheStates)
            .filter(cacheState => cacheState.status !== cacheActions_1.DESTROY)
            .map(({ cacheId, reactElement }) => (react_1.default.createElement("div", { id: `cache-${cacheId}`, key: cacheId, ref: (divDOM) => {
                const cacheState = cacheStates[cacheId];
                if (divDOM && (!cacheState.doms || cacheState.status === cacheActions_1.DESTROY)) {
                    const doms = Array.from(divDOM.childNodes);
                    dispatch((0, cacheActions_1.createdAction)(cacheId, doms));
                }
            } }, reactElement)))));
}
exports.KeepAliveProvider = KeepAliveProvider;
exports.default = KeepAliveProvider;
