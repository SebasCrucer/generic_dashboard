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

export const getSameLevelRoutes = (currentPath: string, routesJson: routesData[]): routesData[] => {
    const currentLevel = currentPath.split('/').length - 1;

    const sameLevelRoutes = routesJson.filter(route => {
        const routeLevel = route.path.split('/').length - 1;
        return routeLevel === currentLevel;
    });

    return sameLevelRoutes;
};