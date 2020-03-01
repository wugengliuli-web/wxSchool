import Taro, { useCallback, useState, useEffect } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import './index.scss'
import { AtInput, AtTextarea, AtIcon } from 'taro-ui'
import { setUserInfo } from '../../actions/personInfo'
const PersonInfo = props => {
    const maxSize = 1024 * 1024 * 2
    const defaultImg = ''
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.personalCenter)
    const [nickName, setNickName] = useState(userInfo.nickName || '')
    const [phone, setPhone] = useState(userInfo.phone)
    const [avatar, setAvatar] = useState(userInfo.avatar)
    const [signature, setSignature] = useState(userInfo.signature || '')
    const setNickNameWrapper = useCallback(info => {
        setNickName(info)
    }, [])


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

    useEffect(() => {
        return async () => {
            try {
                const action = setUserInfo({avatar, nickName, signature})
                await dispatch(action)
            } catch(err) {
                
            }
        }
    }, [avatar, nickName, signature])

    const upLoadImg = useCallback(async () => {
        try {
            const res = await Taro.chooseImage({
                count: 1
            })
            const { size, path } = res.tempFiles[0]
            if(size > maxSize) {
                Taro.showToast({
                    title: '文件超出大小2MB',
                    duration: 2000
                })
            } else {
                setAvatar(path)
            }
        } catch(err) {

        }
    }, [])
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
                            maxLength={20}
                            value={nickName}
                            onChange={setNickNameWrapper}
                        />
                    </View>
                </View>
                <View className="userTel item">
                    <View className="title">电话号码</View>
                    <View className="inputWrapper">
                        <AtInput
                            disabled={true}
                            name='value1'
                            type='text'
                            placeholder='电话号码'
                            value={phone}
                            onChange={setPhone}
                        />
                    </View>
                </View>
            </View>
            <View className="middle">
                <View className="headImgWapper">
                    <View className="title">头像</View>
                    <View className="imgWrapper" onClick={upLoadImg}>
                        <Image className="img" src={avatar ? avatar : defaultImg}></Image>
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