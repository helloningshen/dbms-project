import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDocs } from './features/file-slice';
import routes from './routes'



const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchDocs())
  }, [])

  return (
    <Router>
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