import Taro, { useState, useCallback } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtForm, AtButton, AtCountdown }  from 'taro-ui'
import './index.scss'
import { login } from '../../actions/login'
import { useDispatch } from '@tarojs/redux'
import LOGO from '../../static/img/LOGO.png'
const Index = props => {
	const dispatch = useDispatch()
	const [disabled, setDisabled] = useState(true)
	let [telNum, setTelNum] = useState('')
	let [getVCode, setGetVCode] = useState('')
	let [vCode, setVCode] = useState(false)
	let clickGetVCode = useCallback(e => {
		if(!vCode) {
			setVCode(true)
		}
	}, [vCode])
	const setTelNumWrapper = useCallback(info => {
		setTelNum(info)
		if(info !=='' && getVCode !== '') {
			setDisabled(false)
		} else {
			setDisabled(true)
		}
	}, [getVCode])

	const setGetVCodeWrapper = useCallback(info => {
		setGetVCode(info)
		if(info !=='' && telNum !== '') {
			setDisabled(false)
		} else {
			setDisabled(true)
		}
	}, [telNum])
	let timer = useCallback(e => {
		setVCode(false)
	}, [])
	let submit = useCallback(
		async e => {
			try {
				const action = login(telNum, getVCode)
				const res = await dispatch(action)
				if(res) {
					await Taro.showToast({
						title: '登录成功',
						icon: 'success',
						duration: 2000
					})
					setTimeout(() => {
						Taro.redirectTo({
							url: '/pages/personalCenter/index'
						})
					}, 2000)
				} else {
					Taro.showToast({
						title: '登录失败',
						icon: 'none',
						duration: 2000
					})
				}
			} catch(err) {
				Taro.showToast({
					title: '登录失败',
					icon: 'none',
					duration: 2000
				})
			}
		},
		[telNum, getVCode],
	)
	return (
		<View className="container">
			<View className="logoWrapper">
				<Image src={LOGO} className="img"></Image>
			</View>
			<View className="formWrapper">
				<AtForm className="formWrapper" onSubmit={submit}>
					<View className="telNumWrapper">
						<AtInput
							className={telNum ? "telNumInput" : "telNumInput noinput"}
							name='value2'
							type='phone'
							placeholder='手机号一键登录注册'
							value={telNum}
							onChange={setTelNumWrapper}
							placeholderClass="inputPlaceholder"
						/>
						<View className="divier"></View>
					</View>
					<View className="VCodeWrapper">
						<AtInput
							className={getVCode ? "VCodeInput" : "VCodeInput noinput"}
							name='value2'
							type='text'
							placeholder='请输入验证码'
							value={getVCode}
							onChange={setGetVCodeWrapper}
							placeholderClass="inputPlaceholder"
						/>
						<View className="sendWrapper">
							<View className="division"></View>
							{
								!vCode ?
									<View className="getVCode" onClick={clickGetVCode}>获取验证码</View>
									:
									<View className="countDownWrapper">
										<AtCountdown
											className="cownDown"
											isShowHour={false}
											format={{ hours: ':', minutes: ':', seconds: 's后再次获取' }}
											seconds={59}
											isShowMin={false}
											onTimeUp={timer}
										/>
									</View>
							}
						</View>
						
					</View>
					<View className="divier"></View>
					<AtButton className="btn" formType='submit' disabled={disabled}>登录</AtButton>
				</AtForm>
				<View className="wxLoginWrapper">
					<View className="wxLogin">
						<View className="wxLoginImgWrapper"></View>
					</View>
					<View className="wxLoginText">微信注册</View>
				</View>
			</View>
		</View>
	)

}

Index.config = {
	navigationBarTitleText: '登录'
}

export default Index
