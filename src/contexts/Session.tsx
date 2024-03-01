import { createContext, useState, ReactNode, useEffect } from "react";

type SessionContext = {
    session: Session | null;
    sessionLoading: boolean;
    initSession: (data: {
        email: string;
        pass: string;
    }, remember: boolean) => Promise<void>;
    initSessionLoading: boolean;
    initSessionError: string | null;
    register: (formData: NewUser, remember: boolean) => Promise<void>;
    registerLoading: boolean;
    registerError: string | null;
    closeSession: () => void;
} | undefined

export interface Session {
    sessionId: string;
    username: string;
    email: string;
}

interface NewUser {
    username: string;
    email: string;
    pass1: string;
    pass2: string;
}

interface SessionProviderProps {
    children: ReactNode;
}

const SESSION_STORAGE_KEY = "session_data";

const SessionContext = createContext<SessionContext>(undefined);

const SessionProvider = ({ children }: SessionProviderProps) => {
    const [session, setSession] = useState<Session | null>(null);
    const [sessionLoading, setSessionLoading] = useState(true)

    const closeSession = async () => {
        setSessionLoading(true)
        // socket?.disconnect();
        // fetch(API_URL + "/userssession/delete", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ session_id: session?.sessionId }),
        // })
        console.log('closeSession')
        setSession(null);
        localStorage.removeItem(SESSION_STORAGE_KEY); // Remove session ID from storage when closing the session
        setSessionLoading(false)
    };

    const handleOnSession = (session: Session, remember: boolean) => {
        setSessionLoading(true)
        remember && localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session)); // Store session ID in localStorage
        setSession(session);
        setSessionLoading(false)
    };

    const isValidSessionId = async (sessionId: string) => {
        // const response = await fetch(API_URL + "/userssession/check", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ session_id: sessionId })
        // });

        // return response.ok;
        console.log(sessionId)
        return true;
    }

    useEffect(() => {
        setSessionLoading(true)
        // Retrieve the session ID from localStorage when the component mounts
        const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
        if (storedSession) {
            // Check if the session ID is valid
            const storedSessionJSON = JSON.parse(storedSession);
            isValidSessionId(storedSessionJSON.sessionId)
                .then(valid => {
                    if (valid) {
                        // If it's valid, set the session
                        setSession(storedSessionJSON);
                    } else {
                        // If it's not valid, remove it from localStorage
                        closeSession()
                    }
                })
                .catch(() => {
                    // If there's an error, remove the session ID from localStorage
                    closeSession()
                })
                .finally(() => {
                    setSessionLoading(false)
                });
        } else {
            setSessionLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.session = { id: session?.sessionId || null, sessionLoading };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, sessionLoading]);

    const [initSessionLoading, setInitSessionLoading] = useState<boolean>(false);
    const [initSessionError, setInitSessionError] = useState<string | null>(null);

    const initSession = async (data: { email: string; pass: string }, remember = false) => {
        setInitSessionLoading(true);
        setInitSessionError(null);

        try {
            // const response = await fetch(API_URL + "/userssession/init", {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(data),
            // })

            // if (!response.ok) {
            //     const errorMessage = getErrorMessage(response);
            //     setInitSessionError(errorMessage);
            //     return;
            // }

            // const sessionData = await response.json() as Session
            const sessionData = {
                sessionId: '123',
                username: 'test',
                email: 'email@email.com'
            }
            console.log(data);
            handleOnSession(sessionData, remember);
        } catch (error) {
            // console.log(error);

            setInitSessionError('Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setInitSessionLoading(false);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getErrorMessage = (response: Response) => {
        switch (response.status) {
            case 400:
                return 'El correo electrónico debe contener una @ y un dominio válido';
            case 401:
                return 'Contraseña incorrecta';
            case 404:
                return 'La cuenta no existe. ¡Regístrate! 😀';
            case 409:
                return 'Este email ya está asociado a una cuenta ¡Inicia sesión! 😀';
            default:
                return 'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.';
        }
    };

    const [registerLoading, setRegisterLoading] = useState<boolean>(false);
    const [registerError, setRegisterError] = useState<string | null>(null);

    const register = async (formData: NewUser, remember = false) => {
        // console.log('Registrando');

        setRegisterLoading(true);
        setRegisterError(null);

        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,}$/;

        if (!emailRegex.test(formData.email)) {
            setRegisterError('Ingresa un correo válido');
            setRegisterLoading(false);
            return;
        }

        if (!passRegex.test(formData.pass1)) {
            setRegisterError('La contraseña debe tener al menos 8 caracteres y contener al menos una letra y un número');
            setRegisterLoading(false);
            return;
        }

        if (formData.pass1 !== formData.pass2) {
            setRegisterError('Las contraseñas no coinciden.');
            setRegisterLoading(false);
            return;
        }

        //evalua si el username es valido (no debe tener espacios, ni caracteres especiales, ni numeros, para separar palabras usar guion bajo)
        const usernameRegex = /^[a-zA-Z0-9_]*$/;
        if (!usernameRegex.test(formData.username)) {
            setRegisterError('El nombre de usuario no es válido. No debe contener espacios, caracteres especiales ni números.');
            setRegisterLoading(false);
            return;
        }

        try {
            // const response = await fetch(API_URL + "/userssession/new", {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         username: formData.username,
            //         email: formData.email,
            //         pass: formData.pass1
            //     })
            // });

            // if (!response.ok) {
            //     const errorMessage = getErrorMessage(response);
            //     setRegisterError(errorMessage);
            //     return;
            // }

            // const sessionData = await response.json() as Session
            const sessionData = {
                sessionId: '123',
                username: 'test',
                email: 'email@email.com'
            }
            handleOnSession(sessionData, remember);
            console.log(formData);

        } catch (error) {
            setRegisterError('Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setRegisterLoading(false);
        }
    };

    const contextValue = {
        session,
        sessionLoading,
        initSession,
        initSessionLoading,
        initSessionError,
        register,
        registerLoading,
        registerError,
        closeSession,
    };

    return (
        <SessionContext.Provider value={contextValue}>
            {children}
        </SessionContext.Provider>
    );
};

export { SessionContext, SessionProvider };
