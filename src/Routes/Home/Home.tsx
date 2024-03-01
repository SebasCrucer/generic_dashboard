import { useContext, useEffect } from 'react';
import { NavbarContext } from '../../contexts/Navbar.context';
import { useLoaderData, useNavigation } from 'react-router-dom';
import './Home.css'
import { homeLoaderData } from './homeLoader';

export const Home = () => {

    const homeData = useLoaderData() as homeLoaderData;
    const { state } = useNavigation()

    const { setLocation } = useContext(NavbarContext)!;

    useEffect(() => {
        setLocation('');
    }, [setLocation]);

    return (
        <section id='Home' style={{
            opacity: state === 'loading' ? 0.5 : 1
        }}>
            <div className='Home-container'>
                <div className='Home-data'>
                    {
                        homeData.status === 'ok' && homeData.homeData ?
                            <div>
                                <p>{homeData.homeData.title}</p>
                                <p>{homeData.homeData.description}</p>
                                <p>{homeData.homeData.content}</p>
                            </div> :
                            <p className='Home-noData'>No hay data</p>
                    }
                </div>
            </div>
        </section>
    )
}
