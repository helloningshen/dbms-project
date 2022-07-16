import SignIn from "./pages/Login"
import Dashboard from './pages/Dashboard'
import Archive from "./pages/Archive"
import Collections from './pages/Collections'
import Authors from "./pages/Authors"
import PdfPreview from "./pages/Pdf-Preview"
import Register from "./pages/Register"


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
        pathName: "/collections",
        component: Collections,
        exact: true,
    },
    {
        pathName: "/authors",
        component: Authors,
        exact: true,
    },
    {
        pathName: "/single/:id",
        component: PdfPreview,
        exact: true,
    }
]



export default routes