import { createBrowserRouter } from 'react-router-dom';
import { BirthCert, BirthCertInputs, BirthCertLayout, DeathCert, DeathCertInput, DeathCertLayout, Foundlings, Home, Login, MarriageCert, NotFound, RootLayout, Settings, ViewBirthCert, ViewDeathCertificate } from '../hooks/imports';
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
                    },
                    {
                        path:"preview/:id",
                        element:<ViewBirthCert/>
                    }
                ]
            },
            {
                path:"/death-certificate",
                element:<DeathCertLayout/>,
                children:[
                    {
                        path:"/death-certificate",
                        element: <DeathCert/>
                    },
                    {
                        path:"registering-death-certificate",
                        element: <DeathCertInput/>
                    },
                    {
                        path:"preview/:id",
                        element: <ViewDeathCertificate/>
                    }
                ]
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