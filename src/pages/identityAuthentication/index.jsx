import Taro, { useCallback, useState, useRouter } from '@tarojs/taro'
import './index.scss'
import { AtIcon, AtInput } from "taro-ui"
import { useSelector, useDispatch } from '@tarojs/redux'
import { View, Navigator } from '@tarojs/components'
import {
    enrollmentYearList
} from '../../lib/type'
import {
    setIdentityAuthentication,
    setMajor,
    setPost,
    setDepartant,
    setTeamName
} from '../../actions/identityAuthentication'
/**
 * 身份认证
 */

const IdentityAuthentication = props => {
    const dispatch = useDispatch()
    const { params: { id } } = useRouter()
    const [options, setOptions] = useState([
        { name: 'woman', text: '女', checked: false },
        { name: 'man', text: '男', checked: true }
    ])
    //入学年份
    const enrollmentYear = useSelector(state => state.identityAuthentication.enrollmentYear)
    //大学专业
    const major = useSelector(state => state.identityAuthentication.major)
    //学校名称
    const schoolName = useSelector(state => state.identityAuthentication.schoolName)
    const choolSchoolUrl = ''
    //学生证
    const studentIdCard = useSelector(state => state.identityAuthentication.studentIdCard)
    const uploadStudentIdCardUrl = ''

    //部门名称
    const department = useSelector(state => state.identityAuthentication.department)
    //部门职位
    const post = useSelector(state => state.identityAuthentication.post)
    const activitesType = useSelector(state => state.identityAuthentication.activitesType)
    const activitesTypeUrl = ''
    const teamName = useSelector(state => state.identityAuthentication.teamName)
    const setMan = useCallback(() => {
        const newOptions = [...options]
        newOptions[0].checked = false
        newOptions[1].checked = true
        setOptions(newOptions)
    }, [])
    const setWoman = useCallback(() => {
        const newOptions = [...options]
        newOptions[0].checked = true
        newOptions[1].checked = false
        setOptions(newOptions)
    }, [])
    const setEnrollmentYear = useCallback(info => {
        let { detail: { value } } = info
        value = ~~value
        const action = setIdentityAuthentication(enrollmentYearList[value])
        dispatch(action)
    }, [])
    const setMajorProps = useCallback(info => {
        const action = setMajor(info)
        dispatch(action)
    }, [])
    const setDepartmentProps = useCallback(info => {
        const action = setDepartant(info)
        dispatch(action)
    }, [])
    const setPostProps = useCallback(info => {
        const action = setPost(info)
        dispatch(action)
    }, [])
    const setTeamNameProps = useCallback(info => {
        const action = setTeamName(info)
        dispatch(action)
    }, [])
    const submit = () => {

    }
    return (
        <View className="container">
            <View className="head">
                <View className="item">
                    <View class="title">性别</View>
                    <View className="info">
                        {
                            options.map(item => {
                                return <View key={item.name} className="radioWrapper" onClick={item.name === 'man' ? setMan : setWoman}>
                                    <View className="radio">
                                        {
                                            item.checked ?
                                            <View className="cicle"></View>
                                            :
                                            null
                                        }
                                    </View>
                                    <View className="text">{item.text}</View>
                                </View>
                            })
                        }
                    </View>
                </View>
                <View className="item">
                    <View className="title">入学年份</View>
                    <View className="info">
                        <Picker className="picker" mode='selector' range={enrollmentYearList}  onChange={setEnrollmentYear}>
                            <Text className='pickerText'>
                                {enrollmentYear}
                            </Text>
                            <AtIcon value='chevron-right' size='15' color='#999999'></AtIcon>
                        </Picker>
                    </View>
                </View>
                <View className="item">
                    <View class="title">大学专业</View>
                    <View className="info">
                        <AtInput
                            name='value'
                            type='text'
                            placeholder='专业全称'
                            value={major}
                            onChange={setMajorProps}
                        />
                    </View>
                </View>
                <View className="item">
                    <View class="title">学校</View>
                    <Navigator className="link" url={choolSchoolUrl}>
                        <View className="info">
                            <AtIcon value='chevron-right' size='15' color='#999999'></AtIcon>
                            <View className="text">{schoolName}</View>
                        </View>
                    </Navigator>
                </View>
                <View className="item">
                    <View class="title">学生证</View>
                    <Navigator className="link" url={uploadStudentIdCardUrl}>
                        <View className="info">
                            <AtIcon value='chevron-right' size='15' color='#999999'></AtIcon>
                            <View className="text">
                                {
                                    studentIdCard ?
                                    '已上传'
                                    :
                                    ''
                                }
                            </View>
                        </View>
                    </Navigator>
                </View>
                <View className="item">
                    <View class="title">团队名称</View>
                    <View className="info">
                        <AtInput
                            name='value'
                            type='text'
                            placeholder='请输入团队全称'
                            value={teamName}
                            onChange={setTeamName}
                        />
                    </View>
                </View>
                <View className="item">
                    <View class="title">所属部门</View>
                    <View className="info">
                        <AtInput
                            name='value'
                            type='text'
                            placeholder='请输入部门全称'
                            value={department}
                            onChange={setDepartmentProps}
                        />
                    </View>
                </View>
                <View className="item">
                    <View class="title">团队职位</View>
                    <View className="info">
                        <AtInput
                            name='value'
                            type='text'
                            placeholder='在社团/部门担任的职位'
                            value={post}
                            onChange={setPostProps}
                        />
                    </View>
                </View>
                <View className="item">
                    <View class="title">活动类型</View>
                    <Navigator className="link" url={activitesTypeUrl}>
                        <View className="info">
                            <AtIcon value='chevron-right' size='15' color='#999999'></AtIcon>
                            <View className="text">
                                { activitesType.join('、') }
                            </View>
                        </View>
                    </Navigator>
                </View>
            </View>
            <View className="btnWrapper">
                <View className="btn" onClick={submit}>立即认证</View>
            </View>
        </View>
    )
}

IdentityAuthentication.config = {
    navigationBarTitleText: '身份认证'
}

export default IdentityAuthentication