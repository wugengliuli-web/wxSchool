import Taro, { Component, useState, render, useCallback  } from '@tarojs/taro'
import { View } from '@tarojs/components';
import { useDispatch, useSelector } from '@tarojs/redux'
import TabBar from '../../component/tabBar'
import { AtIcon,AtTextarea  } from 'taro-ui'
import './index.scss'
const PersonalBasicifo = props =>{
      PersonalBasicifo.config = {
        navigationBarTitleText:'学生主页'
      }
    let [nickName,setnickName] = useState('Jack')
    // let imgSrc = useSelector(state => state.personalCenter.imgSrc)
    return (<View className="container">
              <View className="header">
                <View className="headTop">
                  <View className="headPic">
                    <View className="pic">
                      <Image
                        className="photo" 
                        src='' />
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
                </View>

                <View className="motto">
                  <View className="spot"></View>
                  <View className="texts">
                  <AtTextarea  
                    value={this.state.value}
                    count={false}
                    maxLength={50}
                    placeholder='签名...'
                    className="text">
                    
                    </AtTextarea >
                  </View>

                  
                  
                </View>
              </View>
              <TabBar></TabBar>
            </View>)
}
export default PersonalBasicifo;