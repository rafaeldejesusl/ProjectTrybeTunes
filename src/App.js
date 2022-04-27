import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/ProjectTrybeTunes/" component={ Login } />
            <Route exact path="/ProjectTrybeTunes/profile/edit" component={ ProfileEdit } />
            <Route exact path="/ProjectTrybeTunes/profile" component={ Profile } />
            <Route exact path="/ProjectTrybeTunes/favorites" component={ Favorites } />
            <Route exact path="/ProjectTrybeTunes/album/:id" render={ (props) => <Album { ...props } /> } />
            <Route exact path="/ProjectTrybeTunes/search" component={ Search } />
            <Route exact path="/ProjectTrybeTunes/*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
