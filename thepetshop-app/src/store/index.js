import {createStore,applyMiddleware,compose} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';//引入浏览器中间插件

import reducer from './reducers';

import rootSaga from './middleware/cart';//引入自定义saga配置文件
import createSagaMiddleware from 'redux-saga';//引入中间插件saga


const sagaMiddleware = createSagaMiddleware();//创建中间插件

let enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));

//参数：
//第一个是 reducer
//第二个是 可以是state 得初始值（可选）
// 第三个是 中间插件  （可选）
const store = createStore(reducer,enhancer);

//运行saga配置文件
sagaMiddleware.run(rootSaga);

export default store;