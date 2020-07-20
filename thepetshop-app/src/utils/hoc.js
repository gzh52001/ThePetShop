import React from 'react';
import {getToken} from '@/utils/auth';
import loginApi from '@/api/login';

export function withLogin(InnerComponent){//高阶组件 登录拦截
    return class OuterComponent extends InnerComponent{
        constructor(){
            super();
            this.state.login = false;
        }
        async componentDidMount(){
            try{
                let token = getToken();
                // console.log(token);
                let p = await loginApi.checkToken(token);
                // console.log(p.data);
                if(p.data.flag){
                    // console.log(p.data.flag);
                    this.setState({
                        login:true
                    })
                    super.componentDidMount();
                }
            }catch(err){
                console.log(err);
            }
        }
        render() {
            const {login} = this.state;
            // console.log(login);
            if(login){
                return (
                    <>
                        {
                            super.render(true)
                        }
                    </>
                )
            }
            return (
                <>
                    {
                        super.render(false)
                    }
                </>
            )
        }
    }
}