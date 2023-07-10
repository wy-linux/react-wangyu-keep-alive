import React from 'react';
export declare function withKeepAlive(OldComponent: React.FC, { cacheId, scroll }: {
    cacheId?: string | undefined;
    scroll?: boolean | undefined;
}): (props: any) => React.JSX.Element;
export default withKeepAlive;
