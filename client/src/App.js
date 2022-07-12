import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes'

const App = () => {
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