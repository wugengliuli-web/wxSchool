import Taro, { useDidShow, useCallback, useState } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Picker, Text } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import './index.scss'
import { getBanner, getSearchPlaceHolder, getContent, clearContent } from '../../actions/home'
import { AtIcon } from 'taro-ui'
import Skeleton from 'taro-skeleton'
import TabBar from '../../component/tabBar'
const Home = props => {
    let hasMore = useSelector(state => state.home.hasMore)
    let pageIndex = useSelector(state => state.home.pageIndex)
    let dispatch = useDispatch()
    let [loading, setLoading] = useState(true)
    let bannerUrl = useSelector(state => state.home.bannerUrl)
    let [place, setPlace] = useState(['四川省', '绵阳市', '涪城区'])
    let searchPlaceHolder = useSelector(state => state.home.searchPlaceHolder)
    let content = useSelector(state => state.home.content)
    useDidShow(async () => {
        //进入页面获取轮播图信息
        if(bannerUrl.length === 0) {
            const aciton = getBanner()
            dispatch(aciton)
        }
        //获取搜索区域的内容
        if(searchPlaceHolder === '') {
            const aciton = getSearchPlaceHolder()
            dispatch(aciton)
        }
        if(content.length === 0) {
            const aciton = getContent(pageIndex, place)
            await dispatch(aciton)
            setLoading(false)
        }
    })
    let bindchange = useCallback(async info => {
        const actionClear = clearContent()
        await dispatch(actionClear)
        let { detail: { value } } = info
        setLoading(true)
        setPlace(value)
        pageIndex = 0
        const aciton = getContent(pageIndex, value)
        await dispatch(aciton)
        setLoading(false)
    }, []) 
    let getMore = useCallback(async () => {
        if(!hasMore) return
        setLoading(true)
        pageIndex++
        const aciton = getContent(pageIndex, place)
        await dispatch(aciton)
        setLoading(false)
    }, [pageIndex])
    return (
        <View className="container">
            <View className="bannerWrapper">
                {
                    bannerUrl.length === 0 ?
                    <View className="bannerPlaceHolder"></View>
                    :
                    <Swiper
                        indicatorDots={true}
                        autoplay={true}
                        interval={3000}
                        duration={500}
                        circular={true}
                    >
                        {
                            bannerUrl.map((item, index) => {
                                return (
                                    <SwiperItem key={item.link}>
                                        <Image className="img" src={item.url} mode="center"></Image>
                                    </SwiperItem>
                                )
                            })
                        }
                    </Swiper>
                }
            </View>
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
                <View className="searchContainer">
                    {searchPlaceHolder}
                    <View className="searchIconWrapper">
                        <AtIcon className="searchIcon" value='search' size='18' color='#000'></AtIcon>
                    </View>
                </View>
            </View>
            <View className="contentWrapper">
                <View className="title">推荐</View>
                <View className="waterfallWrapper">
                    {
                        content.map((item, index) => {
                            return (
                                <Navigator className="link" url={`test/?id=${item.id}`} key={item.id} >
                                    <View>
                                        <View className="contentContainer">
                                            <Image mode="widthFix" className="img" src={item.url} ></Image>
                                            <View className="contentText">{item.text}</View>
                                        </View>
                                    </View>
                                </Navigator>
                            )
                        })
                    }
                </View>
                {
                    loading ?
                    <Skeleton animateName='elastic' rowWidth={['50%','70%','80%']} animate={true} row={3}></Skeleton>
                    :
                    <View className="more" onClick={getMore}>
                        {
                            hasMore ?
                            '加载更多'
                            :
                            '已无更多'
                        }
                    </View>
                }
            </View>
            <TabBar />
        </View>
    )
}

Home.config = {
    navigationBarTitleText: '易赞校园'
}

export default Home