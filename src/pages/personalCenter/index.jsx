import Taro, { Component, useState, useCallback, useDidShow } from '@tarojs/taro'
import './index.scss'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View, Button, Image, Text, Navigator } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import TabBar from '../../component/tabBar'
import { getNickname } from '../../actions/personalCenter'
import certified from '../../static/img/icon/certified.png'
import real_named from '../..//static/img/icon/real_named.png'
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
	let dispatch = useDispatch()
	let login = useSelector(state => state.login)

	let [nickName, setnickName] = useState('')
	let imgSrc = useSelector(state => state.personalCenter.imgSrc)
	let goodCount = useSelector(state => state.personalCenter.goodCount)
	let emoneyCount = useSelector(state => state.personalCenter.emoneyCount)
	let estarCount = useSelector(state => state.personalCenter.estarCount)
	let [isChceked, setIscheckd] = useState('true')
	let [isNamed, setIsnamed] = useState('true')
	const id = 456
	useDidShow(async () => {
		if (login.nickName == '') {
			const action = getNickname()
			dispatch(action)
		}
	})

	let edit = useCallback(
		() => {
			
		},
		[id]
	)
	return (
		<View className="container">
			<View className="header">
				<View className="headPic">
					<View className="pic">
						<Navigator url={`/pages/personalBasicifo/index?id=${id}`}>
							<Image
								className="photo"
								src={''} 	
							/>
						</Navigator>
					</View>
				</View>
				<View className="nickName">
					<View className="name">{nickName}</View>
					<View className="asure">
						<View className="checked">
							<View className="spot">
								<Image className="icon" src={certified}></Image>
							</View>
							{
								!isNamed ?
									<Text className="hasChecked">未认证</Text>
									:
									<Text className="hasChecked">已认证</Text>
							}

							<AtIcon className="point" value='chevron-right' size='12' color='rgba(255,255,255,1);'></AtIcon>
						</View>
						<View className="checkedRealname">
							<View className="spot">
								<Image className='icon' src={real_named}></Image>
							</View>
							{
								!isChceked ?
									<Text className="hasChecked">未实名</Text>
									:
									<Text className="hasChecked">已实名</Text>
							}

							<AtIcon className="point" value='chevron-right' size='12' color='rgba(255,255,255,1);'></AtIcon>
						</View>
					</View>
				</View>
				<View className="editMsg">
					<Image className="editBtn" onClick={edit} src={setting}></Image>
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