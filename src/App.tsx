import { useEffect } from 'react'
import './App.css'
import { Outlet, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from './ErrorPage/ErrorPage';
import { NavbarProvider } from './contexts/Navbar.context';
import Register from './Routes/SingIn/Register';
import ProtectedRoute from './ProtectedRoute';
import Login from './Routes/SingIn/Login';
import { Home } from './Routes/Home/Home';
import { homeLoaderData } from './Routes/Home/homeLoader';
import { HomeRouteData } from './NavMenu/Menu';



interface HomeRoute {
  data: HomeRouteData;
  routeObject: RouteObject;
}

const homeChildren: HomeRoute[] = [
  {
    data: {
      name: 'Home'
    },
    routeObject: {
      path: '/',
      element: (
        <Home />
      ),
      loader: homeLoaderData,
      errorElement: (
        <ErrorPage />
      )
    }
  },
  {
    data: {
      name: 'Page 1'
    },
    routeObject: {
      path: '/page1',
      element: (
        <div>Page 1</div>
      ),
      // loader: homeLoaderData,
      errorElement: (
        <ErrorPage />
      )
    }
  },
  {
    data: {
      name: 'Page 2'
    },
    routeObject: {
      path: '/page2',
      element: (
        <div>Page 2</div>
      ),
      // loader: homeLoaderData,
      errorElement: (
        <ErrorPage />
      )
    }
  },
  {
    data: {
      name: 'Page 3'
    },
    routeObject: {
      path: '/page3',
      element: (
        <div>Page 3</div>
      ),
      // loader: homeLoaderData,
      errorElement: (
        <ErrorPage />
      )
    }
  },
  {
    data: {
      name: 'Page 4'
    },
    routeObject: {
      path: '/page4',
      element: (
        <div>Page 4</div>
      ),
      // loader: homeLoaderData,
      errorElement: (
        <ErrorPage />
      )
    }
  },
];

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
    children: homeChildren.map((child) => child.routeObject)
  }
]

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NavbarProvider
        routesData={homeChildren.map((child) => ({ ...child.data, path: child.routeObject.path as string }))}
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
