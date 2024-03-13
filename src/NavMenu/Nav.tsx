import { Fragment, useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SessionContext } from "../contexts/Session";
import menuIcon from '../assets/menu.svg'
import './Nav.css'
import { NavbarContext } from '../contexts/Navbar.context';
import { getPathNamesFromText } from '../Utils/navigation';

export const Nav = () => {

    const { session, sessionLoading } = useContext(SessionContext)!;
    const { handleCloseMenu, handleOpenMenu, menu, onLogIn, onSignUp, routesData, isDesktop } = useContext(NavbarContext)!;
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
                            <ul className='navBar-routes'>
                                {
                                    routeNames.slice(isDesktop ? 0 : routeNames.length - 2, routeNames.length).map((route, index) => (
                                        <Fragment key={index}>
                                            {
                                                index !== 0 &&
                                                <box-icon name='chevron-left' ></box-icon>
                                            }
                                            {
                                                pathLocation.pathname === route.path ?
                                                    <li>{route.name}</li> :
                                                    <Link to={route.path}>
                                                        <li>
                                                            {route.name}
                                                        </li>
                                                    </Link>
                                            }
                                        </Fragment>
                                    )
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
