import { createContext, useContext, useState } from "react";
import { ThemeContext } from "./Theme.context";
import { SessionContext } from "./Session";
import { Link, useLocation } from "react-router-dom";
import menuIcon from '../assets/menu.svg'

type navbarContext = {
    location: string;
    setLocation: (location: string) => void;
    setOnLogIn: (onLogIn: boolean) => void;
    setOnSignUp: (onSignUp: boolean) => void;
} | undefined;

export const NavbarContext = createContext<navbarContext>(undefined);

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {

    const { theme, toggleTheme } = useContext(ThemeContext)!;
    const { session, closeSession, sessionLoading } = useContext(SessionContext)!;
    const pathLocation = useLocation()
    const [location, setLocation] = useState('')
    const [onLogIn, setOnLogIn] = useState(false)
    const [onSignUp, setOnSignUp] = useState(false)

    const [menu, setMenu] = useState<{
        isOpen: boolean;
        onTransition: boolean;
    }>({
        isOpen: false,
        onTransition: false
    })

    const handleOpenMenu = () => {
        setMenu({
            isOpen: true,
            onTransition: true
        })
        setTimeout(() => {
            setMenu(prev => ({
                ...prev,
                onTransition: false
            }))
        }, 0)
    }

    const handleCloseMenu = () => {
        setMenu({
            isOpen: false,
            onTransition: true

        })
    }

    return (
        <NavbarContext.Provider value={{ location, setLocation, setOnLogIn, setOnSignUp }}>
            {
                session &&
                <section
                    id="Menu"
                    style={{

                        display: menu.isOpen ?
                            'block' :
                            !menu.onTransition ?
                                'none' :
                                'inherit',

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
                                <Link to="/">
                                    <li onClick={handleCloseMenu}>
                                        Mis suscripciones
                                    </li>
                                </Link>
                            </div>
                            <div className="Menu-footer">
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
                            </div>
                        </ul>
                        <div className="Menu-close" onClick={handleCloseMenu}>
                        </div>
                    </div>
                </section>
            }
            <nav className="navBar">
                <div>
                    {
                        (!onLogIn && !onSignUp && session)
                        &&
                        <>
                            <img src={menuIcon} alt="menu" onClick={
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
            <section id="AppContent">
                {children}
            </section>
        </NavbarContext.Provider>
    );
};