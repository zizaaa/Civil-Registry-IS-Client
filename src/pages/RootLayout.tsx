import { Breadcrumb, Drawer, Sidebar } from "flowbite-react"
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom"
import { NavBar, SideNav } from "../hooks/imports";

function RootLayout() {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const location = useLocation();
    
    const handleClose = () => setIsOpen(false);

    return (
        <main>
            <NavBar
                setIsOpen = { setIsOpen }
                isOpen = { isOpen }
            />
            <div className="flex">
                <aside id="sidebar">
                    <div className="sm:hidden block">
                        <Drawer open={isOpen} onClose={handleClose}>
                            <Drawer.Header title="Drawer" />
                            <Drawer.Items className="pt-16">
                                <SideNav/>
                            </Drawer.Items>
                        </Drawer>
                    </div>
                    <Sidebar aria-label="Sidebar with multi-level dropdown example" className="border-r-[1px] border-solid border-gray-200  pt-14 sm:block hidden">
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
                                {
                                    location.pathname === '/settings' ? 
                                    (null):(
                                        <Breadcrumb.Item href="">
                                            Services
                                        </Breadcrumb.Item>
                                    )
                                }
                            <Breadcrumb.Item>
                                {
                                    location.pathname === '/' ?
                                    ('Birth Certificate'):location.pathname === '/death-certificate' ?
                                    ('Death Certificate'):location.pathname === '/marriage-certificate' ?
                                    ('Marriage certificate'):location.pathname === '/foundlings' ?
                                    ('Foundlings'):location.pathname === '/reports' ?
                                    ('Reports'):location.pathname === '/settings' ?
                                    ('Settings'):('')
                                }
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default RootLayout