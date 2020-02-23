import { combineReducers } from 'redux'
import login from './login'
import home from './home'
import search from './search'
import sponsor from './sponsor'
import activites from './activites'
import personalCenter from './personalCenter'
import personalBasicifo from './personalBasicifo'
export default combineReducers({
	login,
	home,
	search,
	sponsor,
	activites,
	personalCenter,
	personalBasicifo
})
