import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
// views
import Home from '@/views/Home';
import Classify from '@/views/Classify';
import Mine from '@/views/Mine';
import Cart from '@/views/Cart';
import AppFooter from '@/components/AppFooter';
import './style.scss';

class AppMain extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        const { match } = this.props;
        return (
            <>
                <main>
                    <section className="show-wrap">
                        <Switch>
                            <Route path={match.path + '/home'} component={Home} />
                            <Route path={match.path + '/classify'} component={Classify} />
                            <Route path={match.path + '/mine'} component={Mine} />
                            <Route path={match.path + '/cart'} component={Cart} />
                            <Redirect from={match.path} to={match.path + '/home'} exact />
                        </Switch>
                    </section>
                </main>
                <AppFooter />
            </>
        )
    }
}
export default AppMain;