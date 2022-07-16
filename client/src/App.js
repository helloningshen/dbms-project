import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocs } from './features/file-slice';
import { ToastContainer } from 'react-toastify'
const App = () => {

  const { show } = useSelector(store => store.toast)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchDocs())
  }, [])

  return (
    // <SinglePage />
    <Router>
      {
        show && <ToastContainer />
      }
      <Routes>
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