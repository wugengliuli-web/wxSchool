import Taro, { useDidShow, useCallback, useState, useRouter } from '@tarojs/taro'
import './index.scss'
import { AtIcon } from "taro-ui"
import { View, Image, Text } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'


const AddTeam = props => {
    const { params: { id } } = useRouter()
    const [logo, setLogo] = useState('')  //logo图片路径
    const [name, setName] = useState('')  //团队名
    const [introduce, setIntroduce] = useState('')  //团队介绍
    return (
        <View className="container">
            <View className="head">
                <View className="item">
                    <View class="title">团队logo</View>
                    <View className="info">
                        {
                            logo === '' ?
                            null
                            :
                            <Image src={logo} mode="center" className="logo"></Image>
                        }
                        <AtIcon value='chevron-right' size='15' color='#999999'></AtIcon>
                    </View>
                </View>
                <View className="item"></View>
                <View className="item"></View>
                <View className="item"></View>
                <View className="item"></View>
            </View>
        </View>
    )
}

AddTeam.config = {
    navigationBarTitleText: '添加团队'
}

export default AddTeam