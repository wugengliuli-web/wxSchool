import Taro, { useDidShow, useCallback, useState, useRouter } from '@tarojs/taro'
import { View, Navigator, Picker, Text } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import { AtInput, AtIcon } from 'taro-ui'
import './index.scss'
import add_poster from '../../static/img/add_poster.png'

function getNowTime() {
    const date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if(month < 10) month = 0 + String(month)
    if(day < 10)  day = 0 + String(day)
    return year + '-' + month + '-' + day
}

const Release = props => {
    const maxSize = 1024*1024*5
    const imgMaxSize = 1024*1024*2
    const { params: { type = 'activity' } } = useRouter()
    //判断是活动发布还是赞助发布 sponsor  赞助  activity  活动
    const [activityName, setActivityName] = useState('')  //活动名称
    const activityType = useSelector(state => state.release.activityType)
    const [startTime, setStartTime] = useState(getNowTime())
    const [endTime, setEndTime] = useState(getNowTime())
    const [position, setPosition] = useState('')
    const [money, setMoney] = useState('')
    const [material, setMaterial] = useState('')  //赞助物资
    const [file, setFile] = useState('')
    const [img, setImg] = useState([])  //海报
    const [name, setName] = useState('')  //负责人姓名
    const [tel, setTel] = useState('')  //电话
    const [wx, setWX] = useState('')  //wx
    const [qq, setQQ] = useState('')  //qq
    const [check, setCheck] = useState(false)
    const youShoudKnow = ''
    const submit = () => {
        if(!(activityName &&  activityType.length > 0 && position && money && file && img.length > 0 && name && (tel || wx || qq) && check)) return 
        let info;
        if(type === 'sponsor') { //赞助
            info = {
                activityName,
                activityType,
                startTime,
                endTime,
                position,
                money,
                material,
                file: file.patg,
                img,
                name,
                contactInfo: {
                    wx,
                    qq,
                    tel
                }
            }
        } else {
            info = {
                activityName,
                activityType,
                startTime,
                endTime,
                position,
                money,
                file: file.patg,
                img,
                name,
                contactInfo: {
                    wx,
                    qq,
                    tel
                }
            }
        }
    }
    const setPositionWrapper = useCallback(info => {
        let { target: { value } } = info
        setPosition(value.join('-'))
    }, [])
    const setStartTimeWrapper = useCallback(info => {
        let { target: { value } } = info
        setStartTime(value)
    }, [])
    const setEndTimeWrapper = useCallback(info => {
        let { target: { value } } = info
        setEndTime(value)
    }, [])
    const addImg = useCallback(async () => {
        try {
            let res = await Taro.chooseImage({
                count: 1
            })
            let { path, size } = res.tempFiles[0]
            if(size > imgMaxSize) {
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
                setImg([...img, req])
            }
        } catch(err) {
            let { errMsg = 'error' } = err
            if(errMsg !== 'chooseImage:fail cancel') {
                Taro.showToast({
                    title: '上传失败',
                    duration: 2000
                })
            }
        }
    }, [img])
    const setFileWrapper = useCallback(async () => {
        try {
            const res = await Taro.chooseMessageFile({
                count: 1,
                type: file,
                extension: ['docx']
            })
            const { name, path, size } = res.tempFiles[0]
            if(!/docx$/i.test(name)) {
                Taro.showToast({
                    title: '文件格式不对',
                    icon: 'none',
                    duration: 2000
                })
                return
            } 
            if(size > maxSize) {
                Taro.showToast({
                    title: '文件过大',
                    icon: 'none',
                    duration: 2000
                })
                return
            }
            setFile({
                name,
                path
            })
        } catch(err) {
            let { errMsg } = err
            if(errMsg !== 'chooseMessageFile:fail cancel') {
                Taro.showToast({
                    title: '上传失败',
                    icon: 'none',
                    duration: 2000
                })
            }
        }
    }, [])
    useDidShow(() => {
        Taro.setNavigationBarTitle({
            title: type === 'sponsor' ? '赞助发布' : '活动发布'
        })
    })
    const previewImage = useCallback(index => {
        Taro.previewImage({
            current: img[index],
            urls: img
        })
    }, [img])
    return (
        <View className="container">
            <View className="activityNameWrapper">
                <View className="title">
                    {
                        type === 'sponsor' ?
                        '赞助主题'
                        :
                        '活动名称'
                    }
                </View>
                <View className="info">
                    <AtInput
                        className={activityName === '' ? 'placeholder' : ''}
                        name='value1'
                        type='text'
                        placeholder='未填写'
                        value={activityName}
                        onChange={setActivityName}
                    />
                </View>
            </View>
            <View className="divier"></View>
            <View className="activityNameWrapper">
                <View className="title">活动类别</View>
                <Navigator className="link" url={`/pages/activityType/index?type=${type}`}>
                    <View className="info">
                        <AtIcon value='chevron-right' size='15' color='#999999'></AtIcon>
                        <View className="text">
                            { activityType.join('、') }
                        </View>
                    </View>
                </Navigator>
            </View>
            <View className="divier"></View>
            <View className="activityNameWrapper">
                <View className="title">发布时间</View>
                <View className="info">
                    <Picker mode='date' onChange={setEndTimeWrapper}>
                        <View className='picker'>
                            {endTime}
                        </View>
                    </Picker>
                    <Text className="and">至</Text>
                    <Picker mode='date' onChange={setStartTimeWrapper}>
                        <View className='picker'>
                            {startTime}
                        </View>
                    </Picker>
                </View>
            </View>
            <View className="divier"></View>
            <View className="activityNameWrapper">
                <View className="title">
                    {
                        type === 'sponsor' ?
                        '地域要求'
                        :
                        '活动地点'
                    }
                </View>
                <View className="info">
                    <AtIcon value='chevron-right' size='15' color='#999999'></AtIcon>
                    <Picker mode='region' onChange={setPositionWrapper}>
                        <View className='pickerPosition'>
                            {position}
                        </View>
                    </Picker>
                </View>
            </View>
            <View className="divier"></View>
            <View className="activityNameWrapper">
                <View className="title">
                    {
                        type === 'sponsor' ?
                        '赞助金额'
                        :
                        '活动预算'
                    }
                </View>
                <View className="info">
                    <AtInput
                        className={money === '' ? 'placeholder' : ''}
                        name='value1'
                        type='number'
                        placeholder='未填写'
                        value={money}
                        onChange={setMoney}
                    />
                </View>
            </View>
            <View className="divier"></View>
            {
                type === 'sponsor' ?
                <View>
                    <View className="activityNameWrapper">
                        <View className="title">赞助物资</View>
                        <View className="info">
                            <AtInput
                                className={material === '' ? 'placeholder' : ''}
                                name='value1'
                                type='number'
                                placeholder='选填'
                                value={material}
                                onChange={setMaterial}
                            />
                        </View>
                    </View>
                    <View className="divier"></View>
                </View>
                :
                null
            }
            <View className="activityNameWrapper">
                <View className="title">
                    {
                        type === 'sponsor' ?
                        '赞助要求'
                        :
                        '活动方案'
                    }
                </View>
                <View className="info" onClick={setFileWrapper}>
                    <AtIcon value='chevron-right' size='15' color='#999999'></AtIcon>
                    <View className={file === '' ? 'placeholder' : ''}>
                        {
                            file === '' ?
                            '上传（不得出现联系方式、二维码）'
                            :
                            file.name
                        }
                    </View>
                </View>
            </View>
            <View className="divier"></View>
            <View>
                <View className="activityNameWrapper">
                    <View className="title">
                        {
                            type === 'sponsor' ?
                            '赞助海报'
                            :
                            '活动海报'
                        }
                    </View>
                    <View className="info placeholder" onClick={setFileWrapper}>
                        {img.length}/3
                    </View>
                </View>
                <View className="imgWrapper">
                    {
                        img.map((item, index) => {
                            return <Image onClick={() => previewImage(index)} key={index+'44'} src={item} className="img"></Image>
                        })
                    }
                    {
                        img.length === 3 ?
                        null
                        :
                        <Image onClick={addImg} className="img" src={add_poster}></Image>
                    }
                </View>
            </View>
            <View className="divier"></View>
            <View className="activityNameWrapper">
                <View className="title">负责人姓名</View>
                <View className="info">
                    <AtInput
                        className={name === '' ? 'placeholder' : ''}
                        name='value1'
                        type='number'
                        placeholder='未填写'
                        value={name}
                        onChange={setName}
                    />
                </View>
            </View>
            <View className="divier"></View>
            <View>
                <View className="activityNameWrapper">
                    <View className="title">联系方式（至少一种）</View>
                </View>
                <View className="infoWrapper">
                    <View className="title">电话</View>
                    <View className="info">
                        <AtInput
                            className={tel === '' ? 'placeholder' : ''}
                            name='value1'
                            type='number'
                            placeholder='未填写'
                            value={tel}
                            onChange={setTel}
                        />
                    </View>
                </View>
                <View className="infoWrapper">
                    <View className="title">微信</View>
                    <View className="info">
                        <AtInput
                            className={wx === '' ? 'placeholder' : ''}
                            name='value1'
                            type='number'
                            placeholder='未填写'
                            value={wx}
                            onChange={setWX}
                        />
                    </View>
                </View>
                <View className="infoWrapper">
                    <View className="title">QQ</View>
                    <View className="info">
                        <AtInput
                            className={qq === '' ? 'placeholder' : ''}
                            name='value1'
                            type='number'
                            placeholder='未填写'
                            value={qq}
                            onChange={setQQ}
                        />
                    </View>
                </View>
            </View>
            <View className="divier"></View>
            <View className="youShouleKnowWrapper">
                <View className="wrapper">
                    <View className="check" onClick={() => setCheck(!check)}>
                        {
                            check ?
                            <AtIcon value='check' size='10' color='#999'></AtIcon>
                            :
                            null
                        }
                    </View>
                    <View className="text">
                        <Text onClick={() => setCheck(!check)} >我已认真阅读并同意</Text>
                        <Navigator url={youShoudKnow}>
                            <Text className="link">《发布须知》</Text>
                        </Navigator>
                    </View>
                </View>
            </View>
            <View onClick={submit} className={activityName &&  activityType.length > 0 && position && money && file && img.length > 0 && name && (tel || wx || qq) && check? "btn" : "btn placeholder"}>发布</View>
        </View>
    )
}

export default Release