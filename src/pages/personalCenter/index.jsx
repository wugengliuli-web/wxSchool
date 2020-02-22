import Taro, { Component, useState, render, useCallback  } from '@tarojs/taro'
// import { useEffect, useLayoutEffect, useReducer, useContext, useRef, useCallback, useMemo } from '@tarojs/taro'
// import { connect } from '@tarojs/redux'
import './index.scss'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View, Button,Image  } from '@tarojs/components'




const PersonalCenter = props => {
  PersonalCenter.config = {
    navigationBarTitleText:'易赞校园'
  }
  const items = ['我的发布','我的评价','我的合作','我的消息']
  const characters = ['个性定制','常见问题']
  let dispatch = useDispatch()
  let [nickName,setnickName] = useState('Jack')
  let imgSrc = useSelector(state => state.personalCenter.imgSrc)
  let goodCount = useSelector(state =>state.personalCenter.goodCount)
  let emoneyCount =useSelector(state => state.personalCenter.emoneyCount)
  let estarCount = useSelector(state => state.personalCenter.estarCount)
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

          </View>
          <View className="editMsg">
            <View className="editBtn" onClick={edit}>编辑资料</View>
          </View>
        </View>
        <View className="wellReceivedbox">
          <View className="wellReceived">
            <View className="goodJob">
              <View>{goodCount}</View>
              <span>获赞</span>
            </View>
            <View className="eMoney">
              <View>{emoneyCount}</View>
              <span>赞贝</span>
            </View>
            <View className="eStar">
              <View>{estarCount}</View>
              <span>收藏</span>
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
            items.map((item,index) =>{

              return <View
                className = "contents"
                key = {String(index)}
              >
                <View className="spot"></View>
                <span>{item}</span>
                </View>
            })
          }
        </View>
        <View className="character">
          {
            characters.map((character,index) =>{

              return <View
                className = "characters"
                key = {String(index)}
              >
                <View className="spot"></View>
                <span>{character}</span>
                </View>
            })
          }
        </View>
        <View className="signOut">
          <Button className="signOutbtn"><span>退出当前账号</span></Button>
        </View>
      </View>  
        
    )
}
export default PersonalCenter;