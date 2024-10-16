import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet } from 'react-router-dom';
import { sessionCookie } from './auth';
import { Toaster } from 'react-hot-toast';
import { Loading } from '../hooks/imports'

// Custom component to protect routes
const LogedIn = () => {

    const { data,isLoading } = useQuery({queryKey:['auth-checker'], queryFn:sessionCookie})

    // Show loading state while checking authentication
    if (isLoading) {
        return <Loading/>
    }

    // If not authenticated, redirect to the login page
    if (data.isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <section className=''>
            <Toaster/>
            <div className='flex items-center justify-center w-full h-screen'>
                <Outlet />
            </div>
        </section>
    )
};

export default LogedIn;