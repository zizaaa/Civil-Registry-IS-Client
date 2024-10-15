import { createBrowserRouter } from 'react-router-dom';
import { BirthCert, DeathCert, Foundlings, MarriageCert, Reports, RootLayout, Settings } from '../hooks/imports';

export const router = createBrowserRouter([
    {
        path:"/",
        element:<RootLayout/>,
        children:[
            {
                path:"/",
                element:<BirthCert/>
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
                path:"/reports",
                element:<Reports/>
            },
            {
                path:"/settings",
                element:<Settings/>
            },
        ]
    }
]);