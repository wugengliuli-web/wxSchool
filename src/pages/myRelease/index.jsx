import Taro, { useDidShow, useCallback, useState } from '@tarojs/taro'
import './index.scss'
import { AtToast } from "taro-ui"
import { View, Image, Text } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import { activitesColor } from '../../lib/type'
import {
    getHasRelease,
    getNotRelease
} from '../../actions/myRelease'
const MyRelease = props => {
    const dispatch = useDispatch()
    const hasRelease = useSelector(state => state.myRelease.hasRelease)
    const notRelease = useSelector(state => state.myRelease.notRelease)
    const userId = useSelector(state => state.personalCenter.userId)
    const userType = useSelector(state => state.personalCenter.userType)
    const [hasAjax, setHasAjax] = useState(false)
    useDidShow(async () => {
        if(!hasAjax) {
            setHasAjax(true)
            Taro.showLoading({
                title: '查询中'
            })
            try {
                let action = getHasRelease(userId, userType)
                let res = await dispatch(action)
                if(res === '未认证') {
                    Taro.showToast({
                        title: '未认证',
                        icon: 'none',
                        duration: 2000
                    })
                }
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
    return (
        <View className="container">
            <View className="hasReleaseWrapper">
                <View className="title">已发布</View>
                <View className="containerWrapper">
                    {
                        hasRelease.map((item, index) => {
                            return (
                                <View className="wrapper" key={item.id}>
                                    <Navigator url={`/pages/activites/index?id=${item.id}`}>
                                        <View className="content" key={item.id}>
                                            <View className="contentHead">
                                                <View className="title">{userType === '学生认证' ? item.name : item.theme}</View>
                                                <View className="tagContainer">
                                                    {/* {
                                                        item.tag.map(key => {
                                                            return <View key={key} className={activitesColor.blue.includes(key) ? 'contentTag blue' : activitesColor.green.includes(key) ? 'contentTag green' : 'contentTag red'}>{key}</View>
                                                        })
                                                    } */}
                                                    <View  className={activitesColor.blue.includes(item.type) ? 'contentTag blue' : activitesColor.green.includes(item.type) ? 'contentTag green' : 'contentTag red'}>{item.type}</View>
                                                </View>
                                            </View>
                                            <View className="address">地址: {item.address}</View>
                                            <View className="contentBottom">
                                                <View className="timer">发布时间: {item.publishDate}~{userType === '学生认证' ? item.deadline : item.availableDate}</View>
                                                <View className="money">￥{userType === '学生认证' ? item.budget : item.fee}</View>
                                            </View>
                                        </View>
                                    </Navigator>
                                    <View className="divider"></View>
                                    <View className="textWrapper">
                                        {item.people}人申请
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            <View className="hasReleaseWrapper hasDone">
                <View className="title">已完成</View>
                <View className="containerWrapper">
                    {
                        notRelease.map((item, index) => {
                            return (
                                <View className="wrapper" key={item.id}>
                                    <Navigator url={`/pages/activites/index?id=${item.id}`}>
                                        <View className="content" key={item.id}>
                                            <View className="contentHead">
                                                <View className="title">{userType === '学生认证' ? item.name : item.theme}</View>
                                                <View className="tagContainer">
                                                    {/* {
                                                        item.tag.map(key => {
                                                            return <View key={key} className={activitesColor.blue.includes(key) ? 'contentTag blue' : activitesColor.green.includes(key) ? 'contentTag green' : 'contentTag red'}>{key}</View>
                                                        })
                                                    } */}
                                                    <View  className={activitesColor.blue.includes(item.type) ? 'contentTag blue' : activitesColor.green.includes(item.type) ? 'contentTag green' : 'contentTag red'}>{item.type}</View>
                                                </View>
                                            </View>
                                            <View className="address">地址: {item.address}</View>
                                            <View className="contentBottom">
                                                <View className="timer">发布时间: {item.startTime}~{userType === '学生认证' ? item.deadline : item.availableDate}</View>
                                                <View className="money">￥{userType === '学生认证' ? item.budget : item.fee}</View>
                                            </View>
                                        </View>
                                    </Navigator>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}

MyRelease.config = {
    navigationBarTitleText: '我的发布'
}

export default MyRelease