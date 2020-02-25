import Taro, { Component, useState, render, useCallback } from '@tarojs/taro'
import { View,Navigator,Text } from '@tarojs/components';
import { useDispatch, useSelector } from '@tarojs/redux'
import TabBar from '../../component/tabBar'
import { AtTabs, AtTabsPane,AtAvatar } from 'taro-ui'
import './index.scss'
const PersonalBasicifo = props =>{
      PersonalBasicifo.config = {
        navigationBarTitleText:'学生主页'
      }

    // let items = useSelector(state => state.personalCenter)
    // let [currents,setCurrensts] = useState(0)
    let [nickName,setnickName] = useState('Jack')
    let [activeclassName,setactiveclassName] =useState('basicIfo_active')
    let [nomalclassName,setnomalclassName] = useState('activitiesIfo')
    // let imgSrc = useSelector(state => state.personalCenter.imgSrc)
    let checkNow = useCallback(
      () =>{
        console.log(123)
      }
    )
    let changeActive = useCallback(
      () => {
        console.log(111)
      }
    )
    // let learnPeerrecommendation = useSelector(state => state.searchSchool.url)
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
              <View className="content">      
                <View className="options">
                  <View className={activeclassName} onClick={changeActive}>
                    <Text className="text">基本信息</Text>
                    <View className="spot"></View>
                  </View>
                  <View className={nomalclassName}>
                    <Text className="text">活动信息</Text>
                    <View className="spot"></View>
                  </View>
                </View>
                <View className="contentBody">
                  <View className="basicContent">
                    <View className="positions">
                      <View className="head">
                        <Text className = "text">任职信息</Text>
                      </View>
                      <Navigator className="department">
                        <AtAvatar className="pic"></AtAvatar >
                          <View className="amountMsg">
                            <View className="teamName"></View>
                            <View className="leaderPosition"></View>
                            <View className="scale">
                              <Text>scaleCounts</Text>
                            </View>
                          </View>
                      </Navigator>
                      <View className="msg">
                        <Text>asd</Text>
                      </View>
                    </View>
                    <Navigator className="connection" url="/pages/personalCenter/index">
                      <Text>联系方式</Text>
                      <Text>立即查看</Text>
                    </Navigator>
                    <View className="recommendation">
                      <Text>同校推荐</Text>
                      <Navigator url="/pages/personalCenter/index">更多</Navigator>
                      {/* <View>
                        {
                          items.map((item)=>{
                            return (
                              <Navigator>
                                <AtAvatar ></AtAvatar >
                                <View>
                                  <View className="teamName"></View>
                                  <View className="leaderPosition"></View>
                                  <View className="scale">
                                    <Text>{scaleCounts}</Text>
                                  </View>
                                </View>
                              </Navigator>
                            )
                          })
                        }
                      </View> */}
                    </View>
                  </View>
                  <View className="activitiesContent"></View>
                </View>
              </View>
              <TabBar></TabBar>
            </View>)
}
export default PersonalBasicifo;