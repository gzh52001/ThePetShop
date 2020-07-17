import React,{useState,useEffect,useCallback} from 'react';
import { NavBar, Icon,SearchBar, SegmentedControl,NoticeBar, WhiteSpace ,Toast } from 'antd-mobile';
import './style.scss'

import SearchApi from '@/api/goods/search'

function Search(props){
    let autoFocusInst,manualFocusInst;
    const [value, changeValue] = useState('');
    const [gShow , changeShow] = useState(false)
    const [searchData , setSearchData] = useState([])
    const [sortNum , changeSortNum] = useState(null)
    const [sortNumShow , changeSortNumShow] = useState(false)
    const [iconShow , changeIconShow] = useState(null)

    useEffect(()=>{
        autoFocusInst.focus();
    },[gShow])

    const getSearch = useCallback(async (value)=>{
        changeValue(value)
        changeShow(true)
        try {
            let p = await SearchApi.searchGoods(value);
            if(p.data.flag){
                setSearchData(p.data.data)
            }else{
                Toast.offline('没有搜到此商品,请重新搜索 !!!', 3);
            }
        } catch (error) {
            console.log(error);
        }
    },[])

    // 排序
    const isSales = useCallback(async (value,e)=>{
        let sort = e.nativeEvent.selectedSegmentIndex;
        changeSortNum(sort)
        if(sort==2){
            sort=3
        }
        if(sort==1){
            if(!sortNumShow){
                sort = sort + sortNumShow
                changeSortNumShow(!sortNumShow)
            }
        }
        try {
            let p = await SearchApi.searchGoods(value,sort);
            if(p.data.flag){
                setSearchData(p.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    },[])

    const onChange = useCallback((selected)=>{
        console.log(`tag selected: ${selected}`);
    })
    
    return (
        <div className='search'>
            {/* 顶部搜索 */}
            <div className='search-input'>
                <NavBar
                
                    mode="light"
                    icon={<Icon type="left" style={{fontSize:'24px',color:'#c1c1c1'}} />}
                    onLeftClick={() => props.history.push("/main/home")}
                    rightContent={[
                        <i key="icon" className={iconShow?iconShow:"iconfont icon-gouwuche"} style={{fontSize:'22px',color:'#c1c1c1'}} onClick={()=>{props.history.push("/main/classify")}} />,
                    ]}
                >
                    <SearchBar
                        placeholder="点击开始搜索商品"  
                        ref={ref => autoFocusInst = ref} 
                        onSubmit={getSearch}
                    />
                </NavBar>
            </div>
            {/* 搜索后内容 */}
            {
                gShow?<>
                    <div className='sort-goods'>
                        <SegmentedControl
                            selectedIndex={sortNum} 
                            values={['销量', <><span>价格</span><i className="iconfont icon-paixu" style={{fontSize:'12px',color:'rgb(153,153)',margin:'3px 0 0 3px'}} /></>, '热门']}
                            onChange={isSales.bind(null,value)}
                        />
                    </div>
                    {/* 搜索的商品 */}
                    <div className='search-show'>
                        {
                            searchData.map(item=>(
                                <div className='goods-item' key={item.gid}>
                                    <div className='img-item'>
                                        <img src={item.gimgs} />
                                    </div>
                                    <div className='goods-font'>
                                        <h3 className="goods-title">{item.gtitle}</h3>
                                        <div className='goods-price'>
                                            <span className="now"><i>￥</i>{item.gprice}</span>
                                            <del className="old"><i>￥</i>{(item.gprice * 1.2).toFixed(2)}</del>
                                        </div>
                                        <h4 className="goods-sales">
                                            已售
                                            <span className="salesNum">{item.gxiaoliang}</span>
                                        </h4>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </>
                :
                <div className='notSearch' style={{paddingTop:'10px'}}>
                    <div>
                        <WhiteSpace size="lg" />
                        <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                        别问，问就是濑
                        </NoticeBar>
                        <WhiteSpace size="lg" />
                        <NoticeBar mode="link" onClick={() => alert('1')}>
                        别问，问就是濑
                        </NoticeBar>
                        <WhiteSpace size="lg" />
                        <NoticeBar mode="closable" icon={null}>别问，问就是濑</NoticeBar>
                        <WhiteSpace size="lg" />
                        <NoticeBar mode="closable" icon={<Icon type="check-circle-o" size="xxs" />}>
                        别问，问就是濑
                        </NoticeBar>
                        <WhiteSpace size="lg" />
                        <NoticeBar mode="closable" action={<span style={{ color: '#a1a1a1' }}>不再提示</span>}>
                        别问，问就是濑
                        </NoticeBar>
                        <WhiteSpace size="lg" />
                        <NoticeBar mode="link" action={<span>去看看</span>}>
                        别问，问就是濑
                        </NoticeBar>
                    </div>
                </div>
            }
        </div>
    )
}

export default Search;