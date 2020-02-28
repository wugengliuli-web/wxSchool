import Taro, { useDidShow, useCallback, useState, useRouter, usePageScroll } from '@tarojs/taro'
import './index.scss'
import { AtToast } from "taro-ui"
import { View, Image, Text, Navigator } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import { getActivitesContent } from '../../actions/activites'
import { activitesColor } from '../../lib/type'
const Activites = props => {
    const dispatch = useDispatch()
    const { params: { id, activityId, merchantId } } = useRouter()
    const [data, setData] = useState({})
    const [isDown, setIsDown] = useState(false)
    useDidShow(async () => {
        if(Object.keys(data).length === 0) {
            Taro.showLoading({
                title: '加载中'
            })
            try {
                const action = getActivitesContent(id, activityId, merchantId)
                const res = await dispatch(action)
                if(res) {
                    setData(res)
                    console.log(res)
                } else {
                    Taro.showToast({
                        title: '出错了~~',
                        icon: 'none',
                        duration: 2000
                    })
                }
            } catch(err) {
                Taro.showToast({
                    title: '出错了~~',
                    icon: 'none',
                    duration: 2000
                })
            }
            Taro.hideLoading()
        }
    })
    //监听上下滑动事件
    usePageScroll(res => {
        let { scrollTop } = res
        if(scrollTop > 50 && data.Recommend.length > 2) {
            if(!isDown) {
                setIsDown(true)
            }
        } else {
            if(isDown) {
                setIsDown(false)
            }
        }
    })
    return (
        <View className="container">
            <View className="wrapper">
                <View className="imgWrapper">
                    <Image className="img"  mode="center" src={id ? data.poster : null}></Image>
                </View>
                <View className="down" style={{
                    transform: `translateY(${isDown ? '250rpx' : '868rpx'})`
                }}>
                    <View className="activitesContentWrapper">
                        <View className="activiterMain">
                            <View className="contentHead">
                                <View className="title">{id ? data.name : null}</View>
                                <View className="tagContainer">
                                    {/* {
                                        [].map(key => {
                                            return <View key={key} className={activitesColor.blue.includes(key) ? 'contentTag blue' : activitesColor.green.includes(key) ? 'contentTag green' : 'contentTag red'}>{key}</View>
                                        })
                                    } */}
                                    {
                                        id ?
                                            <View className={activitesColor.blue.includes(data.type) ? 'contentTag blue' : activitesColor.green.includes(data.type) ? 'contentTag green' : 'contentTag red'}>{data.type}</View>
                                            :
                                            null
                                    }
                                </View>
                            </View>
                            <View className="money">活动预算：￥{id ? data.budget : null}</View>
                            <View className="time">赞助时间：{id ? data.publishDate : null} 至 {id ? data.deadline : null}</View>
                            <View className="position">活动地点：{id ? data.address : null}</View>
                            <View className="fileWrapper">活动方案：<Text className="file">{id ? data.plan : null}</Text></View>
                            <View className="divier"></View>
                            <View className="data">
                                <View className="text">浏览次数：{data.browseTimes}</View>
                                <View className="text">申请人数：{data.applicantsNum}</View>
                            </View>
                        </View>
                    </View>
                    <Navigator url={`/pages/personalBasicifo/index?id=${id ? data.head.id : null}`}>
                        <View className="associationWrapper">
                            <View className="top">
                                <View className="logoWrapper">
                                    <Image className="logo" src={id ? data.head.avatar ? data.head.avatar : '' : null} mode="center"></Image>
                                </View>
                                <View className="introduce">
                                    <View className="name">{id ? data.head.name: null}</View>
                                    <View className="tagWrapper">
                                        <View className="tag red">{id ? data.associationName ? data.associationName : null: null}</View>
                                        <View className="tag blue">{id ? data.associationSize ? associationSize : null : null}</View>
                                    </View>
                                </View>
                            </View>
                            <View className="bottom">{id ? data.introduce ? data.introduce : null : null}</View>
                        </View>
                    </Navigator>
                    <View className="RecommendWrapper">
                        <View className="title">相关推荐</View>
                        <View className="recommendContent">
                            {
                                [].map(item => {
                                    return (
                                        <navigator key={item.id} url={`/pages/activites/index?id=${item.id}`}>
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
                                        </navigator>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

Activites.config = {
    navigationBarTitleText: '活动详情'
}

export default Activites