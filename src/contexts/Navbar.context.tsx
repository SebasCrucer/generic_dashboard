import { createContext, useEffect, useState } from "react";
import { Nav } from "../NavMenu/Nav";
import { Menu } from "../NavMenu/Menu";

type navbarContext = {
    location: string;
    setLocation: (location: string) => void;
    setOnLogIn: (onLogIn: boolean) => void;
    setOnSignUp: (onSignUp: boolean) => void;
    isDesktop: boolean;
    menu: {
        isOpen: boolean;
        onTransition: boolean;
    };
    setMenu: (menu: {
        isOpen: boolean;
        onTransition: boolean;
    }) => void;
    handleCloseMenu: () => void;
    handleOpenMenu: () => void;
    onSignUp: boolean;
    onLogIn: boolean;
} | undefined;

export const NavbarContext = createContext<navbarContext>(undefined);

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {

    const [location, setLocation] = useState('')
    const [onLogIn, setOnLogIn] = useState(false)
    const [onSignUp, setOnSignUp] = useState(false)

    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768)

    const [menu, setMenu] = useState<{
        isOpen: boolean;
        onTransition: boolean;
    }>({
        isOpen: isDesktop,
        onTransition: false
    })

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768)
            // window.innerWidth > 768 && handleOpenMenu()
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [
        isDesktop,
        setIsDesktop
    ])


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
        <NavbarContext.Provider value={{
            location,
            setLocation,
            setOnLogIn,
            setOnSignUp,
            isDesktop,
            menu,
            setMenu,
            handleCloseMenu,
            handleOpenMenu,
            onSignUp,
            onLogIn
        }}>
            <Nav />
            <div id="AppContainer" className={menu.isOpen || menu.onTransition ? 'menu-visible' : ''}>
                <Menu />
                <section id="AppContent" style={{
                    width: isDesktop && menu.isOpen ? 'calc(100% - 220px)' : '100%',
                }}>
                    {children}
                </section>
            </div>
        </NavbarContext.Provider>
    );
};