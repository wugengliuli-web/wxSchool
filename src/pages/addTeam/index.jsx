import Taro, { useCallback, useState, useRouter } from '@tarojs/taro'
import './index.scss'
import { AtIcon, AtInput, AtTextarea } from "taro-ui"
import { View, Image, Picker, Text } from '@tarojs/components'
import { submitAddTeam } from '../../actions/addTeam'
import { useDispatch } from '@tarojs/redux'
import { 
    teamTypeList,
    teamSizeList,
    teamCharacterList
} from '../../lib/type'

const AddTeam = props => {
    const dispatch = useDispatch()
    const logoSize = 1024 * 1024 * 3
    const { params: { id } } = useRouter()
    const [logo, setLogo] = useState('')  //logo图片路径
    const [name, setName] = useState('')  //团队名
    const [teamType, setTeamType] = useState('')  //团队类型
    const [teamSize, setTeamSize] = useState('') //团队规模
    const [teamCharacter, setTeamCharacter] = useState('') //团队性质
    const [teamIntroduce, setTeamIntroduce] = useState('')
    const setTeamTypeWrapper = useCallback(info => {
        let { detail: { value } } = info
        value = ~~value
        setTeamType(teamTypeList[value])
    }, [])
    const setTeamSizeWrapper = useCallback(info => {
        let { detail: { value } } = info
        value = ~~value
        setTeamSize(teamSizeList[value])
    }, [])
    const setTeamCharacterWrapper = useCallback(info => {
        let { detail: { value } } = info
        value = ~~value
        setTeamCharacter(teamCharacterList[value])
    }, [])
    const setTeamIntroduceWrapper = useCallback(info => {
        let { detail: { value } } = info
        setTeamIntroduce(value)
    }, [])
    const uploadImg = useCallback(async () => {
        try {
            let res = await Taro.chooseImage({
                count: 1
            })
            let { path, size } = res.tempFiles[0]
            if(size > logoSize) {
                Taro.showToast({
                    title: '图片超出限制3MB',
                    icon: 'success',
                    duration: 2000
                })
            } else {
                setLogo(path)
            }
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
    const submit = async () => {
        let info = {
            logo,
            name,
            teamType,
            teamSize,
            teamCharacter,
            teamIntroduce
        }
        for(let i in info) {
            if(info[i] === '' && i !== 'teamIntroduce') {
                Taro.showToast({
                    title: '请确保信息的完整性',
                    icon: 'loading',
                    duration: 2000
                })
                return
            }
        }
        Taro.showLoading({
            title: '提交中',
        })
        try {
            const action = submitAddTeam(info)
            const res = await dispatch(action)
            if(res === 'success') {
                Taro.showToast({
                    title: '上传成功',
                    icon: 'success',
                    duration: 2000
                })
            } else {
                Taro.showToast({
                    title: '上传失败',
                    icon: 'loading',
                    duration: 2000
                })
            }
        } catch(err) {
            Taro.showToast({
                title: '上传失败',
                icon: 'loading',
                duration: 2000
            })
        }
    }
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
                <View className="item">
                    <View class="title">团队名称</View>
                    <View className="info">
                        <AtInput
                            name='value'
                            type='text'
                            placeholder='请输入团队全称'
                            value={name}
                            onChange={setName}
                        />
                    </View>
                </View>
                <View className="item">
                    <View class="title">团队类型</View>
                    <View className="info">
                        <Picker className="picker" mode='selector' range={teamTypeList}  onChange={setTeamTypeWrapper}>
                            <Text className='pickerText'>
                                {teamType}
                            </Text>
                            <AtIcon value='chevron-right' size='15' color='#999999'></AtIcon>
                        </Picker>
                    </View>
                </View>
                <View className="item">
                    <View class="title">团队性质</View>
                    <View className="info">
                        <Picker className="picker" mode='selector' range={teamCharacterList}  onChange={setTeamCharacterWrapper}>
                            <Text className='pickerText'>
                                {teamCharacter}
                            </Text>
                            <AtIcon value='chevron-right' size='15' color='#999999'></AtIcon>
                        </Picker>
                    </View>
                </View>
                <View className="item">
                <View class="title">团队规模</View>
                    <View className="info">
                        <Picker className="picker" mode='selector' range={teamSizeList}  onChange={setTeamSizeWrapper}>
                            <Text className='pickerText'>
                                {teamSize}
                            </Text>
                            <AtIcon value='chevron-right' size='15' color='#999999'></AtIcon>
                        </Picker>
                    </View>
                </View>
            </View>
            <View className="textWrapper">
                <AtTextarea
                    value={teamIntroduce}
                    onChange={setTeamIntroduceWrapper}
                    maxLength={200}
                    placeholder='请输入团队介绍'
                />
            </View>
            <View className="btnWrapper">
                <View className="btn" onClick={submit}>提交</View>
            </View>
        </View>
    )
}

AddTeam.config = {
    navigationBarTitleText: '添加团队'
}

export default AddTeam