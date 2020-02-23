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
    const uploadImg = useCallback(async () => {
        try {
            let res = await Taro.chooseImage({
                count: 1
            })
            let { path, size } = res.tempFiles[0]
            setLogo(path)
        } catch(err) {
            let { errMsg } = err
            if(errMsg !== 'chooseImage:fail cancel') {
                Taro.showToast({
                    title: '上传图片失败,请重试',
                    icon: 'loading',
                    duration: 2000
                })
            }
        }
    }, [])

    return (
        <View className="container">
            <View className="head">
                <View className="item">
                    <View class="title">团队logo</View>
                    <View className="info" onClick={uploadImg}>
                        <AtIcon value='chevron-right' size='15' color='#999999'></AtIcon>
                        {
                            logo === '' ?
                            null
                            :
                            <Image src={logo} mode="center" className="logo"></Image>
                        }
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