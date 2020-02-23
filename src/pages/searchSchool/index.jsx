import Taro, { useCallback, useState, useDidShow } from '@tarojs/taro'
import './index.scss'
import { AtInput } from "taro-ui"
import { View, Image, Text, Picker } from '@tarojs/components'
import locate from '../../static/img/locate.png'
import search from '../../static/img/search.png'
import { useDispatch } from '@tarojs/redux'
import school from '../../lib/school'
import { setSchoolName } from '../../actions/searchSchool'
const SearchSchool = props => {
    const dispatch = useDispatch()
    const [val, setVal] = useState('')
    const [province, setProvince] = useState('不限')
    const provinceList = ['不限'].concat(school.map(item => item.province_name))
    const [city, setCity] = useState('不限')
    const [cityList, setCityList] = useState(['不限'])
    const [schoolListShow, setSchoolListShow] = useState([])
    const [schoolList, setSchoolList] = useState([])
    const setSchoolListWrapper = useCallback((province, city) => {
        let initSchoolList = []
        if(province === '不限' && city === '不限') {
            school.forEach(items => {
                items.cities.forEach(item => {
                    initSchoolList = initSchoolList.concat(item.universities)
                })
            })
        } else if(province !== '不限' && city === '不限') {
            school.forEach(items => {
                if(items.province_name === province) {
                    items.cities.forEach(item => {
                        initSchoolList = initSchoolList.concat(item.universities)
                    })
                }
            })
        } else {
            school.forEach(items => {
                if(items.province_name === province) {
                    items.cities.forEach(item => {
                        if(item.city_name === city) {
                            initSchoolList = initSchoolList.concat(item.universities)
                        }
                    })
                }
            })
        }
        setSchoolList(initSchoolList)
    }, [])
    useDidShow(() => {
        setSchoolListWrapper('不限', '不限')
    })
    const setValWrapper = info => {
        setVal(info)
        if(info === '') {
            setSchoolListShow([])
        } else {
            setSchoolListShow(schoolList.filter(item => item.includes(info)))
        }
    }
    const setProvinceWrapper = useCallback(info => {
        let { detail: { value } } = info
        console.log(info)
        value = ~~value
        setProvince(provinceList[value])
        if(value === 0) {
            setCityList(['不限'])
        } else {
            setCityList(['不限'].concat(school[value - 1].cities.map(item => item.city_name)))
        }
        setCity('不限')
        setSchoolListWrapper(provinceList[value], '不限')
        setValWrapper('')
    }, [])
    const setCityWrapper = useCallback(info => {
        let { detail: { value } } = info
        value = ~~value
        setCity(cityList[value])
        setSchoolListWrapper(province, cityList[value])
        setValWrapper('')
    }, [cityList])
    const link = useCallback(async schoolName => {
        const action = setSchoolName(schoolName)
        await dispatch(action)
        Taro.redirectTo({
            url: '/pages/identityAuthentication/index'
        })
    }, [])
    return (
        <View className="container">
            <View className="head">
                <View className="searchWrapper">
                    <AtInput
                        className="input"
                        name='value'
                        type='text'
                        placeholder='请输入大学名称'
                        value={val}
                        onChange={setValWrapper}
                    />
                    <View className="searchImgWrapper">
                        <Image src={search} className="img"></Image>
                    </View>
                </View>
                <View className="tagWrapper">
                    <Image src={locate} className="img"></Image>
                    <Picker mode='selector' range={provinceList} onChange={setProvinceWrapper}>
                        <View className='picker'>
                            {province}
                        </View>
                    </Picker>
                    <Picker mode='selector' range={cityList} onChange={setCityWrapper}>
                        <View className='picker'>
                            {city}
                        </View>
                    </Picker>
                </View>
                <View className="searchAns">
                    {
                        schoolListShow.map((item, index) => {
                            return (
                                index <= 100 ?
                                <View onClick={e => link(item)} className="item" key={index+'qq'}>
                                    {item}
                                </View>
                                :
                                null
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}

SearchSchool.config = {
    navigationBarTitleText: '选择学校'
}

export default SearchSchool