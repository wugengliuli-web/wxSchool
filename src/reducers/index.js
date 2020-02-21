import { combineReducers } from 'redux'
import login from './login'
import home from './home'
import search from './search'
export default combineReducers({
	login,
	home,
	search
})
