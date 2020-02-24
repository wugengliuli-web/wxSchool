import Taro, { useCallback, useState } from '@tarojs/taro'
import './index.scss'
import { AtToast } from "taro-ui"
import { View, Image, Text } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import update_pic from '../../static/img/update_pic.png'
import { setStudentIDCard } from '../../actions/uploadStudentIDCard'
const UploadStudentIDCard = props => {
    const dispatch = useDispatch()
    const [img, setImg] = useState(useSelector(state => state.identityAuthentication.studentIdCard))
    const maxSize = 1024 * 1024 * 2
    const getImg = useCallback(async () => {
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
                setImg(req)
            }
        } catch(err) {
            let { errMsg = 'error' } = err
            if(errMsg !== 'chooseImage:fail cancel') {
                Taro.showToast({
                    title: '上传失败',
                    icon: 'loading',
                    duration: 2000
                })
            }
        }
    }, [])
    const submit = useCallback(async () => {
        if(img === '') return
        Taro.showLoading({
            title: '上传中'
        })
        const action = setStudentIDCard(img)
        await dispatch(action)
        Taro.hideLoading()
        Taro.redirectTo({
            url: '/pages/identityAuthentication/index'
        })
    }, [img]) 
    return (
        <View className="container">
            <View className={img === '' ? "uploadWrapper bg" : "uploadWrapper"} onClick={getImg}>
                
                <View className="imgWrapper">
                    <Image src={update_pic} className="img"></Image>
                </View>
                <View className="text">{img === '' ? '请上传3M以内的照片' : '重新上传'}</View>
                {
                    img === '' ?
                    null
                    :
                    <Image mode="scaleToFill" src={img} className="studentIDCard"></Image>
                }
            </View>
            <View className="info">注：请上传学生证带有学校盖章的个人信息页</View>
            <View onClick={submit} className={img === '' ? 'btn disable' : 'btn'}>确认上传</View>
        </View>
    )
}

UploadStudentIDCard.config = {
    navigationBarTitleText: '上传学生证'
}

export default UploadStudentIDCard