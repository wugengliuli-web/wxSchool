import Taro, { useDidShow } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'

import './index.scss'
import { getBanner } from '../../actions/home'
const Home = props => {

    let dispatch = useDispatch()
    let bannerUrl = useSelector(state => state.home.bannerUrl)
    useDidShow(() => {
        //进入页面获取轮播图信息
        if(bannerUrl.length === 0) {
            const aciton = getBanner()
            dispatch(aciton)
        }
    })
        Taro.navigateTo({
            url:'/pages/personalCenter/index'
        })
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

        </View>
    )
}

Home.config = {
	navigationBarTitleText: '易赞校园'
}
export default Home