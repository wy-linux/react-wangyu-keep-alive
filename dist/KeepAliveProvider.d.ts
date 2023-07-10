import React from 'react';
import { CacheStates } from "./reducers/cacheReducer";
interface CacheValue {
    cacheStates: CacheStates;
    mount: ({ cacheId, reactElement }: {
        cacheId: string;
        reactElement: React.ReactElement;
    }) => void;
    handleScroll: (cacheId: string, event: Event) => void;
    destroy: (cacheId: string) => void;
}
export declare const CacheContext: React.Context<CacheValue>;
interface IProps {
    children?: React.ReactNode;
}
export declare function KeepAliveProvider(props: IProps): React.JSX.Element;
export default KeepAliveProvider;
