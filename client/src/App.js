import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes'
import { useDispatch } from 'react-redux';
import { getFiles } from './features/file-slice';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFiles())
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
    </Router>
  )
}
export default App;