import Taro, { useState, useCallback } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import homepage_sel from '../../static/img/homepage_sel.png'
import homepage_unsel from '../../static/img/homepage_unsel.png'
import Yizan_sel from '../../static/img/Yizan_sel.png'
import Yizan_unsel from '../../static/img/Yizan_unsel.png'
import mine_sel from '../../static/img/mine_sel.png'
import mine_unsel from '../../static/img/mine_unsel.png'
const TabBar = ({initIndex}) => {
    let [current, setCurrent] = useState(initIndex)
    let link = useCallback(index => {
        if(index === 0) {
            if(current !== 0) {
                Taro.reLaunch({
                    url: '/pages/index/index'
                })
            }
        } else if(index === 1) {
            if(current !== 1) {
                Taro.reLaunch({
                    url: '/pages/Sponsor/index'
                })
            }
        } else {
            if(current !== 2) {
                Taro.reLaunch({
                    url: '/pages/personalCenter/index'
                })
            }
        }
        setCurrent(index)
    }, [current])
    return <AtTabBar
                fixed
                backgroundColor={'#fff'}
                color="rgba(0,0,0,0.3)"
                fontSize={'20px'}
                iconSize={'48px'}
                selectedColor="rgba(0,0,0,0.45)"
                tabList={[
                    {
                        title: '首页',
                        selectedImage: homepage_sel,
                        image: homepage_unsel
                    }, {
                        title: '易赞助',
                        selectedImage: Yizan_sel,
                        image: Yizan_unsel
                    }, {
                        pagePath: '/pages/index/index',
                        title: '个人',
                        selectedImage: mine_sel,
                        image: mine_unsel
                    }
                ]}
                onClick={link}
                current={current}
            />
}

export default TabBar