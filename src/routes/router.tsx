import { createBrowserRouter } from 'react-router-dom';
import { BirthCert, BirthCertInputs, BirthCertLayout, DeathCert, DeathCertInput, DeathCertLayout, EditBirthCert, EditFIleBirthCert, EditFileFoundlings, EditFoundlings, Foundlings, FoundlingsInput, FoundlingsLayout, Home, Login, MarriageCert, MarriageCertInput, MarriageCertLayout, NotFound, RootLayout, Settings, ViewBirthCert, ViewDeathCertFile, ViewDeathCertificate, ViewFoundLings, ViewFoundlingsFile, ViewlBirthCertFile, ViewMarriageCert, ViewMarriageCertFile } from '../hooks/imports';
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
                    },
                    {
                        path:"preview/file/:id",
                        element:<ViewlBirthCertFile/>
                    },
                    {
                        path:"edit/:id",
                        element:<EditBirthCert/>
                    },
                    {
                        path:"edit/file/:id",
                        element:<EditFIleBirthCert/>
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
                    },
                    {
                        path:"preview/file/:id",
                        element:<ViewDeathCertFile/>
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
                    },
                    {
                        path:"preview/file/:id",
                        element: <ViewMarriageCertFile/>
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
                    {
                        path:"preview/file/:id",
                        element:<ViewFoundlingsFile/>
                    },
                    {
                        path:"edit/:id",
                        element:<EditFoundlings/>
                    },
                    {
                        path:"edit/file/:id",
                        element:<EditFileFoundlings/>
                    }
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