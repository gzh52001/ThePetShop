import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { TabBar, Badge } from 'antd-mobile';
import { connect } from 'react-redux';
import {getUser,getToken} from '@/utils/auth';
import CartApi from '@/api/shoppingcart';
import './style.scss';

@withRouter
@connect(({ cart: { goods } }) => {
    // console.log(goods);
    return {
        totalgoods: goods.length
    }
})
class AppFooter extends Component {
    constructor() {
        super();
        this.state = {
            selectedTab: '/main/home',
            hidden: false,
            fullScreen: true,
            ftrWrapData: [
                {
                    title: '主页',
                    path: '/main/home',
                    icon: <i className="iconfont icon-home1" style={{ fontSize: '24px' }} />,
                    iconActive: <i className="iconfont icon-home" style={{ fontSize: '24px' }} />
                },
                {
                    title: '分类',
                    path: '/main/classify',
                    icon: <i className="iconfont icon-leimupinleifenleileibie" style={{ fontSize: '24px' }} />,
                    iconActive: <i className="iconfont icon-leimupinleifenleileibie2" style={{ fontSize: '24px' }} />
                },
                {
                    title: '购物车',
                    path: '/main/cart',
                    icon: <i className="iconfont icon-gouwuche2" style={{ fontSize: '24px' }} />,
                    iconActive: <i className="iconfont icon-gouwuche2" style={{ fontSize: '24px' }} />
                },
                {
                    title: '我的',
                    path: '/main/mine',
                    icon: <i className="iconfont icon-buoumaotubiao03" style={{ fontSize: '24px' }} />,
                    iconActive: <i className="iconfont icon-wodedangxuan" style={{ fontSize: '24px' }} />
                },
            ]
        };
    }

    componentDidMount() {
        const { history: { location: { pathname }, listen } } = this.props;
        listen((location) => {
            this.setState({
                selectedTab: location.pathname
            })
        })
        if (getToken()) {
            let { uid } = getUser()
            CartApi.getcart(uid).then(res => {
                if (res.data.flag) {
                    const { ftrWrapData } = this.state;
                    let obj = Object.assign([], ftrWrapData);
                    obj[2] = {
                        title: '购物车',
                        path: '/main/cart',
                        icon: <Badge text={res.data.data.length} overflowCount={99}><i className="iconfont icon-gouwuche2" style={{ fontSize: '24px' }} /></Badge>,
                        iconActive: <Badge text={res.data.data.length} overflowCount={99}><i className="iconfont icon-gouwuche2" style={{ fontSize: '24px' }} /></Badge>
                    }
                    this.setState({
                        ftrWrapData: obj
                    })
                }
            })
        }
        this.setState({
            selectedTab: pathname
        })
    }
    shouldComponentUpdate({ totalgoods }) {
        // console.log('上一个', this.props.totalgoods);
        // console.log('下一个', totalgoods);
        if (this.props.totalgoods !== totalgoods) {
            const { ftrWrapData } = this.state;
            let obj = Object.assign([], ftrWrapData);
            obj[2] = {
                title: '购物车',
                path: '/main/cart',
                icon: <Badge text={totalgoods} overflowCount={99}><i className="iconfont icon-gouwuche2" style={{ fontSize: '24px' }} /></Badge>,
                iconActive: <Badge text={totalgoods} overflowCount={99}><i className="iconfont icon-gouwuche2" style={{ fontSize: '24px' }} /></Badge>
            }
            this.setState({
                ftrWrapData: obj
            })
        }
        return true;
    }
    render() {
        const { ftrWrapData } = this.state;
        const { history } = this.props;
        // console.log('ftrWrapData', ftrWrapData);
        return (
            <footer>
                <div className="footer-wrap">
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#f55b50"
                        barTintColor="white"
                        hidden={this.state.hidden}
                    >
                        {
                            ftrWrapData.map(item => (
                                <TabBar.Item
                                    title={item.title}
                                    key={item.path}
                                    icon={item.icon}
                                    selectedIcon={item.iconActive}
                                    selected={this.state.selectedTab === item.path}
                                    data-seed="logId"
                                    onPress={() => {
                                        this.setState({
                                            selectedTab: item.path,
                                        });
                                        history.push(item.path)
                                    }}
                                >
                                </TabBar.Item>
                            ))
                        }
                    </TabBar>
                </div>
            </footer>
        );
    }
}
export default AppFooter;