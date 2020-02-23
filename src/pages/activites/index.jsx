import Taro, { useDidShow, useCallback, useState, useRouter, usePageScroll } from '@tarojs/taro'
import './index.scss'
import { AtToast } from "taro-ui"
import { View, Image, Text } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import { getActivitesContent } from '../../actions/activites'
const Activites = props => {
    const dispatch = useDispatch()
    const { params: { id } } = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const oldId = useSelector(state => state.activites.id)
    const data = useSelector(state => state.activites)
    const [isDown, setIsDown] = useState(false)
    useDidShow(async () => {
        if(oldId !== id) {
            setIsLoading(true)
            const action = getActivitesContent(id)
            await dispatch(action)
            setIsLoading(false)
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
            {
                 isLoading ?
                 <AtToast hasMask={true} duration={0} isOpened={true} text="正在加载" status={'loading'}></AtToast>
                 :
                 null
            }
            <View className="wrapper">
                <View className="imgWrapper">
                    <Image className="img"  mode="center" src={data.img}></Image>
                </View>
                <View className="down" style={{
                    transform: `translateY(${isDown ? '250rpx' : '868rpx'})`
                }}>
                    <View className="activitesContentWrapper">
                        <View className="activiterMain">
                            <View className="contentHead">
                                <View className="title">{data.title}</View>
                                <View className="contentTag">{data.tag}</View>
                            </View>
                            <View className="money">活动预算：￥{data.money}</View>
                            <View className="time">赞助时间：{data.startTime} 至 {data.endTime}</View>
                            <View className="position">活动地点：{data.city}</View>
                            <View className="fileWrapper">活动方案：<Text className="file">{data.activityPlan}</Text></View>
                            <View className="divier"></View>
                            <View className="data">
                                <View className="text">浏览次数：{data.browseTimes}</View>
                                <View className="text">申请人数：{data.applicantsNum}</View>
                            </View>
                        </View>
                    </View>
                    <View className="associationWrapper">
                        <View className="top">
                            <View className="logoWrapper">
                                <Image className="logo" src={data.logo} mode="center"></Image>
                            </View>
                            <View className="introduce">
                                <View className="name">{data.name}</View>
                                <View className="tagWrapper">
                                    {
                                        data.associationTag.map((item, index) => {
                                            return <View className="tag" key={index + '1'}>{item}</View>
                                        })
                                    }
                                </View>
                            </View>
                        </View>
                        <View className="bottom">{data.introduce}</View>
                    </View>
                    <View className="RecommendWrapper">
                        <View className="title">相关推荐</View>
                        <View className="recommendContent">
                            {
                                data.Recommend.map(item => {
                                    return (
                                        <navigator key={item.id} url={`/pages/activites/index?id=${item.id}`}>
                                            <View className="content" key={item.id}>
                                                <View className="contentHead">
                                                    <View className="title">{item.title}</View>
                                                    <View className="contentTag">{item.tag}</View>
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