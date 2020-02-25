import Taro, { useCallback, useState } from '@tarojs/taro'
import './index.scss'
import { AtInput } from "taro-ui"
import { View, Image, Navigator } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import new_organization from '../../static/img/new_organization.png'
import search from '../../static/img/search.png'
import {
    getSearchTeam,
    setTeamName
} from '../../actions/searchTeam'
const SearchTeam = props => {
    const dispatch = useDispatch()
    const [val, setVal] = useState('')
    const searchAns = useSelector(state => state.searchTeam.searchAns)
    const setValWrapper = useCallback(info => {
        setVal(info)
    }, [])
    const submit = useCallback(async () => {
        if(val === '') return
        Taro.showLoading({
            title: '查询中'
        })
        const action = getSearchTeam(val)
        await dispatch(action)
        Taro.hideLoading()
    }, [val])
    const setTeanName = useCallback(async name => {
        const action = setTeamName(name)
        await dispatch(action)
        Taro.redirectTo({
            url: '/pages/identityAuthentication/index'
        })
    }, [])
    return (
        <View className="container">
            <View className="head">
                <View className="left">
                    <AtInput
                        name='value1'
                        type='text'
                        placeholder='请输入社团名称'
                        value={val}
                        onChange={setValWrapper}
                    />
                    <Image onClick={submit} className="icon" src={search}></Image>
                </View>
                <Navigator url='/pages/addTeam/index'>
                    <View className="right">
                        <Image src={new_organization} className="img"></Image>
                    </View>
                </Navigator>
            </View>
            <View className="ans">
                {
                    searchAns.map((item, index) => {
                        return (
                            <View onClick={() => setTeanName(item)} className="item" key={index + '5'}>{item}</View>
                        )
                    })
                }
            </View>
        </View>
    )
}

SearchTeam.config = {
    navigationBarTitleText: '社团选择'
}

export default SearchTeam