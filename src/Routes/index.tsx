import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
 import { APP_ROUTES } from "../utilities/constants";
import { BoDashboard, Login,ManagerScreen } from '../pages';


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path={APP_ROUTES.ROOT} element={<Login />} />
      {/* Manager Routes */}
      <Route path={APP_ROUTES.MANAGER_MANAGEMENT} element={<BoDashboard/>}/>
      <Route path={APP_ROUTES.CREATE_MANAGER} element={<ManagerScreen/>}/>


      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes