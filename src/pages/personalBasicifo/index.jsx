import Taro, { Component, useState, render, useCallback  } from '@tarojs/taro'
import { View } from '@tarojs/components';
import { useDispatch, useSelector } from '@tarojs/redux'
import TabBar from '../../component/tabBar'
import { AtTabs, AtTabsPane  } from 'taro-ui'
import './index.scss'
const PersonalBasicifo = props =>{
      PersonalBasicifo.config = {
        navigationBarTitleText:'学生主页'
      }


    let [currents,setCurrents] = useState(0)
    let [nickName,setnickName] = useState('Jack')
    const tabList = [{ title: '基本信息' }, { title: '活动信息' }]
    // let imgSrc = useSelector(state => state.personalCenter.imgSrc)
    let checkNow = useCallback(
      () =>{
        console.log(123)
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
                <AtTabs className="options" current={currents} tabList={tabList} onClick={(value) =>{
                  setCurrents(()=>{
                    return currents = value
                  })
                }}>
                  <AtTabsPane current={0} index={0} className = "basicIfo">
                    <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;border-bottom = 0px' 
                    
                    className = "basicIfo">
                      <View className="position">
                        <View className="title"></View>
                        <View className="department"></View>
                        <View className="detailedInformation"></View>
                      </View>
                      <View className="contact">
                        <Text>联系方式</Text>
                        <Text 
                        onClick={checkNow}
                        >立即查看</Text>
                      </View>
                      <View className="peerRecommendation">
                        <Text>同校推荐</Text>
                          <Navigator 
                          // url={learnPeerrecommendation}
                          >更多</Navigator>
                      </View>
                    </View>
                  </AtTabsPane>
                  <AtTabsPane current={1} index={1}>
                    <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'
                    className ="activities"
                    >
                      asdfasd
                    </View>
                  </AtTabsPane>
                </AtTabs>
              </View>
              <TabBar></TabBar>
            </View>)
}
export default PersonalBasicifo;