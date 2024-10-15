import React from "react"
import { Link } from "react-router-dom"

interface NavBarType{
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>;
    isOpen:boolean;
}
const NavBar:React.FC<NavBarType> = ({ setIsOpen, isOpen }) => {
    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button
                            className="sm:hidden block"
                            onClick={()=>{setIsOpen(isOpen ? false:true)}}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                ></path>
                            </svg>
                        </button>
                        <figure>
                            <img 
                                src="./nabua_header_1.png" 
                                className="w-20"
                            />
                        </figure>
                        <Link to="/" className="flex flex-col ms-2 md:me-24 leading-5 font-semibold text-gray-700">
                            <span>
                                Province of Camarines Sur
                            </span>
                            <span>
                                Municipality of Nabua
                            </span>
                            <span>
                                Civil Registry Information System
                            </span>
                        </Link>
                    </div>
                    <div>
                        <span className="font-semibold text-darkCyan">
                            Thursday, October 20, 2025
                        </span>
                    </div>
                {/* Profile dropdown */}
                {/* <Dropdown
                    label={
                        <Avatar
                            alt="User settings"
                            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            rounded={true}
                    />
                    }
                    arrowIcon={false}
                    inline={true}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">
                            name
                        </span>
                        <span className="block text-sm font-medium truncate">
                            email
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                        <Link to="/profile">Profile</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to="/settings">Settings</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to="/dashboard">Dashboard</Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <Link to="/logout">Logout</Link>
                    </Dropdown.Item>
                </Dropdown> */}
                </div>
            </div>
        </nav>
    )
}

export default NavBar