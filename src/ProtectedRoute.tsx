import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SessionContext } from './contexts/Session';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { session } = useContext(SessionContext)!;
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!session?.sessionId) {
            const redirect = encodeURIComponent(location.pathname + location.search)
            navigate('/login?redirect=' + redirect);
        } else {
            setIsLoading(false);
        }
    }, [location.pathname, location.search, navigate, session]);

    if (isLoading) {
        return null;
    }

    return <>{children}</>;
}
