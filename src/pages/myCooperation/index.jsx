import Taro, { useState, useCallback, useDidShow } from '@tarojs/taro'
import { View, Navigator, Text } from '@tarojs/components'
import { useDispatch, useSelector } from '@tarojs/redux'
import { activitesColor } from '../../lib/type'
import './index.scss'
import {
    setGoing,
    setEnd
} from '../../actions/myCooperation'

const MyCooperation = props => {
    const id = 456
    const dispatch = useDispatch()
    const friendLink = ''
    const [current, setCurrent] = useState(1)
    const [select, setSelect] = useState([
        { text: '申请', index: 0 },
        { text: '进行中', index: 1 },
        { text: '已结束', index: 2 }
    ])
    const going = useSelector(state => state.myCooperation.going)
    const end = useSelector(state => state.myCooperation.end)
    useDidShow(async () => {
        if(going.length === 0) {
            Taro.showLoading({
                title: '查询中'
            })
            try {
                const action = setGoing(id)
                await dispatch(action)
            } catch(err) {
                Taro.showToast({
                    title: '查询失败',
                    icon: 'none',
                    duration: 2000
                })
            }
            Taro.hideLoading()
        }
    })
    const changeSelect = useCallback(async index => {
        setCurrent(index)
        if(index === 2 && end.length === 0) {
            Taro.showLoading({
                title: '查询中'
            })
            try {
                const action = setEnd(id)
                await dispatch(action)
            } catch(err) {
                Taro.showToast({
                    title: '查询失败',
                    icon: 'none',
                    duration: 2000
                })
            }
            Taro.hideLoading()
        }
    }, [end])
    return (
        <View className="container">
            <View className="head">
                {
                    select.map(item => {
                        return <View onClick={() => changeSelect(item.index)} key={item.index} className={item.index === current ? "item select" : "item"}>
                            {item.text}
                            {
                                item.index === current ?
                                <View className="line"></View>
                                :
                                null
                            }
                        </View>
                    })
                }
            </View>
            {
                current === 0 ?
                    null
                    :
                    current === 1 ?
                        <View className="containerWrapper">
                            {
                                going.map((item, index) => {
                                    return (
                                        <View className="wrapper" key={item.id}>
                                            <Navigator url={`/pages/activites/index?id=${item.id}`}>
                                                <View className="content" key={item.id}>
                                                    <View className="contentHead">
                                                        <View className="title">{item.title}</View>
                                                        <View className="tagContainer">
                                                            {
                                                                item.tag.map(key => {
                                                                    return <View key={key} className={activitesColor.blue.includes(key) ? 'contentTag blue' : activitesColor.green.includes(key) ? 'contentTag green' : 'contentTag red'}>{key}</View>
                                                                })
                                                            }
                                                        </View>
                                                    </View>
                                                    <View className="address">地址: {item.city.split(' ').filter(item => item !== '-').join('-')}</View>
                                                    <View className="contentBottom">
                                                        <View className="timer">发布时间: {item.startTime}~{item.endTime}</View>
                                                        <View className="money">￥{item.money}</View>
                                                    </View>
                                                </View>
                                            </Navigator>
                                            <View className="divider"></View>
                                            <View className="textWrapper">
                                                <Text>与</Text>
                                                <Navigator url={`${friendLink}?id=${item.friend.id}`}>
                                                    <Text className="link">{item.friend.name}</Text>
                                                </Navigator>
                                                <Text>合作中</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        :
                        <View className="containerWrapper">
                            {
                                end.map((item, index) => {
                                    return (
                                        <View className="wrapper" key={item.id}>
                                            <Navigator url={`/pages/activites/index?id=${item.id}`}>
                                                <View className="content" key={item.id}>
                                                    <View className="contentHead">
                                                        <View className="title">{item.title}</View>
                                                        <View className="tagContainer">
                                                            {
                                                                item.tag.map(key => {
                                                                    return <View key={key} className={activitesColor.blue.includes(key) ? 'contentTag blue' : activitesColor.green.includes(key) ? 'contentTag green' : 'contentTag red'}>{key}</View>
                                                                })
                                                            }
                                                        </View>
                                                    </View>
                                                    <View className="address">地址: {item.city.split(' ').filter(item => item !== '-').join('-')}</View>
                                                    <View className="contentBottom">
                                                        <View className="timer">发布时间: {item.startTime}~{item.endTime}</View>
                                                        <View className="money">￥{item.money}</View>
                                                    </View>
                                                </View>
                                            </Navigator>
                                            <View className="divider"></View>
                                            <View className="textWrapper">
                                                <Text>与</Text>
                                                <Navigator url={`${friendLink}?id=${item.friend.id}`}>
                                                    <Text className="link">{item.friend.name}</Text>
                                                </Navigator>
                                                <Text>合作中</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
            }
        </View>
    )
}

MyCooperation.config = {
    navigationBarTitleText: '我的合作'
}

export default MyCooperation