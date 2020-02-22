import { combineReducers } from 'redux'
import login from './login'
import home from './home'
import search from './search'
import sponsor from './sponsor'
import activites from './activites'
export default combineReducers({
	login,
	home,
	search,
	sponsor,
	activites
})
