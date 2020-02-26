import { combineReducers } from 'redux'
import login from './login'
import home from './home'
import personalCenter from './personalCenter'
import personalBasicifo from './personalBasicifo'
import search from './search'
import sponsor from './sponsor'
import activites from './activites'
import identityAuthentication from './identityAuthentication'
import searchTeam from './searchTeam'
import release from './release'
import myCooperation from './myCooperation'
import evaluate from './evaluate'
export default combineReducers({
	login,
	home,
	personalCenter,
	personalBasicifo,
	search,
	sponsor,
	activites,
	identityAuthentication,
	searchTeam,
	release,
	myCooperation,
	evaluate
})
