import Taro, { Component, useState, render, useCallback } from '@tarojs/taro'
// import { useEffect, useLayoutEffect, useReducer, useContext, useRef, useCallback, useMemo } from '@tarojs/taro'
// import { connect } from '@tarojs/redux'
import './index.scss'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View, Button, Image, Text } from '@tarojs/components'




const PersonalCenter = props => {
	const items = ['我的发布', '我的评价', '我的合作', '我的消息']
	const characters = ['个性定制', '常见问题']
	let dispatch = useDispatch()
	let [nickName, setnickName] = useState('Jack')
	let imgSrc = useSelector(state => state.personalCenter.imgSrc)
	let goodCount = useSelector(state => state.personalCenter.goodCount)
	let emoneyCount = useSelector(state => state.personalCenter.emoneyCount)
	let estarCount = useSelector(state => state.personalCenter.estarCount)
	let edit = useCallback(
		() => {
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
						<Text className="text">获赞</Text>
					</View>
					<View className="eMoney">
						<View>{emoneyCount}</View>
						<Text className="text">赞贝</Text>
					</View>
					<View className="eStar">
						<View>{estarCount}</View>
						<Text className="text">收藏</Text>
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
					items.map((item, index) => {

						return <View
							className="contents"
							key={String(index)}
						>
							<View className="spot"></View>
							<Text className="text">{item}</Text>
						</View>
					})
				}
			</View>
			<View className="character">
				{
					characters.map((character, index) => {

						return <View
							className="characters"
							key={String(index)}
						>
							<View className="spot"></View>
							<Text className="text">{character}</Text>
						</View>
					})
				}
			</View>
			<View className="signOut">
				<Button className="signOutbtn"><Text>退出当前账号</Text></Button>
			</View>
		</View>

	)
}

PersonalCenter.config = {
	navigationBarTitleText: '易赞校园'
}
export default PersonalCenter;