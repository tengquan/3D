import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import D1 from './pages/3D1'
import D2 from './pages/3D2'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/d1'element={<D1/>} />
        <Route path='/d2'element={<D2/>} />
      </Route>
    </Routes>
  );
}
const Layout = () => {
  return <Outlet />
}

export default App;
