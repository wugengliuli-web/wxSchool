import Taro, { useState } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'

const TabBar = props => {
    let [current, setCurrent] = useState(0)
    return <AtTabBar
                fixed
                backgroundColor={'#fff'}
                color={'#000'}
                fontSize={'20px'}
                iconSize={'48px'}
                tabList={[
                    {
                        pagePath: '/pages/index/index',
                        title: '首页',
                        iconType: 'home'
                        
                    }, {
                        pagePath: '/pages/index/index',
                        title: '易赞助',
                        iconType: 'heart'
                        
                    }, {
                        pagePath: '/pages/index/index',
                        title: '个人',
                        iconType: 'message'
                        
                    }
                ]}
                onClick={setCurrent}
                current={current}
            />
}

export default TabBar