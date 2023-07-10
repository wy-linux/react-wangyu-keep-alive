import { ReactElement } from 'react' 
export const CREATE = 'CREATE' as const
export const CREATED = 'CREATED' as const
export const DESTROY = 'DESTROY' as const

export const createAction = (cacheId: string, reactElement: ReactElement) => ({
    type: CREATE,
    payload: { cacheId, reactElement }
})

export const createdAction = (cacheId: string, doms: ChildNode[]) => ({
    type: CREATED,
    payload: { cacheId, doms }
})

export const destroyAction = (cacheId: string) => ({
    type: DESTROY,
    payload: { cacheId }
})