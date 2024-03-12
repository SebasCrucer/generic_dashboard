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
                <div>root</div>
            ),
            loader: homeLoaderData,
            errorElement: (
                <ErrorPage />
            )
        }
    },
    {
        data: {
            name: 'Home'
        },
        routeObject: {
            path: '/home',
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
            name: 'Home/1'
        },
        routeObject: {
            path: '/home/1',
            element: (
                <div>Home/1</div>

            ),
            errorElement: (
                <ErrorPage />
            )
        }
    },
    {
        data: {
            name: 'Home/2'
        },
        routeObject: {
            path: '/home/2',
            element: (
                <div>Home/2</div>

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