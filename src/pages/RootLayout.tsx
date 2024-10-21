import { Breadcrumb, Drawer, Sidebar } from "flowbite-react";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LogoutModal, NavBar, SideNav } from "../hooks/imports";

function RootLayout() {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const location = useLocation();
    
    const handleClose = () => setIsOpen(false);

    const breadcrumbMap: { [key: string]: string } = {
        "/": "Dashboard",
        "/birth-certificate": "Birth Certificate",
        "/birth-certificate/registering-birth-certificate": "Register Birth Certificate",
        "/death-certificate": "Death Certificate",
        "/death-certificate/registering-death-certificate": "Register Death Certificate",
        "/marriage-certificate": "Marriage Certificate",
        "/marriage-certificate/registering-marriage-certificate":"Register Marriage Certificate",
        "/foundlings": "Foundlings",
        "/foundlings/registering-foundlings": "Registering Foundlings",
        "/settings": "Settings",
    };
    
    const pathSegments = location.pathname.split("/").filter(Boolean); // Remove empty segments
    const breadcrumbItems = [];
    
    let idSegment = '';

    // Initialize a flag to check for preview
    let isPreview = false;

    pathSegments.forEach((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;

        if (segment === "preview") {
            isPreview = true;
            // Capture the id segment
            idSegment = pathSegments[index + 1] || ''; // Get the id from the path
            // Add Preview breadcrumb
            breadcrumbItems.push(
                <Breadcrumb.Item key={path} href="#">
                    Preview
                </Breadcrumb.Item>
            );
        } else {
            // Use the breadcrumb map for regular segments
            const label = breadcrumbMap[path] || null; // Don't default to "Unknown"
            if (label) {
                breadcrumbItems.push(
                    <Breadcrumb.Item key={path} href={path}>
                        {label}
                    </Breadcrumb.Item>
                );
            }
        }
    });

    // If we found an id segment, add it as the last breadcrumb item
    if (idSegment) {
        breadcrumbItems.push(
            <Breadcrumb.Item key={`/birth-certificate/preview/${idSegment}`} href="#">
                {idSegment}
            </Breadcrumb.Item>
        );
    }

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
