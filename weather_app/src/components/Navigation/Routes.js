import React, {Component} from 'react';
import {Router, Switch, Route} from 'react-router-dom';

import Forecast from './Forecast/Forecast';
import history from './History';

export default class Routes extends Component{
    render(){
        return(
            <Router history={history}>
                <Switch>
                    <Route exact path="/">
                    </Route> 
                    <Route path="/forecast" component={(props) => <Forecast {...props} />}/>
                </Switch>
            </Router>
        );
    }
}