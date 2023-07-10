import {ReactElement} from 'react'
import {
    CREATE,
    CREATED,
    DESTROY
} from './cacheActions'

export type CacheStates = Record<
    string,
    {
        cacheId: string; 
        reactElement: ReactElement;
        doms?: ChildNode[]; 
        status: string;
        scrolls: number
    }
>
type CacheAction = 
        {
            type: typeof CREATE,
            payload: { cacheId: string; reactElement: ReactElement }
        }   
    |   {
            type: typeof CREATED,
            payload: { cacheId: string; doms: ChildNode[]; }
        }
    |   {
            type: typeof DESTROY,
            payload: { cacheId: string }
        }
        
function cacheReducer(cacheStates: CacheStates, action: CacheAction) {
    const cacheId = action.payload.cacheId
    switch (action.type) {
        case CREATE:
            return {
                ...cacheStates,
                [cacheId]: {
                    cacheId: cacheId,
                    reactElement: action.payload.reactElement,
                    doms:undefined,
                    status: CREATE,
                    scrolls: 0
                }
            }
        case CREATED:
            return {
                ...cacheStates,
                [cacheId]: {
                    ...cacheStates[cacheId],
                    doms: action.payload.doms,
                    status: CREATED
                }                
            }
        case DESTROY: 
            return {
                ...cacheStates,
                [cacheId]: {
                    ...cacheStates[cacheId],
                    status: DESTROY
                }                 
            }
        default:
            return { ...cacheStates }
    }
}
export default cacheReducer