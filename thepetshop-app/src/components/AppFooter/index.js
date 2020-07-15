import React,{Component} from 'react';
import './style.scss'
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
                    components:<Home />
                }
            ]
        };
    }

    renderContent(components) {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                {/* {pageText} */}
                {components}
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
                    <TabBar.Item
                        title={ftrWrapData[0].title}
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
                        {this.renderContent(ftrWrapData[0].components)}
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