import { Breadcrumb, Drawer, Sidebar } from "flowbite-react";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LogoutModal, NavBar, SideNav } from "../hooks/imports";

function RootLayout() {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const location = useLocation();
    
    const handleClose = () => setIsOpen(false);

    // Define paths and corresponding breadcrumb labels
    const breadcrumbMap: { [key: string]: string } = {
        "/": "Dashboard",
        "/birth-certificate": "Birth Certificate",
        "/birth-certificate/registering-birth-certificate": "Register Birth Certificate",
        "/death-certificate": "Death Certificate",
        "/marriage-certificate": "Marriage Certificate",
        "/foundlings": "Foundlings",
        "/settings": "Settings",
    };

    // Split the path and map each segment to a breadcrumb label
    const pathSegments = location.pathname.split("/").filter(Boolean); // remove empty segments
    const breadcrumbItems = pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const label = breadcrumbMap[path] || "Unknown"; // Default to 'Unknown' if no match
        return (
            <Breadcrumb.Item key={path} href={path}>
                {label}
            </Breadcrumb.Item>
        );
    });

    return (
        <main>
            {/* Modals */}
            <LogoutModal />

            <NavBar setIsOpen={setIsOpen} isOpen={isOpen} />

            <div className="flex">
                <aside id="sidebar">
                    <div className="sm:hidden block">
                        <Drawer open={isOpen} onClose={handleClose}>
                            <Drawer.Header title="Drawer" />
                            <Drawer.Items className="pt-16">
                                <SideNav />
                            </Drawer.Items>
                        </Drawer>
                    </div>
                    <Sidebar
                        aria-label="Sidebar with multi-level dropdown example"
                        className="border-r-[1px] border-solid border-gray-200 pt-14 sm:block hidden"
                    >
                        <Sidebar.Items className="pt-12">
                            <Sidebar.ItemGroup>
                                <SideNav />
                            </Sidebar.ItemGroup>
                        </Sidebar.Items>
                    </Sidebar>
                </aside>

                <div className="flex-1 h-screen overflow-auto">
                    <div className="p-4 mt-[6.5rem]">
                        <Breadcrumb aria-label="Default breadcrumb example" className="mb-5">
                            <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
                            {breadcrumbItems}
                        </Breadcrumb>
                        <Outlet />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default RootLayout;