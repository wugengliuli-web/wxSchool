import Taro, { useState, useCallback, useDidShow } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import TabBar from '../../component/tabBar'
import './index.scss'
import { useSelector, useDispatch } from '@tarojs/redux'
import { AtIcon } from 'taro-ui'
import Skeleton from 'taro-skeleton'
import {
    getCampusActivities,
    getMerchantSponsorship,
    getDreamCrowdFinancing
} from '../../actions/sponsor'
import { activitesColor } from '../../lib/type'
import basketball from '../../static/img/basketball.png'
import company from '../../static/img/company.png'
import dream from '../../static/img/dream.png'
const Sponsor = props => {
    const dispatch = useDispatch()
    const [hasAjax, setHasAjax] = useState(false)
    let [place, setPlace] = useState(['四川省', '绵阳市', '涪城区'])
    let searchPlaceHolder = useSelector(state => state.home.searchPlaceHolder)
    let campusActivities = useSelector(state => state.sponsor.campusActivities)  //校园活动
    let merchantSponsorship = useSelector(state => state.sponsor.merchantSponsorship)  //商家赞助
    let dreamCrowdFinancing = useSelector(state => state.sponsor.dreamCrowdFinancing)  //梦想众筹
    let bindchange = useCallback(async info => {
        let { target: { value } } = info
        setPlace(value)
    }, [])
    const options = [
        { text: '校园活动', id: 'qwer', url: '/pages/search/index?currentPage=0', icon: basketball },
        { text: '商家赞助', id: 'wert', url: '/pages/search/index?currentPage=1', icon: company },
        { text: '梦想众筹', id: 'tyui', url: '/pages/search/index?currentPage=2', icon: dream },
    ] 
    useDidShow(async () => {
        if(!hasAjax) {
            try {
                if(campusActivities.length === 0) {
                    const actionCampusActivities = getCampusActivities()
                    dispatch(actionCampusActivities)
                }
                if(merchantSponsorship.length === 0) {
                    const actionMerchantSponsorship = getMerchantSponsorship()
                    dispatch(actionMerchantSponsorship)
                }
                if(dreamCrowdFinancing.length === 0) {
                    const actionDreamCrowdFinancing = getDreamCrowdFinancing()
                    dispatch(actionDreamCrowdFinancing)
                }
            } catch(err) {
                Taro.showToast({
                    title: '出错了~~~',
                    icon: 'none',
                    duration: 2000
                })
            }
            setHasAjax(true)
        }
    })
    return (
        <View className="container">
            <View className="searchWrapper">
                <View className="dropDown">
                    <AtIcon className="icon point" value='map-pin' size='18' color='#000'></AtIcon>
                    <Picker className="picker" mode="region" onChange={bindchange} value={place} >
                        <Text className="pickerContent">
                            {
                                place[0] + place[1] + place[2]
                            }
                        </Text>
                        <AtIcon className="icon" value='chevron-down' size='16' color='#272755'></AtIcon>
                    </Picker>
                </View>
                <Navigator url={`/pages/search/index?searchPlaceHolder=${searchPlaceHolder}`}>
                    <View className="searchContainer">
                        {searchPlaceHolder}
                        <View className="searchIconWrapper">
                            <AtIcon className="searchIcon" value='search' size='18' color='#000'></AtIcon>
                        </View>
                    </View>
                </Navigator>
            </View>
            <View className="tagWrapper">
                {
                    options.map((item, index) => {
                        return (
                            <Navigator key={item.id} url={item.url}>
                                <View className={index === 0 ? "tag green" : index === 1 ? 'tag blue' : 'tag sky'}>
                                    <View className="contentWrapper">
                                        <View className="imgWrapper">
                                            <Image src={item.icon} className="img"></Image>
                                        </View>
                                        <View className="text">{item.text}</View>
                                    </View>
                                </View>
                            </Navigator>
                        )
                    })
                }
            </View>
            <View className="contentWrapper">
                <View className="campusActivitiesWrapper">
                    <View className="head">
                        <View className="title">校园活动</View>
                        <Navigator className="more" url={options[0].url}>
                            更多
                        </Navigator>
                    </View>
                    <View className="campusActivitiesContent">
                        {
                            campusActivities.length === 0 && !hasAjax ?
                            <Skeleton animateName='elastic' rowWidth={['50%','70%','80%']} animate={true} row={3}></Skeleton>
                            :
                            campusActivities.map(item => {
                                return (
                                    <navigator key={item.id} url={`/pages/activites/index?id=${item.id}`}>
                                        <View className="content" >
                                            <View className="contentHead">
                                                <View className="title">{item.name}</View>
                                                <View className="tagContainer">
                                                    {/* {
                                                        item.type.map(key => {
                                                            return <View key={key} className={activitesColor.blue.includes(key) ? 'contentTag blue' : activitesColor.green.includes(key) ? 'contentTag green' : 'contentTag red'}>{key}</View>
                                                        })
                                                    } */}
                                                    <View className={activitesColor.blue.includes(item.type) ? 'contentTag blue' : activitesColor.green.includes(item.type) ? 'contentTag green' : 'contentTag red'}>{item.type}</View>
                                                </View>
                                            </View>
                                            <View className="address">地址: {item.address}</View>
                                            <View className="contentBottom">
                                                <View className="timer">发布时间: {item.publishDate}~{item.deadline}</View>
                                                <View className="money">￥{item.budget}</View>
                                            </View>
                                        </View>
                                    </navigator>
                                )
                            })
                        }
                    </View>
                </View>
                <View className="campusActivitiesWrapper">
                    <View className="head">
                        <View className="title">商家赞助</View>
                        <Navigator className="more" url={options[1].url}>
                            更多
                        </Navigator>
                    </View>
                    <View className="campusActivitiesContent">
                        {
                            merchantSponsorship.length === 0 && !hasAjax ?
                            <Skeleton animateName='elastic' rowWidth={['50%','70%','80%']} animate={true} row={3}></Skeleton>
                            :
                            merchantSponsorship.map(item => {
                                return (
                                    <navigator key={item.merchantId} url={`/pages/activites/index?merchantId=${item.merchantId}`}>
                                        <View className="content">
                                            <View className="contentHead">
                                                <View className="title">{item.merchant.name}</View>
                                                <View className="tagContainer">
                                                    {/* {
                                                        item.type.map(key => {
                                                            return <View key={key} className={activitesColor.blue.includes(key) ? 'contentTag blue' : activitesColor.green.includes(key) ? 'contentTag green' : 'contentTag red'}>{key}</View>
                                                        })
                                                    } */}
                                                    <View className={activitesColor.blue.includes(item.merchant.type) ? 'contentTag blue' : activitesColor.green.includes(item.merchant.type) ? 'contentTag green' : 'contentTag red'}>{item.merchant.type}</View>
                                                </View>
                                            </View>
                                            <View className="address">地址: {item.address}</View>
                                            <View className="contentBottom">
                                                <View className="timer">发布时间: {item.availableDate}~{item.publishDate}</View>
                                                <View className="money">￥{item.budget ? item.budget : 2000}</View>
                                            </View>
                                        </View>
                                    </navigator>
                                )
                            })
                        }
                    </View>
                </View>
                <View className="campusActivitiesWrapper bottom">
                    <View className="head">
                        <View className="title">梦想众筹</View>
                        <Navigator className="more" url={options[2].url}>
                            更多
                        </Navigator>
                    </View>
                    <View className="campusActivitiesContent">
                        {
                            dreamCrowdFinancing.length === 0 && !hasAjax ?
                            <Skeleton animateName='elastic' rowWidth={['50%','70%','80%']} animate={true} row={3}></Skeleton>
                            :
                            dreamCrowdFinancing.map(item => {
                                return (
                                    <navigator key={item.id} url={`/pages/activites/index?activityId=${item.activityId}`}>
                                        <View className="content" key={item.activityId}>
                                            <View className="contentHead">
                                                <View className="title">{item.activity.name}</View>
                                                <View className="tagContainer">
                                                    {/* {
                                                        item.type.map(key => {
                                                            return <View key={key} className={activitesColor.blue.includes(key) ? 'contentTag blue' : activitesColor.green.includes(key) ? 'contentTag green' : 'contentTag red'}>{key}</View>
                                                        })
                                                    } */}
                                                    <View className={activitesColor.blue.includes(item.activity.type) ? 'contentTag blue' : activitesColor.green.includes(item.activity.type) ? 'contentTag green' : 'contentTag red'}>{item.activity.type}</View>
                                                </View>
                                            </View>
                                            <View className="address">地址: {item.activity.address}</View>
                                            <View className="contentBottom">
                                                <View className="timer">发布时间: {item.activity.publishDate}~{item.activity.deadline}</View>
                                                <View className="money">￥{item.activity.budget}</View>
                                            </View>
                                        </View>
                                    </navigator>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
            <TabBar initIndex={1} />
        </View>
    )
} 



Sponsor.config = {
    navigationBarTitleText: '易赞校园'
}
export default Sponsor