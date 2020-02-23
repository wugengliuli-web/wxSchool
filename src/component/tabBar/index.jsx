import Taro, { useState, useCallback } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
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
                color={'#000'}
                fontSize={'20px'}
                iconSize={'48px'}
                tabList={[
                    {
                        title: '首页',
                        iconType: 'home'
                        
                    }, {
                        title: '易赞助',
                        iconType: 'heart'
                        
                    }, {
                        pagePath: '/pages/index/index',
                        title: '个人',
                        iconType: 'message'
                        
                    }
                ]}
                onClick={link}
                current={current}
            />
}

export default TabBar