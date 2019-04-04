import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Home from 'screens/home';
import About from 'screens/about';

class Routes extends Component{
    render(){
        return (
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/about" exact component={About}></Route>
            </Switch>
        )
    }
}

export default withRouter(Routes);