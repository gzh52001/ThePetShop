import React,{Component} from 'react';
import './style.scss'
import { TabBar } from 'antd-mobile';
import Home from '@/views/Home'

class AppFooter extends Component {
    constructor(){
        super();

        this.state = {
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: true,
            ftrWrapData:[
                {
                    title:'主页',
                    path:'/home',
                    components:<Home />
                }
            ]
        };
    }

    renderContent(pageText) {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                {pageText}
                {/* {components} */}
            {/* <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
            <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
                onClick={(e) => {
                e.preventDefault();
                this.setState({
                    hidden: !this.state.hidden,
                });
                }}
            >
                Click to show/hide tab-bar
            </a>
            <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
                onClick={(e) => {
                e.preventDefault();
                this.setState({
                    fullScreen: !this.state.fullScreen,
                });
                }}
            >
                Click to switch fullscreen
            </a> */}
            </div>
        );
    }

    render(){
        const {ftrWrapData} = this.state;

        return(
            <footer>
                <div className="footer-wrap" style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0, paddingTop: '44px' } : { height: 50 }}>
                    <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    >
                    <TabBar.Item
                        title={ftrWrapData.title}
                        key="Life"
                        icon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
                        />
                        }
                        selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
                        />
                        }
                        selected={this.state.selectedTab === 'blueTab'}
                        badge={1}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'blueTab',
                        });
                        }}
                        data-seed="logId"
                    >
                        {this.renderContent(ftrWrapData.title)}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
                        />
                        }
                        selectedIcon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
                        />
                        }
                        title="分类"
                        key="Koubei"
                        badge={'new'}
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
                    <TabBar.Item
                        icon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
                        />
                        }
                        selectedIcon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
                        />
                        }
                        title="购物车"
                        key="Friend"
                        dot
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'greenTab',
                        });
                        }}
                    >
                        {/* {this.renderContent('Friend')} */}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                        selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                        title="我的"
                        key="my"
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