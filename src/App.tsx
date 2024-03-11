import { useEffect } from 'react'
import { Outlet, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from './ErrorPage/ErrorPage';
import { NavbarProvider } from './contexts/Navbar.context';
import Register from './Routes/SingIn/Register';
import ProtectedRoute from './ProtectedRoute';
import Login from './Routes/SingIn/Login';
import { homeLoaderData } from './Routes/Home/homeLoader';
import { HomeRoutes } from './HomeRoutes';

import './App.css'

const RouteObjects: RouteObject[] = [
  {
    path: "/login/:redirect?",
    element: (
      <Login />

    ),
    errorElement: (
      <ErrorPage />
    ),
  },
  {
    path: "/register/:redirect?",
    element: (
      <Register />
    ),
    errorElement: (
      <ErrorPage />
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    loader: homeLoaderData,
    errorElement: (
      <ErrorPage />
    ),
    children: HomeRoutes.map((child) => ({
      ...child.routeObject
    }))
  }
]

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NavbarProvider
        routesData={HomeRoutes.map((child) => ({ ...child.data, path: child.routeObject.path as string }))}
      />
    ),
    errorElement: (
      <ErrorPage />
    ),
    children: RouteObjects
  },
]);

const App = () => {
  useEffect(() => {
    const storage_version = '1.0.0'
    const actual_localStorage_version = localStorage.getItem('storage_version')
    if (actual_localStorage_version !== storage_version) {
      localStorage.clear()
      localStorage.setItem('storage_version', storage_version)
    }
  }, [])

  return (
    <RouterProvider router={router} />

  )
}

export default App
