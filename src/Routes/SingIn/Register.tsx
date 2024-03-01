import { FormEvent, useContext, useEffect, useState } from 'react';
import { SessionContext } from '../../contexts/Session';
import { useNavigate, useNavigation, useSearchParams } from 'react-router-dom';
import './Register.css';
import { Checkbox } from '../../Utils/Checkbox';
import { NavbarContext } from '../../contexts/Navbar.context';

export default function Register() {

    const {
        register,
        registerError,
        session,
        sessionLoading,
        registerLoading
    } = useContext(SessionContext)!;

    const { setOnSignUp } = useContext(NavbarContext)!;

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();
    const { state } = useNavigation()

    useEffect(() => {
        setOnSignUp(true)
        return () => {
            setOnSignUp(false)
        }
    }, [setOnSignUp])

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
        await register({ username, email, pass1, pass2 }, remember);
    };

    if (sessionLoading) {
        return null;
    } else {
        return (
            <section id='Register' style={{
                opacity: (state === 'loading' || state === 'submitting') ? 0.5 : 1
            }}>
                <img
                    src="/logo.svg"
                    alt="logo"
                />
                <form
                    className='Register-form'
                    onSubmit={handleSubmit}
                >
                    <h1>Regístrate</h1>
                    {
                        registerError
                            ?
                            <p className='alert-info'>
                                {registerError}
                            </p>
                            :
                            <p className='alert-info no-alert' />
                    }
                    <input
                        disabled={registerLoading}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Nombre de usuario'
                        maxLength={18}
                    />
                    <input
                        disabled={registerLoading}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Correo electrónico'
                    />
                    <div className='PasswordInput' >
                        <input
                            disabled={registerLoading}
                            type={showPassword ? "text" : "password"}
                            value={pass1}
                            onChange={(e) => setPass1(e.target.value)}
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
                    <div className='PasswordInput' >
                        <input
                            disabled={registerLoading}
                            type={showPassword ? "text" : "password"}
                            value={pass2}
                            onChange={(e) => setPass2(e.target.value)}
                            placeholder='Repite la contraseña'
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
                    <div className='Register-form-remember'>
                        <Checkbox
                            disabled={registerLoading}
                            id="remember"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                        <label htmlFor="remember">Recuérdame</label>
                    </div>
                    <button
                        type="submit"
                        disabled={registerLoading || state === 'loading'}
                    >{
                            registerLoading
                                ?
                                <box-icon
                                    name='loader-alt'
                                    animation='spin'
                                />
                                :
                                'Registrarse'
                        }
                    </button>
                </form>
            </section>
        );
    }
}
