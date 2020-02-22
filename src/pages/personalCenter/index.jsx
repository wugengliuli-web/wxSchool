import Taro, { Component, useState, useCallback ,useDidShow } from '@tarojs/taro'
// import { useEffect, useLayoutEffect, useReducer, useContext, useRef, useCallback, useMemo } from '@tarojs/taro'
// import { connect } from '@tarojs/redux'
import './index.scss'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View, Button,Image ,Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import TabBar from '../../component/tabBar'
import { getNickname } from '../../actions/personalCenter'




const PersonalCenter = props => {
  PersonalCenter.config = {
    navigationBarTitleText:'易赞校园'
  }
  const items = [{item:'我的发布',id:1,url:'/pages/login/index'},{item:'我的评价',id:2,url:'/pages/personalCenter/index'},{item:'我的合作',id:3,url:'/pages/personalCenter/index'},{item:'我的消息',id:4,url:'/pages/personalCenter/index'}]
  const characters = [{item:'个性定制',id:6,url:'/pages/login/index'},{item:'常见问题',id:7,url:'/pages/login/index'}]
  let dispatch = useDispatch()
  let login = useSelector(state => state.login)
  
  let [nickName,setnickName] = useState('')
  let imgSrc = useSelector(state => state.personalCenter.imgSrc)
  let goodCount = useSelector(state =>state.personalCenter.goodCount)
  let emoneyCount =useSelector(state => state.personalCenter.emoneyCount)
  let estarCount = useSelector(state => state.personalCenter.estarCount)
  useDidShow(async ()=>{
    if(login.nickName == ''){
      const action = getNickname()
      dispatch(action)
    }
  })

  let edit = useCallback(
    ()=>{
      console.log("编辑")
    }
  )
    return (   
      <View className="container">
        <View className="header">
          <View className="headPic">
            <View className="pic">
              <Image
                className="photo" 
                
                src={imgSrc} />
            </View>
          </View>
          <View className="nickName">
            <View className="name">{nickName}</View>
            <View className="asure">
              <View className="checked">
                <View className="spot"></View>
                <Text className="hasChecked">已认证</Text>
                <AtIcon className="point" value='chevron-right' size='12' color='rgba(153,153,153,1)'></AtIcon>
              </View>
              <View className="checkedRealname">
              <View className="spot"></View>
                <Text className="hasChecked">已实名</Text>
                <AtIcon className="point" value='chevron-right' size='12' color='rgba(153,153,153,1)'></AtIcon>
              </View>
            </View>
          </View>
          <View className="editMsg">
            <View className="editBtn" onClick={edit}>编辑资料</View>
          </View>
        </View>
        <View className="wellReceivedbox">
          <View className="wellReceived">
            <View className="goodJob">
              <View>{goodCount}</View>
              <Text>获赞</Text>
            </View>
            <View className="eMoney">
              <View>{emoneyCount}</View>
              <Text>赞贝</Text>
            </View>
            <View className="eStar">
              <View>{estarCount}</View>
              <Text>收藏</Text>
            </View>
          </View>
        </View>
        <View className="mineContents">
              
              <View
                className = "contents"
                key = "p"
                >
                </View>
                
          { 
            items.map((item) =>{

              return (<navigator url={item.url}>
                    <View
                      className = "contents"
                      key = {String(item.id)}
                      >
                      <View className="spot"></View>
                      <Text className="text">{item.item}</Text>
                      <AtIcon className="point" value='chevron-right' size='20' color='rgba(153,153,153,1)'></AtIcon>
                   </View>
                   </navigator>
                )
            })
          }
        </View>
        <View className="character">
          {
            characters.map((item) =>{
              return (
                <navigator url={item.url}>
                  <View
                className = "characters"
                key = {String(item.id)}
              >
                <View className="spot"></View>
              <Text className="text">{item.item}</Text>
                <AtIcon className="point" value='chevron-right' size='20' color='rgba(153,153,153,1)'></AtIcon>
                </View>
                </navigator> 
              )
            })
          }
        </View>
        <View className="signOut">
          <Button className="signOutbtn"><span>退出当前账号</span></Button>
        </View>
 
        <TabBar></TabBar>
      </View>  
        
    )
}
export default PersonalCenter;