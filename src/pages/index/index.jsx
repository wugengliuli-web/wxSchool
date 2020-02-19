import Taro, { useState, useCallback } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtForm, AtButton, AtCountdown }  from 'taro-ui'
import './index.scss'


const Index = props => {
	let [telNum, setTelNum] = useState('')
	let [getVCode, setGetVCode] = useState('')
	let [vCode, setVCode] = useState(false)
	let clickGetVCode = useCallback(e => {
		if(!vCode) {
			setVCode(true)
		}
	}, [vCode])
	let timer = useCallback(e => {
		setVCode(false)
	}, [])
	let submit = useCallback(
		(e) => {
			console.log(e)
		},
		[telNum, getVCode],
	)
	return (
		<View className="container">
			<View className="formWrapper">
				<AtForm className="formWrapper" onSubmit={submit}>
					<View className="telNumWrapper">
						<AtInput
							className="telNumInput"
							name='value2'
							type='phone'
							placeholder='手机号一键登录注册'
							value={telNum}
							onChange={setTelNum}
							placeholderClass="inputPlaceholder"
						/>
						<View className="divier"></View>
					</View>
					<View className="VCodeWrapper">
						<AtInput
							className="VCodeInput"
							name='value2'
							type='text'
							placeholder='请输入验证码'
							value={getVCode}
							onChange={setGetVCode}
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
											format={{ hours: ':', minutes: ':', seconds: '秒' }}
											seconds={59}
											isShowMin={false}
											onTimeUp={timer}
										/>
									</View>
							}
						</View>
						
					</View>
					<View className="divier"></View>
					<AtButton className="btn" formType='submit'>登录</AtButton>
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
