import { createBrowserRouter } from 'react-router-dom';
import { BirthCert, BirthCertInputs, BirthCertLayout, DeathCert, DeathCertInput, DeathCertLayout, Foundlings, FoundlingsInput, FoundlingsLayout, Home, Login, MarriageCert, MarriageCertInput, MarriageCertLayout, NotFound, RootLayout, Settings, ViewBirthCert, ViewDeathCertificate, ViewFoundLings, ViewMarriageCert } from '../hooks/imports';
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
                element:<MarriageCertLayout/>,
                children:[
                    {
                        path:"/marriage-certificate",
                        element:<MarriageCert/>
                    },
                    {
                        path:"registering-marriage-certificate",
                        element:<MarriageCertInput/>
                    },
                    {
                        path:"preview/:id",
                        element: <ViewMarriageCert/>
                    }
                ]
            },
            {
                path:"/foundlings",
                element:<FoundlingsLayout/>,
                children:[
                    {
                        path:"/foundlings",
                        element:<Foundlings/>
                    },
                    {
                        path:"registering-foundlings",
                        element:<FoundlingsInput/>
                    },
                    {
                        path:"preview/:id",
                        element:<ViewFoundLings/>
                    },
                ]
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