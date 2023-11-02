import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Register from './Pages/Register';
import ErrorStates from './Pages/ErrorStates';
//import NotFound from './Pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/bymonth" element={<ByMonth />} /> */}
          <Route path="/ErrorStates" element={<ErrorStates />} />
        </Route>
      </Routes>
      {/* <Switch>
        <Route exact path="/" element  />
        <Route path="/dashboard" index component={Dashboard} />
        <Route component={NotFound} />
      </Switch> */}
    </Router>
  );
}

export default App;
