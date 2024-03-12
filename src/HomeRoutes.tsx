import { Home } from './Routes/Home/Home';
import { HomeRouteData } from './NavMenu/Menu';
import { ErrorPage } from './ErrorPage/ErrorPage';
import { homeLoaderData } from './Routes/Home/homeLoader';
import { RouteObject } from 'react-router-dom';


interface HomeRoute {
    data: HomeRouteData;
    routeObject: RouteObject;
}

export const HomeRoutes: HomeRoute[] = [
    {
        data: {
            name: 'root'
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
            name: 'Page 0'
        },
        routeObject: {
            path: '/page0',
            element: (
                <div>Page 0</div>
            ),
            loader: homeLoaderData,
            errorElement: (
                <ErrorPage />
            )
        }
    },
    {
        data: {
            name: 'page0/1'
        },
        routeObject: {
            path: '/page0/1',
            element: (
                <div>page0/1</div>

            ),
            errorElement: (
                <ErrorPage />
            )
        }
    },
    {
        data: {
            name: 'page0/2'
        },
        routeObject: {
            path: '/page0/2',
            element: (
                <div>page0/2</div>

            ),
            errorElement: (
                <ErrorPage />
            )
        }
    },
    {
        data: {
            name: 'page0/2/1'
        },
        routeObject: {
            path: '/page0/2/1',
            element: (
                <div>page0/2</div>

            ),
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
    {
        data: {
            name: 'Page 48'
        },
        routeObject: {
            path: '/page48',
            element: (
                <div>Page 48</div>
            ),
            // loader: homeLoaderData,
            errorElement: (
                <ErrorPage />
            )
        }
    },
];