import SignIn from "./pages/login"
import Dashboard from './pages/dashboard'
import Archive from "./pages/archive"
import PdfPreview from "./pages/pdf-viewer"
import Register from "./pages/register"


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
    }
]



export default routes