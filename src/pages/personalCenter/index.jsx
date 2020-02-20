import Taro, { Component, useState, render, useCallback  } from '@tarojs/taro'
// import { useEffect, useLayoutEffect, useReducer, useContext, useRef, useCallback, useMemo } from '@tarojs/taro'
// import { connect } from '@tarojs/redux'
import './index.scss'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View } from '@tarojs/components'

// @connect(({ personalCenter }) => ({
//     personalCenter
//   }), (dispatch) => ({
//     sss () {
//       dispatch(add())
//     }
//   }))


const PersonalCenter = props => {
  PersonalCenter.config = {
    navigationBarTitleText:'易赞校园'
  }
  let dispatch = useDispatch()
  let [states,setStates] = useState('')
  let state = useSelector(state => state)
  // const [states,setstates] = useState(()=>{
  //   return {
  //     nickName:'jack'
  //   }
  // })
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
              <img src={state.src}/>
            </View>
          </View>
          <View className="nickName">
            <View className="name">{nickname}</View>

          </View>
          <View className="editMsg">
            <View className="editBtn" onClick={edit}>编辑资料</View>
          </View>
        </View>
        <View className="wellReceivedbox">
          <View className="wellReceived">
            {

            }
          </View>
        </View>
      </View>  
        
    )
}
export default PersonalCenter;