import Taro, { useState, useCallback, useDidShow } from '@tarojs/taro'
import './index.scss'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View, Button, Image, Text, Navigator } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import TabBar from '../../component/tabBar'
// import { getNickname } from '../../actions/personalCenter'
import certified from '../../static/img/icon/certified.png'
import uncertified from '../../static/img/uncertified.png'
import real_named from '../../static/img/icon/real_named.png'
import nonReal_named from '../../static/img/non-real_named.png'
import setting from '../../static/img/icon/setting.png'
import activity from '../../static/img/icon/activity.png'
import application from '../../static/img/icon/application.png'
import evaluation from '../../static/img/icon/evaluation.png'
import message from '../../static/img/icon/message.png'
import personalization from '../../static/img/icon/personalization.png'
import question from '../../static/img/icon/question.png'
const PersonalCenter = props => {
	const items = [
		{ item: '我的发布', id: 1, url: '/pages/myRelease/index', src: activity }, 
		{ item: '我的评价', id: 2, url: '/pages/evaluate/index', src: application }, 
		{ item: '我的合作', id: 3, url: '/pages/myCooperation/index', src: evaluation }, 
		{ item: '我的消息', id: 4, url: '/pages/personalCenter/index', src: message }
	]
	const characters = [
		{ item: '个性定制', id: 6, url: '/pages/login/index', src: personalization }, 
		{ item: '常见问题', id: 7, url: '/pages/login/index', src: question }
	]

	let nickName= useSelector(state => state.personalCenter.nickName)
	let avatar = useSelector(state => state.personalCenter.avatar)
	let goodCount = useSelector(state => state.personalCenter.goodCount)
	let emoneyCount = useSelector(state => state.personalCenter.emoneyCount)
	let estarCount = useSelector(state => state.personalCenter.estarCount)
	let isChceked = useSelector(state => state.personalCenter.isChceked)
	let isNamed = useSelector(state => state.personalCenter.isNamed)
	let userId = useSelector(state => state.personalCenter.userId)

	let edit = useCallback(
		() => {
			
		},
		[userId]
	)
	return (
		<View className="container">
			<View className="header">
				<View className="headPic">
					<View className="pic">
						<Navigator url={`/pages/personalBasicifo/index?id=${userId}`}>
							<Image
								className="photo"
								src={avatar} 	
							/>
						</Navigator>
					</View>
				</View>
				<View className="nickName">
					<View className="name">{nickName}</View>
					<View className="asure">
						{
							isChceked ?
							<View className="checked">
								<View className="spot">
									<Image className="icon" src={certified}></Image>
								</View>
								<Text className="hasChecked">已认证</Text>
								{/* <AtIcon className="point" value='chevron-right' size='12' color='rgba(255,255,255,1);'></AtIcon> */}
							</View>
							:
							<View className="checked">
								<View className="spot">
									<Image className="icon" src={uncertified}></Image>
								</View>
								<Text className="hasChecked">未认证</Text>
								{/* <AtIcon className="point" value='chevron-right' size='12' color='rgba(255,255,255,1);'></AtIcon> */}
							</View>
						}
						{
							isNamed ?
							<View className="checkedRealname">
								<View className="spot">
									<Image className='icon' src={real_named}></Image>
								</View>
								<Text className="hasChecked">已实名</Text>

								{/* <AtIcon className="point" value='chevron-right' size='12' color='rgba(255,255,255,1);'></AtIcon> */}
							</View>
							:
							<View className="checkedRealname">
								<View className="spot">
									<Image className='icon' src={nonReal_named}></Image>
								</View>
								<Text className="hasChecked">未实名</Text>

								{/* <AtIcon className="point" value='chevron-right' size='12' color='rgba(255,255,255,1);'></AtIcon> */}
							</View>
						}
					</View>
				</View>
				<View className="editMsg">
					<Navigator url="/pages/personInfo/index">
						<Image className="editBtn" onClick={edit} src={setting}></Image>
					</Navigator>
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
					className="contents"
					key="p"
				>
				</View>

				{
					items.map((item) => {

						return (
							<Navigator url={item.url} key={String(item.id)}>
								<View className="contents">
									<View className="spot">
										<Image src={item.src} className='icon'></Image>
									</View>
									<Text className="text">{item.item}</Text>
									<AtIcon className="point" value='chevron-right' size='20' color='rgba(153,153,153,1)'></AtIcon>
								</View>
							</Navigator>
						)
					})
				}
			</View>
			<View className="character">
				{
					characters.map((item) => {
						return (
							<Navigator url={item.url} key={String(item.id)}>
								<View className="characters">
									<View className="spot">
										<Image src={item.src} className="icon"></Image>
									</View>
									<Text className="text">{item.item}</Text>
									<AtIcon className="point" value='chevron-right' size='20' color='rgba(153,153,153,1)'></AtIcon>
								</View>
							</Navigator>
						)
					})
				}
			</View>
			<View className="signOut">
				<Button className="signOutbtn">退出当前账号</Button>
			</View>

			<TabBar initIndex={2}></TabBar>
		</View>

	)
}

PersonalCenter.config = {
	navigationBarTitleText: '个人中心'
}
export default PersonalCenter;