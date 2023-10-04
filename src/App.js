// import './App.css';
import Create from './components/create';
import Read from './components/read';
import Update from './components/update';
import PageNotFound from './components/pagenotfound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/errorboundary';
import CustomizedTimeline from './components/timeline';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
            <Route exact path='/create' Component={Create} />
            <Route exact path='/read' Component={Read} />
            <Route path='/update/:id' Component={Update} />
            <Route path='/timeline/:id/award' Component={CustomizedTimeline} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
