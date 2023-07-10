### react手写的keep-alive组件，缓存路由跳转中不想被直接销毁的组件
1. src/keep-alive/目录为keep-alive的核心库
2. src/demo/目录提供了keep-alive的一些使用示例
3. dist目录为keep-alive的编译文件

Using npm:
```javascript
npm install react-wangyu-keep-alive -S 
```
Once the package is installed, you can import the library using require approach:
```javascript
import {KeepAliveProvider, withKeepAlive} from 'react-wangyu-keep-alive'
const KeepAliveUserList = withKeepAlive(UserList, {cacheId: 'UserList', scroll: true})

root.render(
    <KeepAliveProvider>
      <ul>
        <li><Link replace to="/list">用户列表</Link></li>
      </ul>
      <Routes>
        <Route path="/list" element={<KeepAliveUserList />} />
      </Routes>
    </KeepAliveProvider>
)
```
###### KeepAliveProvider获取真实DOM并存储在Reducer中
```javascript
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
```