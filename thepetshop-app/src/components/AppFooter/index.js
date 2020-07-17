import React,{Component} from 'react';
import './style.scss'
import {Route,withRouter} from 'react-router-dom'
import { TabBar } from 'antd-mobile';

@withRouter
class AppFooter extends Component {
    constructor(){
        super();
        this.state = {
            selectedTab: '/main/home',
            hidden: false,
            fullScreen: true,
            ftrWrapData:[
                {
                    title:'主页',
                    path:'/main/home',
                    icon:<i className="iconfont icon-home1" style={{fontSize:'24px'}} />,
                    iconActive:<i className="iconfont icon-home"  style={{fontSize:'24px'}} />
                },
                {
                    title:'分类',
                    path:'/main/classify',
                    icon:<i className="iconfont icon-leimupinleifenleileibie" style={{fontSize:'24px'}} />,
                    iconActive:<i className="iconfont icon-leimupinleifenleileibie2"  style={{fontSize:'24px'}} />
                },
                {
                    title:'购物车',
                    path:'/main/cart',
                    icon:<i className="iconfont icon-gouwuche2" style={{fontSize:'24px'}} />,
                    iconActive:<i className="iconfont icon-gouwuche2"  style={{fontSize:'24px'}} />
                },
                {
                    title:'我的',
                    path:'/main/mine',
                    icon:<i className="iconfont icon-buoumaotubiao03" style={{fontSize:'24px'}} />,
                    iconActive:<i className="iconfont icon-wodedangxuan"  style={{fontSize:'24px'}} />
                },
            ]
        };
    }

    componentDidMount(){
        const {location:{pathname}} = this.props
        this.setState({
            selectedTab:pathname
        })
    }

    renderContent = ()=>{
        console.log(11);
        const {history} = this.props
        // history.push(path)
        // return (
        //     <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                
        //     </div>
        // );
    }

    render(){
        const {ftrWrapData} = this.state;
        const {location:{pathname},history} = this.props
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
                                    key={item.path}
                                    icon={item.icon}
                                    selectedIcon={item.iconActive}
                                    selected={this.state.selectedTab === item.path}
                                    data-seed="logId"
                                    onPress={()=>{
                                        this.setState({
                                            selectedTab: item.path,
                                        });
                                        history.push(item.path)
                                    }}
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