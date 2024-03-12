import { FormEvent, useContext, useEffect, useState } from 'react';
import { SessionContext } from '../../contexts/Session';
import { NavbarContext } from '../../contexts/Navbar.context';
import { useNavigate, useNavigation, useSearchParams } from 'react-router-dom';
import './Login.css';
import { Checkbox } from '../../Utils/Checkbox';

export default function Login() {

    const {
        initSession,
        initSessionError,
        session,
        sessionLoading,
        initSessionLoading
    } = useContext(SessionContext)!;

    const { setOnLogIn } = useContext(NavbarContext)!;

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();
    const { state } = useNavigation()

    useEffect(() => {
        setOnLogIn(true)
        return () => {
            setOnLogIn(false)
        }
    }, [setOnLogIn])

    const redirect = decodeURIComponent(searchParams.get('redirect') || '');
    useEffect(() => {
        if (session?.sessionId) {
            navigate(redirect);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await initSession({ email, pass }, remember);
    };

    if (sessionLoading) {
        return null;
    } else {
        return (
            <section id='Login' className={state === 'loading' ? 'page-loading' : ''}>
                <img
                    src="/logo.svg"
                    alt="logo"
                />
                <form
                    className='Login-form'
                    onSubmit={handleSubmit}
                >
                    <h1>Inicia sesión</h1>
                    {
                        initSessionError
                            ?
                            <p className='alert-info'>
                                {initSessionError}
                            </p>
                            :
                            <p className='alert-info no-alert' />
                    }
                    <input
                        disabled={initSessionLoading}
                        autoComplete='email'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Correo electrónico'
                    />
                    <div className='PasswordInput' >
                        <input
                            disabled={initSessionLoading}
                            autoComplete="current-password"
                            type={showPassword ? "text" : "password"}
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder='Contraseña'
                        />
                        {
                            showPassword
                                ?
                                <box-icon
                                    name='show-alt'
                                    onClick={togglePasswordVisibility}
                                />
                                :
                                <box-icon
                                    name='hide'
                                    onClick={togglePasswordVisibility}
                                />
                        }
                    </div>
                    <div className='Login-form-remember'>
                        <Checkbox
                            disabled={initSessionLoading}
                            id="remember"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                        <label htmlFor="remember">Recuérdame</label>
                    </div>
                    <button
                        type="submit"
                        disabled={initSessionLoading || state === 'loading'}
                    >{
                            initSessionLoading
                                ?
                                <box-icon
                                    name='loader-alt'
                                    animation='spin'
                                />
                                :
                                'Iniciar sesión'
                        }
                    </button>
                </form>
            </section>
        );
    }
}
