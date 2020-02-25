import Taro, { useState, useCallback, useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
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
const Sponsor = props => {
    const dispatch = useDispatch()
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
        { text1: '校园', text2: '活动', id: 'qwer', url: '/pages/search/index?currentPage=0' },
        { text1: '商家', text2: '赞助', id: 'wert', url: '/pages/search/index?currentPage=1' },
        { text1: '梦想', text2: '众筹', id: 'tyui', url: '/pages/search/index?currentPage=2' },
    ] 
    useDidShow(async () => {
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
                    options.map(item => {
                        return (
                            <Navigator key={item.id} url={item.url}>
                                <View className="tag">
                                    <View className="contentWrapper">
                                        <View>{item.text1}</View>
                                        <View>{item.text2}</View>
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
                            campusActivities.length === 0 ?
                            <Skeleton animateName='elastic' rowWidth={['50%','70%','80%']} animate={true} row={3}></Skeleton>
                            :
                            campusActivities.map(item => {
                                return (
                                    <navigator key={item.id} url={`/pages/activites/index?id=${item.id}`}>
                                        <View className="content" >
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
                <View className="campusActivitiesWrapper">
                    <View className="head">
                        <View className="title">商家赞助</View>
                        <Navigator className="more" url={options[1].url}>
                            更多
                        </Navigator>
                    </View>
                    <View className="campusActivitiesContent">
                        {
                            merchantSponsorship.length === 0 ?
                            <Skeleton animateName='elastic' rowWidth={['50%','70%','80%']} animate={true} row={3}></Skeleton>
                            :
                            merchantSponsorship.map(item => {
                                return (
                                    <navigator key={item.id} url={`/pages/activites/index?id=${item.id}`}>
                                        <View className="content">
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
                <View className="campusActivitiesWrapper bottom">
                    <View className="head">
                        <View className="title">梦想众筹</View>
                        <Navigator className="more" url={options[2].url}>
                            更多
                        </Navigator>
                    </View>
                    <View className="campusActivitiesContent">
                        {
                            dreamCrowdFinancing.length === 0 ?
                            <Skeleton animateName='elastic' rowWidth={['50%','70%','80%']} animate={true} row={3}></Skeleton>
                            :
                            dreamCrowdFinancing.map(item => {
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
            <TabBar initIndex={1} />
        </View>
    )
} 
export default Sponsor