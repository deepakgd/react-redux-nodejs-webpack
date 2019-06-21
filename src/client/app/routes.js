import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Home from 'screens/home';
import About from 'screens/about';
import Todo from 'screens/todo';
import RenderProps from 'screens/renderprops/renderprops';

class Routes extends Component{
    render(){
        return (
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/about" exact component={About}></Route>
                <Route path="/todo" exact component={Todo}></Route>
                <Route path="/renderprops" exact component={RenderProps}></Route>
            </Switch>
        )
    }
}

export default withRouter(Routes);