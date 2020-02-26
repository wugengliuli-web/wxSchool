import Taro, { useDidShow, useCallback, useState } from '@tarojs/taro'
import './index.scss'
import { AtInput } from "taro-ui"
import { View, Image, Picker, Text } from '@tarojs/components'
import { useDispatch, useSelector } from '@tarojs/redux'
import {
    getEvaluated,
    setEvaluated,
    changeInput
} from '../../actions/evaluate'
import { activitesColor } from '../../lib/type'
/**
 * 我的评价页面
 * @param {*} props 
 */

const Evaluate = props => {
    const dispatch = useDispatch()
    const alreadyEvaluated = useSelector(state => state.evaluate.alreadyEvaluated)
    const notEvaluated = useSelector(state => state.evaluate.notEvaluated)
    const id = 456
    const [current, setCurrent] = useState(0)
    const [select, setSelect] = useState([
        { text: '已评价', index: 0 },
        { text: '待评价', index: 1 }
    ])
    const changeSelect = useCallback(async index => {
        setCurrent(index)
    }, [])
    const submit = useCallback(async index => {
        Taro.showLoading({
            title: '提交中'
        })
        try {
            const action = setEvaluated(index, id, notEvaluated[index].id, alreadyEvaluated, notEvaluated)
            const res = await dispatch(action)
            if(res) {
                Taro.showToast({
                    title: '评论成功',
                    icon: 'success',
                    duration: 2000
                })

            } else {
                Taro.showToast({
                    title: '评论失败',
                    icon: 'none',
                    duration: 2000
                })
            }
        } catch(err) {
            Taro.showToast({
                title: '评论失败',
                icon: 'none',
                duration: 2000
            })
        }
        Taro.hideLoading()
    }, [alreadyEvaluated, notEvaluated])
    useDidShow(async () => {
        if(alreadyEvaluated.length === 0 && notEvaluated.length === 0) {
            Taro.showLoading({
                title: '查询中'
            })
            try {
                let action = getEvaluated(id)
                await dispatch(action)
            } catch(err) {
                Taro.showToast({
                    title: '查询失败',
                    icon: 'none',
                    duration: 2000
                })
            }
            Taro.hideLoading()
        }
    })
    const evaluate = useCallback((index, info) => {
        const action = changeInput(index, info)
        dispatch(action)
    }, [alreadyEvaluated, notEvaluated])
    return (
        <View className="container">
            <View className="head">
                {
                    select.map(item => {
                        return <View onClick={() => changeSelect(item.index)} key={item.index} className={item.index === current ? "item select" : "item"}>
                            {item.text}
                            {
                                item.index === current ?
                                <View className="line"></View>
                                :
                                null
                            }
                        </View>
                    })
                }
            </View>
            {
                current === 0 ?
                    <View className="containerWrapper">
                        {
                            alreadyEvaluated.map((item, index) => {
                                return (
                                    <View className="wrapper" key={item.id}>
                                        <Navigator url={`/pages/activites/index?id=${item.id}`}>
                                            <View className="content" key={item.id}>
                                                <View className="contentHead">
                                                    <View className="title">{item.title}</View>
                                                    <View className="tagContainer">
                                                        {
                                                            item.tag.map(key => {
                                                                return <View key={key} className={activitesColor.blue.includes(key) ? 'contentTag blue' : activitesColor.green.includes(key) ? 'contentTag green' : 'contentTag red'}>{key}</View>
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                                <View className="address">地址: {item.city.split(' ').filter(item => item !== '-').join('-')}</View>
                                                <View className="contentBottom">
                                                    <View className="timer">发布时间: {item.startTime}~{item.endTime}</View>
                                                    <View className="money">￥{item.money}</View>
                                                </View>
                                            </View>
                                        </Navigator>
                                        <View className="divider"></View>
                                        <View className="textWrapper">
                                            {item.evaluate}
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                    :
                    <View className="containerWrapper">
                        {
                            notEvaluated.map((item, index) => {
                                return (
                                    <View className="wrapper" key={item.id}>
                                        <Navigator url={`/pages/activites/index?id=${item.id}`}>
                                            <View className="content" key={item.id}>
                                                <View className="contentHead">
                                                    <View className="title">{item.title}</View>
                                                    <View className="tagContainer">
                                                        {
                                                            item.tag.map(key => {
                                                                return <View key={key} className={activitesColor.blue.includes(key) ? 'contentTag blue' : activitesColor.green.includes(key) ? 'contentTag green' : 'contentTag red'}>{key}</View>
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                                <View className="address">地址: {item.city.split(' ').filter(item => item !== '-').join('-')}</View>
                                                <View className="contentBottom">
                                                    <View className="timer">发布时间: {item.startTime}~{item.endTime}</View>
                                                    <View className="money">￥{item.money}</View>
                                                </View>
                                            </View>
                                        </Navigator>
                                        <View className="divider"></View>
                                        <View className="textWrapper">
                                            <AtInput
                                                name='value'
                                                type='text'
                                                placeholder='说点什么吧...'
                                                value={item.evaluate}
                                                onChange={info => evaluate(index, info)}
                                                onConfirm={info => submit(index)}
                                            />
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
            }
        </View>
    )
}

Evaluate.config = {
    navigationBarTitleText: '我的评价'
}

export default Evaluate