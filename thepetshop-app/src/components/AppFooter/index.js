import React,{Component} from 'react';
import './style.scss'
import {Route,withRouter} from 'react-router-dom'
import { TabBar } from 'antd-mobile';

@withRouter
class AppFooter extends Component {
    constructor(){
        super();
        this.state = {
            selectedTab: '/home',
            hidden: false,
            fullScreen: true,
            ftrWrapData:[
                {
                    title:'主页',
                    path:'/home',
                    icon:<i className="iconfont icon-qq-copy" style={{fontSize:'24px'}} />
                },
                {
                    title:'分类',
                    path:'/classify',
                    icon:<i className="iconfont icon-liwu" style={{fontSize:'24px'}} />
                },
                {
                    title:'购物车',
                    path:'/cart',
                    icon:<i className="iconfont icon-gouwuche" style={{fontSize:'24px'}} />
                },
                {
                    title:'我的',
                    path:'/mine',
                    icon:<i className="iconfont icon-geren11" style={{fontSize:'24px'}} />
                },
            ]
        };
    }

    componentDidMount(){
        // console.log(this.props);
    }

    renderContent(path) {

        const {history} = this.props
        history.push(path)
        // return (
        //     <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                
        //     </div>
        // );
    }

    render(){
        const {ftrWrapData} = this.state;
        const {location:{pathname}} = this.props
        console.log(pathname);
        return(
            <footer>
                <div className="footer-wrap">
                    <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#f55b50"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    >
                        {
                            ftrWrapData.map(item=>(
                                <TabBar.Item
                                    title={item.title}
                                    key='blueTab'
                                    icon={item.icon}
                                    selectedIcon={item.icon}
                                    selected={this.state.selectedTab === item.title}
                                    onPress={() => {
                                    this.setState({
                                        selectedTab: item.title,
                                    });
                                    }}
                                    // data-seed="logId"
                                    onClick={this.renderContent.bind(this,item.path)}
                                >
                                </TabBar.Item>
                            ))
                        }
                    {/* <TabBar.Item
                        icon={
                            <i className="iconfont icon-liwu" style={{fontSize:'24px'}} />
                        }
                        selectedIcon={
                            <i className="iconfont icon-liwu" style={{fontSize:'24px'}} />
                        }
                        title="分类"
                        key="Koubei"
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'redTab',
                        });
                        }}
                        data-seed="logId1"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <i className="iconfont icon-gouwuche" style={{fontSize:'24px'}} />
                        }
                        selectedIcon={
                            <i className="iconfont icon-gouwuche" style={{fontSize:'24px'}} />
                        }
                        title="购物车"
                        key="Friend"
                        badge={1}
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'greenTab',
                        });
                        }}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <i className="iconfont icon-geren11" style={{fontSize:'24px'}} />
                        }
                        selectedIcon={
                            <i className="iconfont icon-geren11" style={{fontSize:'24px'}} />
                        }
                        title="我的"
                        key="my"
                        dot	
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'yellowTab',
                        });
                        }}
                    >
                    </TabBar.Item>
                     */}
                    </TabBar>
                </div>
            </footer>
        );
    }
}	
export default AppFooter;