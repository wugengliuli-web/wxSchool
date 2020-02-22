import Taro, { Component, useState, render, useCallback  } from '@tarojs/taro'
import { View } from '@tarojs/components';
import { useDispatch, useSelector } from '@tarojs/redux'
import './index.scss'
const PersonalBasicifo = props =>{
      PersonalBasicifo.config = {
        navigationBarTitleText:'学生主页'
      }
    let [nickName,setnickName] = useState('Jack')
    // let imgSrc = useSelector(state => state.personalCenter.imgSrc)
    return (<View className="container">
              <View className="header">
                <View className="headPic">
                  <View className="pic">
                    <Image
                      className="photo" 
                    
                      src='' />
                    </View>
                </View>
                <View className="nickName">
                  <View className="name">{nickName}</View>

                  </View>
                <View className="motto">
                  <View className="spot"></View>
                  
                </View>
              </View>
            </View>)
}
export default PersonalBasicifo;