import { useQuery } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { sessionCookie } from './auth';
import { Loading } from '../hooks/imports';

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['auth-checker'],
        queryFn: sessionCookie,
    });

    // Show loading state while checking authentication
    if (isLoading) {
        return <Loading/>;
    }

    // If not authenticated, redirect to the login page
    if (!data?.isAuthenticated) {
        return <Navigate to="/form/login" />;
    }

    // If authenticated, render the children
    return <>{children}</>;
};

export default ProtectedRoute;