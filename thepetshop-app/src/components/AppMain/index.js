import React, { Component,lazy,Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
// views

import AppFooter from '@/components/AppFooter';
import './style.scss';


// import Home from '@/views/Home';
// import Classify from '@/views/Classify';
// import Mine from '@/views/Mine';
// import Cart from '@/views/Cart';

const Home = lazy(()=> import('../../views/Home')) 
const Classify = lazy(()=> import('../../views/Classify')) 
const Mine = lazy(()=> import('../../views/Mine')) 
const Cart = lazy(()=> import('../../views/Cart')) 

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
                        <Suspense fallback=''>
                            <Switch>
                                <Route path={match.path + '/home'} component={Home} />
                                <Route path={match.path + '/classify'} component={Classify} />
                                <Route path={match.path + '/mine'} component={Mine} />
                                <Route path={match.path + '/cart'} component={Cart} />
                                <Redirect from={match.path} to={match.path + '/home'} exact />
                            </Switch>
                        </Suspense>
                    </section>
                </main>
                <AppFooter />
            </>
        )
    }
}
export default AppMain;