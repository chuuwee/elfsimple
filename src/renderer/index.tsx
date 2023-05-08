import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from "_renderer/App";
import 'normalize.css/normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';

const AppWithRouter: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

ReactDOM.render(<AppWithRouter />, document.getElementById('app'));