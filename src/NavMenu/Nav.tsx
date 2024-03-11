import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SessionContext } from "../contexts/Session";
import menuIcon from '../assets/menu.svg'
import './Nav.css'
import { NavbarContext } from '../contexts/Navbar.context';
import { getPathNamesFromText } from '../Utils/navigation';

export const Nav = () => {

    const { session, sessionLoading } = useContext(SessionContext)!;
    const { handleCloseMenu, handleOpenMenu, menu, onLogIn, onSignUp, routesData } = useContext(NavbarContext)!;
    const pathLocation = useLocation()

    const [routeNames, setRouteNames] = useState(getPathNamesFromText(pathLocation.pathname, routesData))

    useEffect(() => {
        setRouteNames(getPathNamesFromText(pathLocation.pathname, routesData))

    }, [pathLocation.pathname, routesData])



    return (
        <nav className="navBar">
            <div>
                {
                    (!onLogIn && !onSignUp && session)
                    &&
                    <>
                        <img className="navBar-MenuIcon" src={menuIcon} alt="menu" onClick={
                            () => {
                                if (menu.isOpen) {
                                    handleCloseMenu()
                                } else {
                                    handleOpenMenu()
                                }
                            }
                        } />
                        <div>
                            <img src="/logo.svg" alt="logo" />
                            <ul>
                                {
                                    routeNames.map((route, index) =>
                                        <li key={index}>
                                            <Link to={route.path}>
                                                {route.name}
                                            </Link>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </>
                }
            </div>
            <div>
                {
                    !sessionLoading ? session?.sessionId
                        ?
                        <div>
                            <p onClick={
                                () => {
                                    if (menu.isOpen) {
                                        handleCloseMenu()
                                    } else {
                                        handleOpenMenu()
                                    }
                                }
                            }>{session.username}</p>
                        </div>
                        :
                        (onLogIn || onSignUp) ?
                            onLogIn ?
                                <Link to={"/register?redirect=" + encodeURIComponent(pathLocation.pathname + pathLocation.search)}>
                                    <p>Registrarse</p>
                                </Link> :
                                <Link to={"/login?redirect=" + encodeURIComponent(pathLocation.pathname + pathLocation.search)}>
                                    <p>Iniciar sesión</p>
                                </Link>
                            :
                            <div className="navBar-identify">
                                <Link to={"/login?redirect=" + encodeURIComponent(pathLocation.pathname + pathLocation.search)}>
                                    <p>Iniciar sesión</p>
                                </Link>
                            </div>
                        : null
                }
            </div>
        </nav>
    )
}
