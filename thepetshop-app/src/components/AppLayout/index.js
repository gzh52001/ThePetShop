import React from 'react';
import {Route,Switch} from 'react-router-dom'

import Login from '@/views/Login'

function AppLayout (){
    return(
        <>
            <Switch>
                <Route path="/login" component={Login} />
            </Switch>
        </>
    )
}

export default AppLayout;