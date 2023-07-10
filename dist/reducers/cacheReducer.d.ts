import { ReactElement } from 'react';
import { CREATE, CREATED, DESTROY } from './cacheActions';
export type CacheStates = Record<string, {
    cacheId: string;
    reactElement: ReactElement;
    doms?: ChildNode[];
    status: string;
    scrolls: number;
}>;
type CacheAction = {
    type: typeof CREATE;
    payload: {
        cacheId: string;
        reactElement: ReactElement;
    };
} | {
    type: typeof CREATED;
    payload: {
        cacheId: string;
        doms: ChildNode[];
    };
} | {
    type: typeof DESTROY;
    payload: {
        cacheId: string;
    };
};
declare function cacheReducer(cacheStates: CacheStates, action: CacheAction): {
    [x: string]: {
        cacheId: string;
        reactElement: ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        doms?: ChildNode[] | undefined;
        status: string;
        scrolls: number;
    } | {
        cacheId: string;
        reactElement: ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        doms: undefined;
        status: "CREATE";
        scrolls: number;
    };
};
export default cacheReducer;
