import Taro, { useDidShow, useCallback, useState } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Picker, Text, Navigator } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import locate from '../../static/img/locate.png'
import search from '../../static/img/search.png'
import './index.scss'
import { getBanner, getSearchPlaceHolder, getContent, clearContent } from '../../actions/home'
import { AtIcon } from 'taro-ui'
import Skeleton from 'taro-skeleton'
import TabBar from '../../component/tabBar'
import { activityType } from '../../lib/type'
const Home = props => {
    const defaultLogo = ''
    let hasMore = useSelector(state => state.home.hasMore)
    let pageIndex = useSelector(state => state.home.pageIndex)
    let [hasAjax, setHasAjax] = useState(false)
    let dispatch = useDispatch()
    let [loading, setLoading] = useState(false)
    let bannerUrl = useSelector(state => state.home.bannerUrl)
    let [place, setPlace] = useState(['四川省', '绵阳市', '涪城区'])
    let searchPlaceHolder = useSelector(state => state.home.searchPlaceHolder)
    let content = useSelector(state => state.home.content)
    useDidShow(async () => {
        // Taro.navigateTo({
        //     url: '/pages/personInfo/index?id=' + Math.random() * 100000
        // })
        //进入页面获取轮播图信息
        if(bannerUrl.length === 0) {
            const aciton = getBanner()
            dispatch(aciton)
        }
        //获取搜索区域的内容
        if(!hasAjax) {
            try {
                if(searchPlaceHolder === '') {
                    const aciton = getSearchPlaceHolder()
                    dispatch(aciton)
                }
                if(content.length === 0) {
                    setLoading(true)
                    const aciton = getContent(pageIndex, place)
                    await dispatch(aciton)
                    setLoading(false)
                }
            } catch(err) {
                Taro.showToast({
                    title:'请求失败',
                    icon: 'none',
                    duration: 2000
                })
            }
            setHasAjax(true)
        }
        
    })
    let bindchange = useCallback(async info => {
        const actionClear = clearContent()
        await dispatch(actionClear)
        let { target: { value } } = info
        setLoading(true)
        setPlace(value)
        pageIndex = 1
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
    }, [pageIndex, hasMore])
    return (

        <View className="container">
            <View className="bannerWrapper">
                {
                    bannerUrl.length === 0 ?
                    <View className="bannerPlaceHolder"></View>
                    :
                    <Swiper
                        autoplay={true}
                        interval={3000}
                        duration={500}
                        circular={true}
                        indicatorDots={true}
                    >
                        {
                            bannerUrl.map((item, index) => {
                                return (
                                    <SwiperItem key={item.id}>
                                        <Image className="img" src={item.path} mode="scaleToFill"></Image>
                                    </SwiperItem>
                                )
                            })
                        }
                    </Swiper>
                }
            </View>
            <View className="searchWrapper">
                <View className="dropDown">
                    <Image src={locate} className="point"></Image>
                    <Picker className="picker" mode="region" onChange={bindchange} value={place} >
                        <Text className="pickerContent">
                            {
                                place[0] + place[1] + place[2]
                            }
                        </Text>
                        <AtIcon className="icon" value='chevron-down' size='16' color='#272755'></AtIcon>
                    </Picker>
                </View>
                <Navigator url={`/pages/search/index`}>
                    <View className="searchContainer">
                        {searchPlaceHolder}
                        <View className="searchIconWrapper">
                        <Image src={search} className="search"></Image>
                        </View>
                    </View>
                </Navigator>
            </View>
            <View className="contentWrapper">
                <View className="title">推荐</View>
                <View className="waterfallWrapper">
                    {
                        content.map((item, index) => {
                            return (
                                <Navigator className="link" url={`/pages/activites/index?id=${item.id}&type=${activityType.activity}`} key={item.id} >
                                    <View className="contentWrapperBorder">
                                        <View className="contentContainer">
                                            <Image mode="widthFix" className="img" src={item.poster} ></Image>
                                            <View className="infoWrapper">
                                                <View className="contentText">{item.name}</View>
                                                <View className="contentInfoWrapper">
                                                    <Image mode="scaleToFill" src={item.user.avatar ? item.user.avatar : defaultLogo} className="logo"></Image>
                                                    <View className="name">{item.user.nickname}</View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </Navigator>
                            )
                        })
                    }
                </View>
                {
                    loading && !hasAjax?
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
            <TabBar initIndex={0} />
        </View>
    )
}

Home.config = {
    navigationBarTitleText: '易赞校园'
}
export default Home