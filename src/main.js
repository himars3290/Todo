import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";

Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyA9FVmwnkz7_2X3kIvXh2-v1UFPHZnKNR0",
  authDomain: "todolist-d44fe.firebaseapp.com",
  databaseURL: "https://todolist-d44fe.firebaseio.com",
  projectId: "todolist-d44fe",
  storageBucket: "todolist-d44fe.appspot.com",
  messagingSenderId: "103896609756",
  appId: "1:103896609756:web:4327a4dc7dea398f3c1519",
  measurementId: "G-Y62CVG73YM"
}

firebase.initializeApp(config);

export const db = firebase.firestore();
new Vue({
  render: h => h(App)
}).$mount("#app");
