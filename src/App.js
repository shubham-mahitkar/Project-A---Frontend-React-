// import './App.css';
import Create from './components/create';
import Read from './components/read';
import Update from './components/update';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path='/create' Component={Create} />
          <Route exact path='/read' Component={Read} />
          <Route path='/update' Component={Update} />
        </Routes>
    </Router>
  );
}

export default App;
