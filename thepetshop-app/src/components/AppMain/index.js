import React,{Component} from 'react';
// views
import Home from '../../views/Home';
import './style.scss'
import {Route,Switch,Redirect} from 'react-router-dom'


class AppMain extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        return(
            <main>
                <section className="show-wrap">
                    <Switch>
                        <Route path="/home" component={Home} />

                    </Switch>
                    <Redirect from="/" to="/home" />
                </section>
            </main>
        )
    }
}	
export default AppMain;