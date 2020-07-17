import React,{Component} from 'react';
import './style.scss'
import {Route} from 'react-router-dom'
import { TabBar } from 'antd-mobile';
import Home from '@/views/Home'

class AppFooter extends Component {
    constructor(){
        super();

        this.state = {
            selectedTab: 'blueTab',
            hidden: false,
            fullScreen: true,
            ftrWrapData:[
                {
                    title:'主页',
                    path:'/home',
                    components:Home
                }
            ]
        };
    }

    renderContent(components) {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                {/* {pageText} */}
                <Route path='/login' component={components} />
            </div>
        );
    }

    render(){
        const {ftrWrapData} = this.state;
        return(
            <footer>
                <div className="footer-wrap">
                    <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#f55b50"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    >
                        {/* 主页 */}
                    <TabBar.Item
                        title={ftrWrapData[0].title}
                        key="Life"
                        icon={
                            <i className="iconfont icon-qq-copy" style={{fontSize:'24px'}} />
                        }
                        selectedIcon={
                            <i className="iconfont icon-qq-copy" style={{fontSize:'24px'}} />
                        }
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'blueTab',
                        });
                        }}
                        data-seed="logId"
                    >
                        {this.renderContent(ftrWrapData[0].components)}
                    </TabBar.Item>
                    {/* 分类 */}
                    <TabBar.Item
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
                        {/* {this.renderContent('Koubei')} */}
                    </TabBar.Item>
                    {/* 购物车 */}
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
                        {/* {this.renderContent('Friend')} */}
                    </TabBar.Item>
                    {/* 我的 */}
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
                        {/* {this.renderContent('My')} */}
                    </TabBar.Item>
                    </TabBar>
                </div>
            </footer>
        );
    }
}	
export default AppFooter;