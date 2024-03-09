import { useContext } from 'react'
import { ThemeContext } from '../contexts/Theme.context';
import { SessionContext } from '../contexts/Session';
import { Link } from 'react-router-dom';
import './Menu.css'
import { NavbarContext } from '../contexts/Navbar.context';

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
                    <div className="Menu-top">
                        {
                            routesData.map((route, index) =>
                                <Link to={route.path} key={index}>
                                    <li onClick={!isDesktop ? handleCloseMenu : undefined}>
                                        {route.name}
                                    </li>
                                </Link>
                            )
                        }
                    </div>
                    <div className="Menu-footer">
                        {
                            session &&
                            <>
                                <li>
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
                            </>

                        }
                    </div>
                </ul>
                <div className="Menu-close" onClick={handleCloseMenu}>
                </div>
            </div>
        </section>
    )
}
