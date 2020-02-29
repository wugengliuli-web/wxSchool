import Taro, { useDidShow, useCallback, useState } from '@tarojs/taro'
import { View, Image, Text, Navigator } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import './index.scss'
import { AtInput, AtTextarea, AtIcon } from 'taro-ui'

const PersonInfo = props => {
    const defaultImg = ''
    const userInfo = useSelector(state => state.personalCenter)
    const [nickName, setNickName] = useState(userInfo.nickName)
    const [phone, setPhone] = useState(userInfo.phone)
    const [imgSrc, setImgSrc] = useState(userInfo.imgSrc)
    const [signature, setSignature] = useState(userInfo.signature)

    const setSignatureWrapper = useCallback(info => {
        setSignature(info.target.value)
    }, [])

    const goChceked = useCallback(() => {
        if(userInfo.isChceked) return
        Taro.navigateTo({
            url: '/pages/uploadStudentIDCard/index'
        })
    }, [userInfo.isChceked])

    const goNamed = useCallback(() => {
        if(userInfo.isNamed) return
        Taro.navigateTo({
            url: '/pages/uploadIDCard/index'
        })
    }, [userInfo.isNamed])

    return (
        <View className="container">
            <View className="head">
                <View className="userName item">
                    <View className="title">用户名</View>
                    <View className="inputWrapper">
                        <AtInput
                            name='value1'
                            type='text'
                            placeholder='修改用户名'
                            value={nickName}
                            onChange={setNickName}
                        />
                    </View>
                </View>
                <View className="userTel item">
                    <View className="title">电话号码</View>
                    <View className="inputWrapper">
                        <AtInput
                            name='value1'
                            type='text'
                            placeholder='修改电话号码'
                            value={phone}
                            onChange={setPhone}
                        />
                    </View>
                </View>
            </View>
            <View className="middle">
                <View className="headImgWapper">
                    <View className="title">头像</View>
                    <View className="imgWrapper">
                        <Image className="img" src={imgSrc ? imgSrc : defaultImg}></Image>
                    </View>
                </View>
                <View className="userIntroduceWrapper">
                    <View className="title">签名</View>
                    <View className="textArea">
                        <AtTextarea
                            value={signature}
                            onChange={setSignatureWrapper}
                            maxLength={50}
                            placeholder='请输入你的签名'
                        />
                    </View>
                </View>
            </View>
            <View className="toast">完成以下认证后方可申请赞助</View>
            <View className="AuthenticationWrapper">
                <View className="isChcekedWrapper item">
                    <View className="title">身份认证</View>
                    <View className="goWrapper" onClick={goChceked}>
                        <AtIcon value='chevron-right' size='15' color='#999999'></AtIcon>
                        <View className="info">
                            {
                                userInfo.isChceked ?
                                '已认证'
                                :
                                '未认证'
                            }
                        </View>
                    </View>
                </View>
                <View className="isNamedWrapper item">
                    <View className="title">实名认证</View>
                    <View className="goWrapper" onClick={goNamed}>
                        <AtIcon value='chevron-right' size='15' color='#999999'></AtIcon>
                        <View className="info">
                            {
                                userInfo.isChceked ?
                                '已认证'
                                :
                                '未认证'
                            }
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

PersonInfo.config = {
    navigationBarTitleText: '个人信息'
}

export default PersonInfo