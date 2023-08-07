import React, { createRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Admin } from '../pages/Admin/Admin'
import { FallbackPage } from '../pages/FallbackPage/FallbackPage'
import { authRoutes, publicRoutes } from '../routes'
import { RootState, store } from '../store/store'
import { getUserState } from '../store/UserStore'
import { ADMIN_ROUTE } from '../utils/consts'
import { FootMenuWrapper } from './FootMenuWrapper'






export const AppRouter = () => {

  const dispatch = useDispatch()
  const IS_AUTH = useSelector((state: RootState) => state.user.isLogin)
  const IS_ADMIN = useSelector((state: RootState) => state.user.user.role == "ADMIN")

  // const routes = (IS_AUTH ? authRoutes.map(({ path, Component }) => <Route key={path} path={path} element={Component} />) : publicRoutes.map(({ path, Component }) => <Route key={path} path={path} element={Component}  />))
  const routes = (IS_AUTH ? (IS_ADMIN ? [...authRoutes, {path: ADMIN_ROUTE, element: <Admin />, nodeRef: createRef()}] : authRoutes) : publicRoutes)
  

  const router = createBrowserRouter([
    {
      path: '/',
      element: <FootMenuWrapper />,
      errorElement: <FallbackPage />,
      children: routes.map((route) => ({
        index: route.path === '/',
        path: route.path === '/' ? undefined : route.path,
        element: route.element,
        nodeRef: route.nodeRef
      }))
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
