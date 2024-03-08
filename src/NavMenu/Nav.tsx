import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SessionContext } from "../contexts/Session";
import menuIcon from '../assets/menu.svg'
import './Nav.css'
import { NavbarContext } from '../contexts/Navbar.context';

export const Nav = () => {

    const { session, sessionLoading } = useContext(SessionContext)!;
    const { location, handleCloseMenu, handleOpenMenu, menu, onLogIn, onSignUp } = useContext(NavbarContext)!;
    const pathLocation = useLocation()

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
                            <h1>{location}</h1>
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
