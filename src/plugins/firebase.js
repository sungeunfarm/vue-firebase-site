import vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-database'
import firebaseConfig from '../../firebaseConfig'
import store from '../store/'

firebase.initializeApp(firebaseConfig)
// 사용자 정보 이벤트
firebase.auth().onAuthStateChanged((fu) => store.commit('setFireUser', fu))
vue.prototype.$firebase = firebase
