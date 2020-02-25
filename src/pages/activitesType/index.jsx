import Taro, { useCallback, useState, useDidShow } from '@tarojs/taro'
import './index.scss'
import { AtToast } from "taro-ui"
import { View, Image, Text } from '@tarojs/components'
import { activitesTypeList } from '../../lib/type'
import { useDispatch } from '@tarojs/redux'
import { setActivitesType } from '../../actions/activitesType'
const ActivitesType = props => {
    const dispatch = useDispatch()
    const [activitesTypeListState, setActivitesTypeListState] = useState([])
    const [checkNum, setCheckNum] = useState(0)

    useDidShow(() => {
        setActivitesTypeListState(activitesTypeList.map(item => ({name: item, isCheck: false})))
    })
    const checked = useCallback((index, isCheck) => {
        //如果是点击的选中状态 就取消选中
        if(isCheck) {
            setCheckNum(prve => prve - 1)
            setActivitesTypeListState(prve => prve.map((item, i) => {
                if(index === i) {
                    return {
                        name: item.name,
                        isCheck: false
                    }
                } else {
                    return item
                }
            }))
        } else {
            //如果是点击的未选中状态
            if(checkNum === 3) return
            setActivitesTypeListState(prve => prve.map((item, i) => {
                if(index === i) {
                    return {
                        name: item.name,
                        isCheck: true
                    }
                } else {
                    return item
                }
            }))
            setCheckNum(prve => prve + 1)
        }
    }, [activitesTypeListState, checkNum])

    const submit = useCallback(async () => {
        if(checkNum < 1) return
        let res = []
        activitesTypeListState.forEach(item => {
            if(item.isCheck) {
                res.push(item.name)
            }
        })
        const action = setActivitesType(res)
        await dispatch(action)
        Taro.redirectTo({
            url: '/pages/identityAuthentication/index'
        })
    }, [activitesTypeListState, checkNum])

    return (
        <View className="container">
            <View className="checkList">
                {
                    activitesTypeListState.map((item, index) => {
                        return (
                            <View key={item.name} onClick={() => checked(index, item.isCheck)} className={item.isCheck ? 'tag check' : 'tag'}>{item.name}</View>
                        )
                    })
                }
            </View>
            <View className="showNum">{checkNum}/3</View>
            <View className={checkNum === 0 ? "btn disable" : "btn"} onClick={submit}>确定</View>
        </View>
    )
}

ActivitesType.config = {
    navigationBarTitleText: '活动类型'
}

export default ActivitesType