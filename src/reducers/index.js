import { combineReducers } from 'redux'
import login from './login'
import home from './home'
<<<<<<< HEAD
import personalCenter from './personalCenter'
import personalBasicifo from './personalBasicifo'
export default combineReducers({
	login,
	home,
	personalCenter,
	personalBasicifo
=======
import search from './search'
import sponsor from './sponsor'
import activites from './activites'
export default combineReducers({
	login,
	home,
	search,
	sponsor,
	activites
>>>>>>> b071fbebd0e8149e5268984f8e1ccd38938eb0b3
})
