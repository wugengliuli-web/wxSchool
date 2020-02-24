import { combineReducers } from 'redux'
import login from './login'
import home from './home'
import personalCenter from './personalCenter'
import personalBasicifo from './personalBasicifo'
import search from './search'
import sponsor from './sponsor'
import activites from './activites'
import identityAuthentication from './identityAuthentication'
export default combineReducers({
	login,
	home,
	personalCenter,
	personalBasicifo,
	search,
	sponsor,
	activites,
	identityAuthentication
})
