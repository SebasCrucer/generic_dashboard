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

export const getParentRoute = (currentPath: string, routesJson: routesData[]): routesData | null => {
    if (!currentPath.startsWith('/')) {
        currentPath = '/' + currentPath;
    }
    const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/')) || '/';

    // Encuentra y devuelve la ruta padre si existe
    const parentRoute = routesJson.find(route => route.path === parentPath);
    return parentRoute || null;
};

export const getSiblingRoutes = (currentPath: string, routesJson: routesData[]): routesData[] => {
    if (!currentPath.startsWith('/')) {
        currentPath = '/' + currentPath;
    }
    const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));

    // Filtrar para encontrar todas las rutas hermanas, excluyendo la ruta actual
    const siblingRoutes = routesJson.filter(route => {
        const routeParentPath = route.path.substring(0, route.path.lastIndexOf('/'));
        return routeParentPath === parentPath;
    });

    return siblingRoutes;
};