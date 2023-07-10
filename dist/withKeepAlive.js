"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withKeepAlive = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const KeepAliveProvider_1 = require("./KeepAliveProvider");
const cacheActions_1 = require("./reducers/cacheActions");
const uuid_1 = require("uuid");
function withKeepAlive(OldComponent, { cacheId = (0, uuid_1.v4)(), scroll = false }) {
    return function (props) {
        const { cacheStates, mount, handleScroll, destroy } = (0, react_2.useContext)(KeepAliveProvider_1.CacheContext);
        const divRef = (0, react_2.useRef)(null);
        (0, react_2.useEffect)(() => {
            if (scroll) {
                divRef.current.addEventListener('scroll', handleScroll.bind(null, cacheId), true);
            }
        }, [handleScroll]);
        (0, react_2.useEffect)(() => {
            const cacheState = cacheStates[cacheId];
            if (cacheState && cacheState.doms && cacheState.status !== cacheActions_1.DESTROY) {
                const doms = cacheState.doms;
                doms.forEach(dom => {
                    divRef.current.appendChild(dom);
                    if (scroll) {
                        dom.addEventListener('scroll', handleScroll.bind(null, cacheId), true);
                    }
                });
                if (scroll) {
                    doms.forEach(dom => {
                        dom.scrollTop = cacheState.scrolls;
                    });
                }
            }
            else {
                mount({
                    cacheId,
                    reactElement: react_1.default.createElement(OldComponent, Object.assign({}, props, { destroy: destroy }))
                });
            }
        }, [cacheStates, mount, props]);
        return (react_1.default.createElement("div", { id: `keepalive_${cacheId}`, ref: divRef }));
    };
}
exports.withKeepAlive = withKeepAlive;
exports.default = withKeepAlive;
