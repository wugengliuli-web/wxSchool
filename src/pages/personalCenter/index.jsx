import Taro, { Component, useState, render } from '@tarojs/taro'
import { useEffect, useLayoutEffect, useReducer, useContext, useRef, useCallback, useMemo } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

import { sss } from '../../actions/personalCenter'

import './index.scss'

@connect(({ personalCenter }) => ({
    personalCenter
  }), (dispatch) => ({
    sss () {
      dispatch(add())
    }
  }))


function PersonalCenter(){
  config = {
    navigationBarTitleText:'易赞校园'
  }

  const [states,setstates] = useState(()=>{
    return {
      nickName:'jack'
    }
  })

    return (  
      <>
        <div>31233211</div>
      </>
    )
}