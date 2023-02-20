import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoutes = () => {
  const sessionStorageUid = sessionStorage.getItem('uid');
  const localStorageUid = localStorage.getItem('uid');

  return  sessionStorageUid || localStorageUid ? <Outlet /> : <Navigate to='/login' />
}
