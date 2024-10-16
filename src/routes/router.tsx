import { createBrowserRouter } from 'react-router-dom';
import { BirthCert, BirthCertInputs, BirthCertLayout, DeathCert, Foundlings, Home, Login, MarriageCert, NotFound, RootLayout, Settings } from '../hooks/imports';
import LogedIn from '../auth/LogedIn';
import ProtectedRoute from '../auth/ProtectedRoute';

export const router = createBrowserRouter([
    {
        path:"/",
        element:(
            <ProtectedRoute>
                <RootLayout/>
            </ProtectedRoute>
        ),
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/birth-certificate",
                element:<BirthCertLayout/>,
                children:[
                    {
                        path:"/birth-certificate",
                        element:<BirthCert/>
                    },
                    {
                        path:"registering-birth-certificate",
                        element:<BirthCertInputs/>
                    }
                ]
            },
            {
                path:"/death-certificate",
                element:<DeathCert/>
            },
            {
                path:"/marriage-certificate",
                element:<MarriageCert/>
            },
            {
                path:"/foundlings",
                element:<Foundlings/>
            },
            {
                path:"/settings",
                element:<Settings/>
            },
        ]
    },
    {
        path:"/form",
        element: <LogedIn/>,
        children:[
            {
                path:"login",
                element: <Login/>
            }
        ]
    },
    {
        path:"*",
        element: <NotFound/>
    }
]);