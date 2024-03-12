import { routesData } from "../NavMenu/Menu";

export const getPathNamesFromText = (targetPath: string, routesJson: routesData[]) => {
    const segments = targetPath.split('/');
    let accumulatedPath = '';
    const pathsAndNames: { path: string; name: string }[] = [];

    for (let i = 1; i < segments.length; i++) {
        accumulatedPath += '/' + segments[i];

        const foundRoute = routesJson.find(r => r.path === accumulatedPath);
        if (foundRoute) {
            pathsAndNames.push({ path: foundRoute.path, name: foundRoute.name });
        }
    }

    return pathsAndNames;
};

export const getSiblingRoutes = (currentPath: string, routesJson: routesData[]): routesData[] => {
    if (!currentPath.startsWith('/')) {
        currentPath = '/' + currentPath;
    }
    const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    const siblingRoutes = routesJson.filter(route => {
        const routeParentPath = route.path.substring(0, route.path.lastIndexOf('/'));
        return routeParentPath === parentPath;
    });
    return siblingRoutes;
};

export const getChildRoutes = (currentPath: string, routesJson: routesData[]): routesData[] => {
    if (!currentPath.startsWith('/')) {
        currentPath = '/' + currentPath;
    }
    const normalizedCurrentPath = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;

    const childRoutes = routesJson.filter(route => {
        if (!route.path.startsWith(normalizedCurrentPath)) return false;
        const remainingPath = route.path.substring(normalizedCurrentPath.length);
        return !remainingPath.includes('/');
    });

    return childRoutes;
};

export const hasChildRoutes = (currentPath: string, routesJson: routesData[]): boolean => {
    const normalizedPath = currentPath.endsWith('/') && currentPath !== '/' ? currentPath.slice(0, -1) : currentPath;
    const childRoute = routesJson.find(route => {
        const normalizedRoutePath = route.path.endsWith('/') && route.path !== '/' ? route.path.slice(0, -1) : route.path;
        return normalizedRoutePath !== normalizedPath && normalizedRoutePath.startsWith(normalizedPath);
    });

    return !!childRoute;
}