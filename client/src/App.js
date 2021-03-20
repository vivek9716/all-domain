import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Comments from './Comments';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <h1>Vivek Chaudhary</h1>
      <Router>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/comments" exact>
          <Comments />
        </Route>
      </Router>
    </div>
  );
}

export default App;
