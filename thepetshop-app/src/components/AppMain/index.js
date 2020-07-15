import React,{Component} from 'react';

// views
import Home from '../../views/Home';
import './style.scss'

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
                    <Home />
                </section>
            </main>
        )
    }
}	
export default AppMain;