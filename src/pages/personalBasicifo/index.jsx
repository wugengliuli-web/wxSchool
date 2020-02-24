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

              </View>
              <View className="checkedRealname">
              <View className="spot"></View>
                <Text className="hasChecked">已实名</Text>
                
              </View>
            </View>
                    </View>
                </View>

                <View className="motto">
                  <View className="spot"></View>
                  <Navigator 
                    hover-class="none"
                    url = "/pages/personalCenter/index" 
                    className="texts">
                    <Text className="text">
                    春天，马上就要来了，让我与你相遇的春天，就要来了，再也没有你的春天，就要来了。
                    </Text >
                  </Navigator>
                </View>
              </View>
              <View className="options">
                <Navigator className="basicIfo"></Navigator>
                <Navigator className="activitiesIfo"></Navigator>
              </View>
              <TabBar></TabBar>
            </View>)
}
export default PersonalBasicifo;