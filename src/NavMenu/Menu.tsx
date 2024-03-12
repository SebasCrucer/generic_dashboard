import { useContext } from 'react'
import { ThemeContext } from '../contexts/Theme.context';
import { SessionContext } from '../contexts/Session';
import { NavLink, useLocation } from 'react-router-dom';
import './Menu.css'
import { NavbarContext } from '../contexts/Navbar.context';
import { getSiblingRoutes } from '../Utils/navigation';

export interface HomeRouteData {
    name: string;
}
export interface routesData extends HomeRouteData {
    path: string;
}

export const Menu = () => {

    const { theme, toggleTheme } = useContext(ThemeContext)!;
    const { session, closeSession } = useContext(SessionContext)!;
    const { handleCloseMenu, menu, setMenu, isDesktop, routesData } = useContext(NavbarContext)!;
    const pathLocation = useLocation()

    return (
        <section
            id="Menu"
            style={{

                display:
                    menu.isOpen
                        ? 'block'
                        : menu.onTransition
                            ? 'inherit'
                            : 'none',

                backdropFilter: (menu.isOpen && !menu.onTransition) ? 'blur(2px)' : 'blur(0px)',
            }}
            onTransitionEnd={() => setMenu({ ...menu, onTransition: false })}
        >
            <div
                className="Menu-container"
                onTransitionEnd={() => setMenu({ ...menu, onTransition: false })}
                style={{
                    left: (menu.isOpen && !menu.onTransition) ? 0 : '-100%'
                }}
            >
                <ul className="Menu-options">
                    {
                        session &&
                        <>
                            <div className="Menu-top">
                                {
                                    getSiblingRoutes(pathLocation.pathname, routesData).map((route, index) =>
                                        <div className='Menu-op' key={index}>
                                            <NavLink
                                                to={route.path}
                                                className={({ isActive, isPending }) =>
                                                    isActive
                                                        ? "active"
                                                        : isPending
                                                            ? "pending"
                                                            : ""
                                                }>
                                                <li onClick={!isDesktop ? handleCloseMenu : undefined}>
                                                    {route.name}
                                                </li>
                                            </NavLink>
                                            <ul className={'Menu-subOp ' + (route.path === pathLocation.pathname ? ' open' : 'close')
                                            }>
                                                {
                                                    routesData.filter(r => r.path.startsWith(route.path + '/')).map((childRoute, index) =>
                                                        <NavLink
                                                            to={childRoute.path}
                                                            key={index}
                                                            className={({ isActive, isPending }) =>
                                                                isActive
                                                                    ? "active"
                                                                    : isPending
                                                                        ? "pending"
                                                                        : ""
                                                            }>
                                                            <li onClick={!isDesktop ? handleCloseMenu : undefined}>
                                                                {childRoute.name}
                                                            </li>
                                                        </NavLink>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="Menu-footer">
                                <li className='no-action'>
                                    <p>{session.email}</p>
                                </li>
                                <li onClick={toggleTheme}>
                                    <p>Tema</p>
                                    {
                                        theme === 'light'
                                            ?
                                            <box-icon name='moon' type='solid' />
                                            :
                                            <box-icon name='sun' />
                                    }
                                </li>
                                <li onClick={() => { handleCloseMenu(); closeSession() }}>
                                    <p>Cerrar sesión</p>
                                    <box-icon name='log-out' rotate='180' />
                                </li>
                            </div>
                        </>
                    }
                </ul>
                <div className="Menu-close" onClick={handleCloseMenu}>
                </div>
            </div>
        </section>
    )
}
