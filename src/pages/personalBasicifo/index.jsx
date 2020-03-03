import Taro, { useRouter, useState, useCallback, useDidShow } from '@tarojs/taro'
import { View, Navigator, Text, Image } from '@tarojs/components';
import { useDispatch, useSelector } from '@tarojs/redux'
import './index.scss'
import {
	getUserInfo,
	getIdentityInfo,
	getRecommend,
	getActiveGoing,
	getActiveEnd
} from '../../actions/personalBasicifo'
import certified from '../../static/img/certified.png'
import real_named from '../../static/img/real_named.png'
import uncertified from '../../static/img/uncertified.png'
import nonReal_named from '../../static/img/non-real_named.png'
import autograph from '../../static/img/autograph.png'
import unknown_user from '../../static/img/unknown_user.png'
import {
	activitesColor
} from '../../lib/type'
const PersonalBasicifo = props => {
	const lookConcatInfo = '/pages/index/index'
	const [select, setSelect] = useState([
        { text: '基本信息', index: 0 },
        { text: '活动信息', index: 1 }
	])
	const dispatch = useDispatch()
	const { params: { id, userType } } = useRouter()
	const [current, setCurrent] = useState(0)
	const [userInfo, setUserInfo] = useState({})  //用户信息
	const [activeGoing, setActiveGoing] = useState([])
	const [activeEnd, setActiveEnd] = useState([])
	const [hasAjax, setHasAjax] = useState(false)
	const [recommend, setRecommend] = useState([])
	const changeSelect = useCallback(async index => {
		setCurrent(index)
		if(index === 1 && !hasAjax) {
			Taro.showLoading({
				title: '查询中'
			})
			try {
				setHasAjax(true)
				let action = getActiveGoing(id, userType)
				let res = await dispatch(action)
				if(typeof res === 'string' && res === '未认证') {
					Taro.showToast({
						title: '账号未认证',
						duration: 2000,
						icon: 'none'
					})
				} else if(res === false) {
					Taro.showToast({
						title: '获取信息失败',
						duration: 2000,
						icon: 'none'
					})
				} else {
					let [publish, done] = res
					setActiveGoing(publish)
					setActiveEnd(done)
				}
				
			} catch(err) {
				Taro.showToast({
					title: '获取信息失败',
					duration: 2000,
					icon: 'none'
				})
			}
			Taro.hideLoading()
		}
	}, [hasAjax])
	useDidShow(async () => {
		if(Object.keys(userInfo).length === 0) {
			Taro.showLoading({
				title: '查询中'
			})
			let action = getUserInfo(id)
			let res = await dispatch(action)
			if(res) {
				setUserInfo(res)
				if(res.auth && res.auth.org) {
					//如果进行了身份认证 就去获取任职信息
					action = getIdentityInfo(id)
					res = await dispatch(action)
					setIdentityInfo(res)
					//去获取同校推荐
					action = getRecommend(res.associationSchoold)
					res = await dispatch(action)
					setRecommend(res)
				}
			} else {
				Taro.showToast({
					title: '获取信息失败',
					icon: 'none',
					duration: 2000
				})
			}
			
			Taro.hideLoading()
		}
	})

	return (
		<View className="container">
			<View className="head">
				<View className="info">
					<View className="userInfoWrapper">
						<Image mode="scaleToFill" className="img" src={userInfo.avatar}></Image>
						<View className="userInfo">
							<View className="name">{userInfo.nickname}</View>
							<View className="authenticationWrapper">
								<View className="identityAuthentication">
									<Image mode="scaleToFill" className="identityAuthenticationImg" src={userInfo.auth && userInfo.auth.org ? certified : uncertified}></Image>
									<Text className="text">
									{
										userInfo.auth && userInfo.auth.org ?
										'已认证'
										:
										'未认证'
									}
									</Text>
								</View>
								<View className="realNameAuthentication">
									<Image mode="scaleToFill" className="realNameAuthenticationImg" src={userInfo.auth && userInfo.auth.realname ? real_named : nonReal_named}></Image>
									<Text className="text">
									{
										userInfo.auth && userInfo.auth.realname ?
										'已实名'
										:
										'未实名'
									}
									</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
				<View className="signWrapper">
					<View className="imgWrapper">
						<Image mode="scaleToFill" src={autograph} className="img"></Image>
					</View>
					<View className="sign">
						{userInfo.signature}
					</View>
				</View>
			</View>
			<View className="selectWrapper">
				{
					select.map(item => {
						return <View onClick={() => changeSelect(item.index)} key={item.index} className={item.index === current ? "item select" : "item"}>
							{item.text}
							{
								item.index === current ?
								<View className="line"></View>
								:
								null
							}
						</View>
					})
				}
			</View>
			{
				current === 0 ?
					userInfo.auth && userInfo.auth.org ?
						<View>
							<View className="identityInfoWrapper">
								<View className="title">任职信息</View>
								<View className="content">
									<View className="left">
										<Image className="img" src={userInfo.auth && userInfo.auth.org ? '' : ''} mode="scaleToFill"></Image>
									</View>
									<View className="right">
										<View className="schoolName">{userInfo.auth && userInfo.auth.org ? '' : ''}</View>
										<View className="position">{userInfo.auth && userInfo.auth.org ? '' : ''}</View>
									</View>
									<View className="size">{userInfo.auth && userInfo.auth.org ? '' : ''}</View>
								</View>
								<View className="school">所在学校：{userInfo.auth && userInfo.auth.org ? '' : ''}</View>
								<View className="type">活动类型：{userInfo.auth && userInfo.auth.org ? '' : ''}</View>
							</View>
							<View className="concatInfoWrapper">
								<View className="link">联系方式</View>
								<Navigator url={lookConcatInfo}>
									<View className="look">立即查看</View>
								</Navigator>
							</View>
							<View className="RecommendWrapper">
								<View className="RecommendHead">
									<View className="link">同校推荐</View>
									<Navigator url={lookConcatInfo}>
										<View className="look">更多</View>
									</Navigator>
								</View>
								<View className="RecommendContent">
									{
										recommend.map(item => {
											return <Navigator key={item.id} url={`/pages/personalBasicifo/index?id=${item.id}`}>
												<View className="RecommendidentityInfoWrapper">
													<View className="Recommendcontent">
														<View className="Recommendleft">
															<Image className="Recommendimg" src={item.associationLogo} mode="scaleToFill"></Image>
														</View>
														<View className="Recommendright">
															<View className="RecommendschoolName">{item.associationName}</View>
															<View className="Recommendposition">{item.associationPosition}</View>
														</View>
														<View className="Recommendsize">{item.associationSize}</View>
													</View>
												</View>
											</Navigator>
										})
									}
								</View>
							</View>
						</View>
						:
						<View className="contentWrapper">
							<View className="imgWrapper">
								<Image src={unknown_user} className="notIdentityAuthentication"></Image>
							</View>
							{/* <Navigator url={lookConcatInfo}>
								<View className="text">用户身份未认证</View>
							</Navigator> */}
							<View className="text">用户身份未认证</View>
						</View>
					:
					<View className="activeWrapper">
						<View className="goingWrapper">
							<View className="title">进行中</View>
							<View className="contentWrapper">
								{
									activeGoing.map(item => {
										return <Navigator key={item.id} url={`/pages/activites/index?id=${item.id}`}>
											<View className="content" key={item.id}>
												<View className="contentHead">
													<View className="title">{userType === '学生认证' ? item.name : item.theme}</View>
													<View className="tagContainer">
														{/* {
															item.tag.map(key => {
																return <View key={key} className={activitesColor.blue.includes(key) ? 'contentTag blue' : activitesColor.green.includes(key) ? 'contentTag green' : 'contentTag red'}>{key}</View>
															})
														} */}
														<View  className={activitesColor.blue.includes(item.type) ? 'contentTag blue' : activitesColor.green.includes(item.type) ? 'contentTag green' : 'contentTag red'}>{item.type}</View>
													</View>
												</View>
												<View className="address">地址: {item.address}</View>
												<View className="contentBottom">
													<View className="timer">发布时间: {item.publishDate}~{userType === '学生认证' ? item.deadline : item.availableDate}</View>
													<View className="money">￥{userType === '学生认证' ? item.budget : item.fee}</View>
												</View>
											</View>
										</Navigator>
									})
								}
							</View>
						</View>
						<View className="goingWrapper">
							<View className="title">已结束</View>
							<View className="contentWrapper">
								{
									activeEnd.map(item => {
										return <View className="wrapper" key={item.id}>
												<Navigator url={`/pages/activites/index?id=${item.id}`}>
													<View className="content" key={item.id}>
														<View className="contentHead">
															<View className="title">{userType === '学生认证' ? item.name : item.theme}</View>
															<View className="tagContainer">
																{/* {
																	item.tag.map(key => {
																		return <View key={key} className={activitesColor.blue.includes(key) ? 'contentTag blue' : activitesColor.green.includes(key) ? 'contentTag green' : 'contentTag red'}>{key}</View>
																	})
																} */}
																<View  className={activitesColor.blue.includes(item.type) ? 'contentTag blue' : activitesColor.green.includes(item.type) ? 'contentTag green' : 'contentTag red'}>{item.type}</View>
															</View>
														</View>
														<View className="address">地址: {item.address}</View>
														<View className="contentBottom">
															<View className="timer">发布时间: {item.publishDate}~{userType === '学生认证' ? item.deadline : item.availableDate}</View>
															<View className="money">￥{userType === '学生认证' ? item.budget : item.fee}</View>
														</View>
													</View>
												</Navigator>
												<View className="divider"></View>
												<View className="textWrapper">
													评价：{item.evaluate}
												</View>
											</View>
									})
								}
							</View>
						</View>
					</View>
			}
		</View>
    )
}

PersonalBasicifo.config = {
	navigationBarTitleText: '学生主页'
}
export default PersonalBasicifo;