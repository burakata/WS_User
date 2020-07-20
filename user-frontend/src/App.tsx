import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouteComponentProps, Link, Switch, Route } from 'react-router-dom';
import CreateUser from './components/user/CreateUser';
import Home from './components/Home';
import EditUser from './components/user/EditUser';

const App: React.FC = () => {
  return (
    <div>
        <nav>
          <ul>
            <li>
              <Link to={'/'}> Home </Link>
            </li>
            <li>
              <Link to={'/create'}> Create User </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path={'/create'} exact component={CreateUser} />
          <Route path={'/'} exact component={Home} />
          <Route path={'/edit/:id'} exact component={EditUser} />
        </Switch>
      </div>
  );
}

export default App;
