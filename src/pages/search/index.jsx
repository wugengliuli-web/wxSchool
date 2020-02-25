import Taro, { useState, useCallback, useRouter, useDidShow } from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import { AtInput, AtForm, AtIcon } from 'taro-ui'
import region from '../../lib/region'
import './index.scss'
import { getSearchContent, setCampusActivities, setMerchantSponsorship, setDreamCrowdFinancing } from '../../actions/search'
import Skeleton from 'taro-skeleton'
import locate from '../../static/img/locate.png'
import search from '../../static/img/search.png'
import { activitesColor } from '../../lib/type'
const Search = props => {
    const { params: { currentPage = 0 } } = useRouter()
    let searchPlaceHolder = useSelector(state => state.home.searchPlaceHolder)
    const [sortCurrent, setSortCurrent] = useState(0)  //排序方式
    const [loading, setLoading] = useState(false)
    const [position, setPosition] = useState(['不限'])
    const [ranges, setRanges] = useState([['不限']])
    const [searchContent, setSearchContent] = useState('')
    const [current, setCurrent] = useState(~~currentPage)
    const dispatch = useDispatch()
    const campusActivities = useSelector(state => state.search.campusActivities)  //校园活动 -> 0
    const merchantSponsorship = useSelector(state => state.search.merchantSponsorship)  //商家赞助 -> 1
    const dreamCrowdFinancing = useSelector(state => state.search.dreamCrowdFinancing)  //梦想众筹 -> 2
    const [searchOldTag, setSearchOldTag] = useState([])
    const options = [
        { title: '校园活动', current: 0 },
        { title: '商家赞助', current: 1 },
        { title: '梦想众筹', current: 2 }
    ]
    useDidShow(async () => {
        setRanges([['不限'], region.map(item => item.name)])
        try {
            let res = await Taro.getStorage({
                key: 'searchOldTag'
            })
            let { data } = res
            data = JSON.parse(data)
            if(Array.isArray(data)) {
                setSearchOldTag(data)
            }
        } catch(err) {
            
        }
    })
    const setPositionPicker = useCallback((info, index) => {
        let { target: { value: rangesIndex } } = info
        rangesIndex = ~~rangesIndex
        if(index === 0) {
            setPosition(['不限'])
        } else if(index === 1) {
            setPosition(['不限', ranges[1][rangesIndex]])
            setRanges([ranges[0], ranges[1], region[rangesIndex].city.map(item => item.name)])
        } else {
            setPosition(['不限', position[1], ranges[2][rangesIndex = ~~rangesIndex]])
        }
    }, [ranges])
    const setPositionProvince = useCallback(value => {
        let { target: { value: index } } = value
        index = ~~index
        setPosition(['不限', ranges[1][index]])
        setRanges([ranges[0], ranges[1], region[index].city.map(item => item.name)])
    }, [ranges])
    const setPositionCity = useCallback(value => {
        let { target: { value: index } } = value
        index = ~~index
        setPosition(['不限', position[1], ranges[2][index]])
    }, [ranges])
    const submit = useCallback(async info => {
        setLoading(true)
        setSortCurrent(0)
        let val
        if(typeof info === 'string') {
            val = info
        } else {
            val = searchContent
        }
        if(val === '') {
            if(searchPlaceHolder === '') return
            else {
                val = searchPlaceHolder
            }
        }
        let newSearchOldTag = [...searchOldTag]
        newSearchOldTag.unshift(val)
        if(newSearchOldTag.length > 10) newSearchOldTag.pop()
        newSearchOldTag = [...new Set(newSearchOldTag)]
        setSearchOldTag(newSearchOldTag)
        Taro.setStorage({
            key: 'searchOldTag',
            data: JSON.stringify(newSearchOldTag)
        })
        const action = getSearchContent(current, val, position)
        await dispatch(action)
        setLoading(false)
    }, [searchContent, current, position])
    const sortOptions = [{ 
        text: '综合', 
        key: '999',
        sortCurrent: 0,
        click: contentType => {
            if(sortCurrent !== 0) {
                setSortCurrent(0)
                if(contentType === 0) {
                    let newCampusActivities = [...campusActivities]
                    newCampusActivities.sort((a,b) => a.sort - b.sort)
                    const action = setCampusActivities(newCampusActivities)
                    dispatch(action)
                } else if(contentType === 1) {
                    let newMerchantSponsorship = [...merchantSponsorship]
                    newMerchantSponsorship.sort((a,b) => a.sort - b.sort)
                    const action = setMerchantSponsorship(newMerchantSponsorship)
                    dispatch(action)
                } else {
                    let newDreamCrowdFinancing = [...dreamCrowdFinancing]
                    newDreamCrowdFinancing.sort((a,b) => a.sort - b.sort)
                    const action = setDreamCrowdFinancing(newDreamCrowdFinancing)
                    dispatch(action)
                }
            }
        }
    }, { 
        text: '时间', 
        key: '888',
        sortCurrent: 1,
        click: contentType => {
            if(sortCurrent !== 1) {
                setSortCurrent(1)
                if(contentType === 0) {
                    let newCampusActivities = [...campusActivities]
                    newCampusActivities.sort((a,b) => {
                        let startTimeA = a.startTime
                        let startTimeB = b.startTime
                        startTimeA = startTimeA.split('-').map(item => ~~item)
                        startTimeB = startTimeB.split('-').map(item => ~~item)
                        for(let i=0;i<3;i++) {
                            if(startTimeA[i] === startTimeB[i]) continue
                            else return startTimeB[i] - startTimeA[i]
                        }
                    })
                    const action = setCampusActivities(newCampusActivities)
                    dispatch(action)
                } else if(contentType === 1) {
                    let newMerchantSponsorship = [...merchantSponsorship]
                    newMerchantSponsorship.sort((a,b) => {
                        let startTimeA = a.startTime
                        let startTimeB = b.startTime
                        startTimeA = startTimeA.split('-').map(item => ~~item)
                        startTimeB = startTimeB.split('-').map(item => ~~item)
                        for(let i=0;i<3;i++) {
                            if(startTimeA[i] === startTimeB[i]) continue
                            else return startTimeB[i] - startTimeA[i]
                        }
                    })
                    const action = setMerchantSponsorship(newMerchantSponsorship)
                    dispatch(action)
                } else {
                    let newDreamCrowdFinancing = [...dreamCrowdFinancing]
                    newDreamCrowdFinancing.sort((a,b) => {
                        let startTimeA = a.startTime
                        let startTimeB = b.startTime
                        startTimeA = startTimeA.split('-').map(item => ~~item)
                        startTimeB = startTimeB.split('-').map(item => ~~item)
                        for(let i=0;i<3;i++) {
                            if(startTimeA[i] === startTimeB[i]) continue
                            else return startTimeB[i] - startTimeA[i]
                        }
                    })
                    const action = setDreamCrowdFinancing(newDreamCrowdFinancing)
                    dispatch(action)
                }
            }
        }
    }, { 
        text: '好评', 
        key: '777',
        sortCurrent: 2,
        click: contentType => {
            if(sortCurrent !== 2) {
                setSortCurrent(2)
                if(contentType === 0) {
                    let newCampusActivities = [...campusActivities]
                    newCampusActivities.sort((a,b) => a.good - b.good)
                    const action = setCampusActivities(newCampusActivities)
                    dispatch(action)
                } else if(contentType === 1) {
                    let newMerchantSponsorship = [...merchantSponsorship]
                    newMerchantSponsorship.sort((a,b) => a.good - b.good)
                    const action = setMerchantSponsorship(newMerchantSponsorship)
                    dispatch(action)
                } else {
                    let newDreamCrowdFinancing = [...dreamCrowdFinancing]
                    newDreamCrowdFinancing.sort((a,b) => a.good - b.good)
                    const action = setDreamCrowdFinancing(newDreamCrowdFinancing)
                    dispatch(action)
                }
            }
        }
    }, { 
        text: '金额', 
        key: '666',
        sortCurrent: 3,
        click: contentType => {
            if(sortCurrent !== 3) {
                setSortCurrent(3)
                if(contentType === 0) {
                    let newCampusActivities = [...campusActivities]
                    newCampusActivities.sort((a,b) => a.money - b.money)
                    const action = setCampusActivities(newCampusActivities)
                    dispatch(action)
                } else if(contentType === 1) {
                    let newMerchantSponsorship = [...merchantSponsorship]
                    newMerchantSponsorship.sort((a,b) => a.money - b.money)
                    const action = setMerchantSponsorship(newMerchantSponsorship)
                    dispatch(action)
                } else {
                    let newDreamCrowdFinancing = [...dreamCrowdFinancing]
                    newDreamCrowdFinancing.sort((a,b) => a.money - b.money)
                    const action = setDreamCrowdFinancing(newDreamCrowdFinancing)
                    dispatch(action)
                }
            }
        }
    }, {
        text: '筛选', 
        key: '555',
        sortCurrent: 4,
        click: contentType => {
            
        }
    }]
    return (
        <View className="container">
            <View className="head">
                <View className="tagWrapper">
                    {
                        options.map((item, index) => {
                            return (
                                <View key={item.current} className={current === item.current ? 'tag now' : 'tag'} onClick={() => setCurrent(item.current)}>{item.title}</View>
                            )
                        })
                    }
                </View>
                <View className="searchWrapper">
                    <AtForm>
                        <AtInput
                            clear
                            type='text'
                            maxLength='25'
                            placeholder={searchPlaceHolder}
                            value={searchContent}
                            onChange={setSearchContent}
                            onConfirm={submit}
                            >
                            <Image onClick={e => submit(searchContent)} src={search} className="search"></Image>
                        </AtInput>
                    </AtForm>
                </View>
                <View className="positionWrapper">
                <Image src={locate} className="point"></Image>
                    {
                        position.map((item, index) => {
                            return (
                                <Picker onChange={info => setPositionPicker(info, index)} key={index + '456'} mode='selector' range={ranges[index]} >
                                    <View className="positionTag">{item}</View>
                                </Picker>
                            )
                        })
                    }
                    {
                        position.length === 3 ?
                        null
                        :
                        position.length === 2 ?
                        <Picker onChange={setPositionCity} key={index} mode='selector' range={ranges[2]} >
                            <View className="positionTag add">
                                <AtIcon className="searchIcon" value='add' size='12' color='#999999'></AtIcon>
                            </View>
                        </Picker>
                        :
                        <Picker onChange={setPositionProvince} key={index} mode='selector' range={ranges[1]} >
                            <View className="positionTag add">
                                <AtIcon className="searchIcon" value='add' size='12' color='#999999'></AtIcon>
                            </View>
                        </Picker>
                    }
                </View>
            </View>
            {
                loading ?
                <View className="loading">
                    <Skeleton animateName='elastic' rowWidth={['50%','70%','80%']} animate={true} row={3}></Skeleton>
                </View>
                :
                <View className="mainWrapper">
                    <View className="main">
                        {
                            current === 0 ?
                                campusActivities.length === 0 ?
                                <View className="searchOldWrapper">
                                    <View className="title">搜索历史</View>
                                    <View className="tagContainer">
                                        {
                                            searchOldTag.map((item, index) => {
                                                return (
                                                    <Text className="tag" onClick={e => submit(item)} key={index + '555'}>{item}</Text>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                                :
                                <View className="contentWrapper">
                                    <View className="sortWrapper">
                                        {
                                            sortOptions.map((item, index) => {
                                                return (
                                                    <View onClick={() => item.click(current)} className={index === sortCurrent? 'sortTag current' : "sortTag"} key={item.key}>{item.text}</View>
                                                )
                                            })
                                        }
                                    </View>
                                    <View className="mainContentWrapper">
                                        <View className="mainContentContainer">
                                            {
                                                campusActivities.map(item => {
                                                    return (
                                                        <navigator key={item.id} url={`/pages/activites/index?id=${item.id}`}>
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
                                                        </navigator>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                </View>
                                :
                                current === 1 ?
                                merchantSponsorship.length === 0 ?
                                <View className="searchOldWrapper">
                                    <View className="title">搜索历史</View>
                                    <View className="tagContainer">
                                        {
                                            searchOldTag.map((item, index) => {
                                                return (
                                                    <Text className="tag" onClick={e => submit(item)} key={index + '555'}>{item}</Text>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                                :
                                <View className="contentWrapper">
                                    <View className="sortWrapper">
                                        {
                                            sortOptions.map((item, index) => {
                                                return (
                                                    <View onClick={() => item.click(current)}  className={index === sortCurrent? 'sortTag current' : "sortTag"} key={item.key}>{item.text}</View>
                                                )
                                            })
                                        }
                                    </View>
                                    <View className="mainContentWrapper">
                                        <View className="mainContentContainer">
                                            {
                                                merchantSponsorship.map(item => {
                                                    return (
                                                        <navigator key={item.id} url={`/pages/activites/index?id=${item.id}`}>
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
                                                        </navigator>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                </View>
                                :
                                dreamCrowdFinancing.length === 0?
                                <View className="searchOldWrapper">
                                    <View className="title">搜索历史</View>
                                    <View className="tagContainer">
                                        {
                                            searchOldTag.map((item, index) => {
                                                return (
                                                    <Text className='tag' onClick={e => submit(item)} key={index + '555'}>{item}</Text>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                                :
                                <View className="contentWrapper">
                                    <View className="sortWrapper">
                                        {
                                            sortOptions.map((item, index) => {
                                                return (
                                                    <View onClick={() => item.click(current)} className={index === sortCurrent? 'sortTag current' : "sortTag"} key={item.key}>{item.text}</View>
                                                )
                                            })
                                        }
                                    </View>
                                    <View className="mainContentWrapper">
                                        <View className="mainContentContainer">
                                            {
                                                dreamCrowdFinancing.map(item => {
                                                    return (
                                                        <navigator key={item.id} url={`/pages/activites/index?id=${item.id}`}>
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
                                                        </navigator>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                </View>
                        }
                    </View>
                </View>
            }
        </View>
    )
}

Search.config = {
    navigationBarTitleText: ''
}

export default Search