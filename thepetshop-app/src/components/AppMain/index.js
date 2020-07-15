import React,{Component} from 'react';

// views
import Home from '../../views/Home';

class AppMain extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        return(
            <div className="main">
                <Home />
            </div>
        )
    }
}	
export default AppMain;