import Taro, { useCallback, useState } from '@tarojs/taro'
import './index.scss'
import { View, Image, Text } from '@tarojs/components'
import { useDispatch } from '@tarojs/redux'
import update_pic from '../../static/img/update_pic.png'
import { submitIDCard } from '../../actions/uploadIDCard'

const UploadIDCard = props => {
    const dispatch = useDispatch()
    const [positive, setPositive] = useState('')  //正面
    const [back, setBack] = useState('')  //背面
    const maxSize = 1024 * 1024 * 2
    const uploadBack = useCallback(async () => {
        try {
            let res = await Taro.chooseImage({
                count: 1
            })
            let { path, size } = res.tempFiles[0]
            if(size > maxSize) {
                Taro.showToast({
                    title: '图片超出限制2MB',
                    duration: 2000
                })
            } else {
                const fd = Taro.getFileSystemManager()
                const req = await new Promise((res, rej) => {
                    fd.readFile({
                        filePath: path,
                        encoding: 'base64',
                        success: ({ data }) => {
                            res('data:image/png;base64,' + data)
                        },
                        fail: err => {
                            rej(err)
                        }
                    })
                })
                setBack(req)
            }
        } catch(err) {
            let { errMsg = 'error' } = err
            if(errMsg !== 'chooseImage:fail cancel') {
                Taro.showToast({
                    title: '上传失败',
                    icon: 'none',
                    duration: 2000
                })
            }
        }
    }, [])
    const submit = useCallback(async () => {
        if(positive === '' || back === '') return
        try {
            const action = submitIDCard(positive, back)
            await dispatch(action)
            Taro.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 2000
            })
        } catch(err) {
            Taro.showToast({
                title: '上传失败',
                icon: 'none',
                duration: 2000
            })
        }
    }, [positive, back])
    const uploadPositive = useCallback(async () => {
        try {
            let res = await Taro.chooseImage({
                count: 1
            })
            let { path, size } = res.tempFiles[0]
            if(size > maxSize) {
                Taro.showToast({
                    title: '图片超出限制2MB',
                    icon: 'none',
                    duration: 2000
                })
            } else {
                const fd = Taro.getFileSystemManager()
                const req = await new Promise((res, rej) => {
                    fd.readFile({
                        filePath: path,
                        encoding: 'base64',
                        success: ({ data }) => {
                            res('data:image/png;base64,' + data)
                        },
                        fail: err => {
                            rej(err)
                        }
                    })
                })
                setPositive(req)
            }
        } catch(err) {
            let { errMsg = 'error' } = err
            if(errMsg !== 'chooseImage:fail cancel') {
                Taro.showToast({
                    title: '上传失败',
                    icon: 'none',
                    duration: 2000
                })
            }
        }
    }, [])

    return (
        <View className="container">
            <View className="PositiveWrapper">
                {/* <View className="title">身份证正面:</View> */}
                <View className={positive === '' ? "containerWrapper bg" : 'containerWrapper' } onClick={uploadPositive}>
                    <Image className="add" src={update_pic}></Image>
                    {
                        positive === '' ?
                        null
                        :
                        <Image mode="scaleToFill" className="img" src={positive}></Image>
                    }
                    <View className="title">
                        {
                            positive === '' ?
                            '正面照片'
                            :
                            '重新上传'
                        }
                    </View>
                </View>
            </View>
            <View className="PositiveWrapper">
                {/* <View className="title">身份证正面:</View> */}
                <View  className={back === '' ? "containerWrapper bg" : 'containerWrapper' } onClick={uploadBack}>
                    <Image className="add" src={update_pic}></Image>
                    {
                        back === '' ?
                        null
                        :
                        <Image mode="scaleToFill" className="img" src={back}></Image>
                    }
                    <View className="title">
                        {
                            back === '' ?
                            '背面照片'
                            :
                            '重新上传'
                        }
                    </View>
                </View>
            </View>
            <View onClick={submit} className={back === '' || positive === '' ? "btn disable" : "btn"}>确认上传</View>
        </View>
    )
}

UploadIDCard.config = {
    navigationBarTitleText: '上传身份证'
}

export default UploadIDCard