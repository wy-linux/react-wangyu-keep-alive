import React from 'react'
import { useReducer, createContext } from "react";
import cacheReducer, { CacheStates } from "./reducers/cacheReducer";
import {
    DESTROY,
    createAction, 
    createdAction,
    destroyAction
} from "./reducers/cacheActions"

interface CacheValue {
    cacheStates: CacheStates;
    mount: ({cacheId, reactElement}: {cacheId: string; reactElement: React.ReactElement}) => void;
    handleScroll: (cacheId: string, event: Event) => void;
    destroy: (cacheId: string) => void
}
export const CacheContext = createContext<CacheValue>({
    cacheStates: {},
    mount: ({cacheId, reactElement}: {cacheId: string; reactElement: React.ReactElement}) => {},
    handleScroll: (cacheId: string, event: Event) => {},
    destroy: (cacheId: string) => {}
})
interface IProps {
    children?: React.ReactNode
}
interface IMount {
    cacheId: string; 
    reactElement: React.ReactElement
}

export function KeepAliveProvider(props: IProps) {
    const [cacheStates, dispatch] = useReducer(cacheReducer, {})
    const mount = ({cacheId, reactElement}: IMount) => {
        if(cacheStates[cacheId]) {
            const cacheState = cacheStates[cacheId]
            if(cacheState.status === DESTROY) {
                cacheState.doms?.forEach(dom => dom.parentNode?.removeChild(dom))
                dispatch(createAction(cacheId, reactElement))
            }     
        } else {
            dispatch(createAction(cacheId, reactElement))
        }
    }
    const handleScroll =(cacheId: string, event: Event) => {
        if(cacheStates[cacheId]) {
            cacheStates[cacheId].scrolls = (event.target as HTMLDivElement).scrollTop
        }
    }
    const destroy = (cacheId: string) => {
        dispatch(destroyAction(cacheId))
    }

    return (
        <CacheContext.Provider value={{cacheStates, mount, handleScroll, destroy}}>
            {props.children}
            {   
                Object.values(cacheStates)
                .filter(cacheState => cacheState.status !== DESTROY)
                .map(({cacheId, reactElement}) => (
                        <div id={`cache-${cacheId}`} key={cacheId} ref={
                            (divDOM) => {
                                const cacheState = cacheStates[cacheId]
                                if(divDOM && (!cacheState.doms || cacheState.status === DESTROY)) {
                                    const doms = Array.from(divDOM.childNodes)
                                    dispatch(createdAction(cacheId, doms))
                                }
                            }
                        }>{reactElement}</div>  
                ))
            }
        </CacheContext.Provider>
    )
}
export default KeepAliveProvider