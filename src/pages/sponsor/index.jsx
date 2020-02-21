import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import TabBar from '../../component/tabBar'
import './index.scss'
const Sponsor = props => {
    return (
        <View>
            <TabBar initIndex={1} />
        </View>
    )
} 

export default Sponsor