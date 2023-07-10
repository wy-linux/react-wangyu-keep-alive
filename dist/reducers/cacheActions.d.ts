import { ReactElement } from 'react';
export declare const CREATE: "CREATE";
export declare const CREATED: "CREATED";
export declare const DESTROY: "DESTROY";
export declare const createAction: (cacheId: string, reactElement: ReactElement) => {
    type: "CREATE";
    payload: {
        cacheId: string;
        reactElement: ReactElement<any, string | import("react").JSXElementConstructor<any>>;
    };
};
export declare const createdAction: (cacheId: string, doms: ChildNode[]) => {
    type: "CREATED";
    payload: {
        cacheId: string;
        doms: ChildNode[];
    };
};
export declare const destroyAction: (cacheId: string) => {
    type: "DESTROY";
    payload: {
        cacheId: string;
    };
};
