import React from 'react'
import { useRef, useContext, useEffect } from 'react'
import { CacheContext } from './KeepAliveProvider'
import { DESTROY } from './reducers/cacheActions'
import { v4 as uuidV4 } from "uuid";
export function withKeepAlive(OldComponent: React.FC, {cacheId = uuidV4(), scroll = false}) {
    return function (props: any) {
        const {cacheStates, mount, handleScroll, destroy} = useContext(CacheContext)
        const divRef = useRef<HTMLDivElement>(null)
        useEffect(() => {
            if(scroll) {
                divRef.current!.addEventListener('scroll', handleScroll.bind(null, cacheId), true)
            }
        }, [handleScroll])
        useEffect(() => {
            const cacheState = cacheStates[cacheId]
            if(cacheState && cacheState.doms && cacheState.status !== DESTROY) {
                const doms = cacheState.doms
                doms.forEach(dom => {
                    divRef.current!.appendChild(dom)
                    if(scroll) {
                        dom.addEventListener('scroll', handleScroll.bind(null, cacheId), true)
                    }
                })
                if(scroll) {
                    doms.forEach(dom => {                
                        (dom as HTMLElement).scrollTop = cacheState.scrolls               
                    })
                }
            } else {
                mount({
                    cacheId,
                    reactElement: <OldComponent {...props} destroy={destroy}/>
                })
            }
        }, [cacheStates, mount, props])
        return (
            <div 
                id={`keepalive_${cacheId}`} 
                ref={divRef}
            > 
            </div>
        )
    }
}
export default withKeepAlive