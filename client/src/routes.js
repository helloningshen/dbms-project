import SignIn from "./pages/login-page"
import Dashboard from './pages/dashboard-page'
import Archive from "./pages/archive-page"
import PdfPreview from "./pages/pdf-viewer-page"
import Register from "./pages/register-page"
import About from "./pages/about-page"


const routes = [
    {
        pathName: "/signin",
        component: SignIn,
        exact: true
    },
    {
        pathName: "/register",
        component: Register,
        exact: true,
    },
    {
        pathName: "/",
        component: Dashboard,
        exact: true
    },
    {
        pathName: "/archive",
        component: Archive,
        exact: true
    },


    {
        pathName: "/single/:id",
        component: PdfPreview,
        exact: true,
    },
    {
        pathName: "/about",
        component: About,
        exact: true,
    }
]



export default routes