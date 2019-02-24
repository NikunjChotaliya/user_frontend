import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';

import {
  UserList,
  UserAddUpdateDelete
} from './Components';

class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={UserList} />
        <Route exact path='/add' component={UserAddUpdateDelete} />
        <Route path='/edit/:id' component={UserAddUpdateDelete} />
      </Switch>
    )
  }
}

export default withRouter(Routes);
