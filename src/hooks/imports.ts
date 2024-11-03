import NavBar from "../components/navigations/NavBar";
import SideNav from "../components/navigations/SideNav";
import RootLayout from "../pages/RootLayout";
import BirthCert from "../pages/services/birthCertificate/BirthCert";
import DeathCert from "../pages/services/deathCert/DeathCert";
import Foundlings from "../pages/services/foundlingsCert/Foundlings";
import MarriageCert from "../pages/services/marriageCertificate/MarriageCert";
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
import ViewBirthCert from "../pages/services/birthCertificate/ViewBirthCert";
import DeathCertInput from "../pages/services/deathCert/DeathCertInput";
import DeathCertLayout from "../pages/services/deathCert/DeathCertLayout";
import ViewDeathCertificate from "../pages/services/deathCert/ViewDeathCertificate";
import MarriageCertInput from "../pages/services/marriageCertificate/MarriageCertInput";
import MarriageCertLayout from "../pages/services/marriageCertificate/MarriageCertLayout";
import ViewMarriageCert from "../pages/services/marriageCertificate/ViewMarriageCert";
import FoundlingsLayout from "../pages/services/foundlingsCert/FoundlingsLayout";
import FoundlingsInput from "../pages/services/foundlingsCert/FoundlingsInput";
import ViewFoundLings from "../pages/services/foundlingsCert/ViewFoundLings";
import ViewlBirthCertFile from "../pages/services/birthCertificate/ViewlBirthCertFile";
import ViewDeathCertFile from "../pages/services/deathCert/ViewDeathCertFile";
import ViewFoundlingsFile from "../pages/services/foundlingsCert/ViewFoundlingsFile";
import ViewMarriageCertFile from "../pages/services/marriageCertificate/ViewMarriageCertFile";
const env = import.meta.env;
const serverURL = env.VITE_REACT_SERVER_URL || 'http://localhost:8000';

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
    BirthCertInputs,
    ViewBirthCert,
    DeathCertInput,
    DeathCertLayout,
    ViewDeathCertificate,
    MarriageCertInput,
    MarriageCertLayout,
    ViewMarriageCert,
    FoundlingsLayout,
    FoundlingsInput,
    ViewFoundLings,
    ViewlBirthCertFile,
    ViewDeathCertFile,
    ViewFoundlingsFile,
    ViewMarriageCertFile
}