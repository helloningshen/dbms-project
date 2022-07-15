import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes'
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from './features/file-slice';
import Toast from "./Components/Taost"
import { ToastContainer } from 'react-toastify'
import SinglePage from "./pages/SinglePage"
const App = () => {

  const { show } = useSelector(store => store.toast)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFiles())
  }, [])

  return (
    // <SinglePage />
    <Router>
      {
        show && <ToastContainer />
      }
      <Routes>
        <Route exact={true} path="/single" element={<SinglePage />}></Route>
        {
          routes.map((route, idx) => {
            return (
              <Route key={idx} exact={route.exact} path={route.pathName} element={<route.component />}></Route>
            )
          })
        }
      </Routes>
    </Router >
  )
}
export default App;