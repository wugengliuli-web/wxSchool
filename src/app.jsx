import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/login/index',
      'pages/personalCenter/index',
      'pages/personalBasicifo/index',
      'pages/search/index',
      'pages/Sponsor/index',
      'pages/activites/index',
      'pages/addTeam/index',
      'pages/identityAuthentication/index',
      'pages/searchSchool/index',
      'pages/activitesType/index',
      'pages/searchTeam/index',
      'pages/uploadStudentIDCard/index',
      'pages/uploadIDCard/index',
      'pages/release/index',
      'pages/activityType/index',
      'pages/myCooperation/index',
      'pages/evaluate/index',
      'pages/myRelease/index',
      'pages/personInfo/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
