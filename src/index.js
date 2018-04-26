import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faBadgeCheck, faCheckCircle, faPen } from '@fortawesome/pro-light-svg-icons'
import { faPlusCircle } from '@fortawesome/pro-solid-svg-icons'
import './index.css'

import App from './App'
import store from './stores/RootStore'
// Pour le HMR
window.stores = window.stores || store

const usedIcons = [faCoffee, faBadgeCheck, faCheckCircle, faPlusCircle, faPen]

library.add(...usedIcons)

ReactDOM.render(
  <Provider {...window.stores}>
    <App />
  </Provider>,
  document.getElementById('app')
)

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('../public/serviceWorker.js')
// }
