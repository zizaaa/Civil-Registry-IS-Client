import { NavLink } from 'react-router-dom';
import { FaBaby, GiTombstone, FaRing, FaChild, FiSettings, FiLogOut, AiOutlineDashboard } from '../../hooks/icons';
import { logoutStore } from '../../hooks/imports';

const SideNav = () => {
    const { logOutModalSetter } = logoutStore();

    return (
        <ul className="space-y-2 font-medium ">
            <li>
                <NavLink
                    to="/"
                    className={
                        ({ isActive }) => isActive ?
                            "flex items-center gap-2 text-darkCyan p-2 rounded-sm bg-lightCyan uppercase"
                        :
                            "flex items-center gap-2 text-gray-800 p-2 rounded-sm hover:bg-gradient-to-r hover:from-[#0E7490] hover:to-[#145C7F] hover:text-white uppercase"
                    }
                >
                    <AiOutlineDashboard />
                    Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/birth-certificate"
                    className={
                        ({ isActive }) => isActive ?
                            "flex items-center gap-2 text-darkCyan p-2 rounded-sm bg-lightCyan uppercase"
                        :
                            "flex items-center gap-2 text-gray-800 p-2 rounded-sm hover:bg-gradient-to-r hover:from-[#0E7490] hover:to-[#145C7F] hover:text-white uppercase"
                    }
                >
                    <FaBaby />
                    Birth Certificate
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/death-certificate"
                    className={
                        ({ isActive }) => isActive ?
                            "flex items-center gap-2 text-darkCyan p-2 rounded-sm bg-lightCyan uppercase"
                        :
                            "flex items-center gap-2 text-gray-800 p-2 rounded-sm hover:bg-gradient-to-r hover:from-[#0E7490] hover:to-[#145C7F] hover:text-white uppercase"
                    }
                >
                    <GiTombstone />
                    Death Certificate
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/marriage-certificate"
                    className={
                        ({ isActive }) => isActive ?
                            "flex items-center gap-2 text-darkCyan p-2 rounded-sm bg-lightCyan uppercase"
                        :
                            "flex items-center gap-2 text-gray-800 p-2 rounded-sm hover:bg-gradient-to-r hover:from-[#0E7490] hover:to-[#145C7F] hover:text-white uppercase"
                    }
                >
                    <FaRing />
                    Marriage Certificate
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/foundlings"
                    className={
                        ({ isActive }) => isActive ?
                            "flex items-center gap-2 text-darkCyan p-2 rounded-sm bg-lightCyan uppercase"
                        :
                            "flex items-center gap-2 text-gray-800 p-2 rounded-sm hover:bg-gradient-to-r hover:from-[#0E7490] hover:to-[#145C7F] hover:text-white uppercase"
                    }
                >
                    <FaChild />
                    Foundlings
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/settings"
                    className={
                        ({ isActive }) => isActive ?
                            "flex items-center gap-2 text-darkCyan p-2 rounded-sm bg-lightCyan uppercase"
                        :
                            "flex items-center gap-2 text-gray-800 p-2 rounded-sm hover:bg-gradient-to-r hover:from-[#0E7490] hover:to-[#145C7F] hover:text-white uppercase"
                    }
                >
                    <FiSettings />
                    Settings
                </NavLink>
            </li>
            <li>
                <button
                    className="flex items-center gap-2 text-gray-800 p-2 rounded-sm hover:bg-gradient-to-r hover:from-[#0E7490] hover:to-[#145C7F] hover:text-white w-full uppercase"
                    onClick={()=>{logOutModalSetter(true)}}
                >
                    <FiLogOut />
                    Log out
                </button>
            </li>
        </ul>
    );
}

export default SideNav;