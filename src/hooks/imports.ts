import NavBar from "../components/navigations/NavBar";
import SideNav from "../components/navigations/SideNav";
import RootLayout from "../pages/RootLayout";
import BirthCert from "../pages/services/birthCertificate/BirthCert";
import DeathCert from "../pages/services/DeathCert";
import Foundlings from "../pages/services/Foundlings";
import MarriageCert from "../pages/services/MarriageCert";
import Settings from "../pages/services/Settings";
import Login from "../pages/form/Login";
import FormLayout from "../pages/form/FormLayout";
import Loading from "../components/loader/Loading";
import LoaderDefault from "../components/loader/LoaderDefault";
import LoaderSm from "../components/loader/LoaderSm";
import NotFound from "../pages/NotFound";
import ErrorInput from "../components/ErrorInput";
import errorToast from "../components/toast/errorToast";
import successToast from "../components/toast/successToast";
import LogoutModal from "../components/modals/LogoutModal";
import logoutStore from "./zustand/logoutStore";
import Home from "../pages/Home";
import BirthCertLayout from "../pages/services/birthCertificate/BirthCertLayout";
import BirthCertInputs from "../pages/services/birthCertificate/BirthCertInputs";

const env = import.meta.env;
const serverURL = env.VITE_REACT_SERVER_URL;

export {
    RootLayout,
    SideNav,
    NavBar,
    BirthCert,
    DeathCert,
    MarriageCert,
    Foundlings,
    Settings,
    Login,
    FormLayout,
    Loading,
    serverURL,
    LoaderDefault,
    LoaderSm,
    NotFound,
    ErrorInput,
    errorToast,
    successToast,
    LogoutModal,
    logoutStore,
    Home,
    BirthCertLayout,
    BirthCertInputs
}