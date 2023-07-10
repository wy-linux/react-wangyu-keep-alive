import React from 'react'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Home from './demo/Home'
import UserList from './demo/UserList'
import UserAdd from './demo/UserAdd'
import {KeepAliveProvider, withKeepAlive} from './keep-alive'
const KeepAliveHome = withKeepAlive(Home, {cacheId: 'Home'})
const KeepAliveUserList = withKeepAlive(UserList, {cacheId: 'UserList', scroll: true})
const KeepAliveUserAdd = withKeepAlive(UserAdd, {cacheId: 'UserAdd'})

const App = () => {
  return (
    <BrowserRouter>
      <KeepAliveProvider>
        <ul>
          <li><Link replace to="/">首页</Link></li>
          <li><Link replace to="/list">用户列表</Link></li>
          <li><Link replace to="/add">添加用户</Link></li>
        </ul>
        <Routes>
          <Route path="/" element={<KeepAliveHome />}/>
          <Route path="/list" element={<KeepAliveUserList />} />
          <Route path="/add" element={<KeepAliveUserAdd />} />
        </Routes>
      </KeepAliveProvider>
    </BrowserRouter>
  )
}
export default App

