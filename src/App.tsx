import { useEffect } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';
import { NavbarProvider } from './contexts/Navbar.context';
import Register from './Routes/SingIn/Register';
import ProtectedRoute from './ProtectedRoute';
import Login from './Routes/SingIn/Login';
import { Home } from './Routes/Home/Home';
import { homeLoaderData } from './Routes/Home/homeLoader';

const router = createBrowserRouter([
  {
    path: "/login/:redirect?",
    element: (
      <NavbarProvider>
        <Login />
      </NavbarProvider>

    ),
    errorElement: (
      <NavbarProvider>
        <ErrorPage />
      </NavbarProvider>
    )
  },
  {
    path: "/register/:redirect?",
    element: (
      <NavbarProvider>
        <Register />
      </NavbarProvider>

    ),
    errorElement: (
      <NavbarProvider>
        <ErrorPage />
      </NavbarProvider>
    )
  },
  {
    path: "/",
    element: (
      <NavbarProvider>
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      </NavbarProvider>

    ),
    loader: homeLoaderData,
    errorElement: (
      <NavbarProvider>
        <ErrorPage />
      </NavbarProvider>
    )
  }
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
