const regexUser = /^[a-zA-Z0-9]+$/; //aceptara numero y letras
const regex = /^\S+$/;
const form = document.getElementById('container_form')
import {signUp} from './data.js'

export function validateUserName(userName){
  return new Promise((resolve, reject) => {
    if(!regex.test(userName)){
      reject('No blank spaces')
    }
    if(!regexUser.test(userName)){
      reject('Only numbers and letters')
    }
    if(userName.length < 3 || userName.length > 10){
      reject('Only 3 to 10 characters')
    }
    resolve('username succeful!')
  })

}

export function validatePassword(password){
  return new Promise((resolve, reject) => {
    if(!regex.test(password)){
      reject('No blank spaces')
    }
    if(password.length < 3 || password.length > 11){
      reject('Only 3 to 10 characters')
    }
    resolve('password succeful!')
  })
}

export async function singUpPlayer(userName,password){
  try {
    const data ={
      'userName': userName,
      'password': password
    }
    const player = await signUp(data)
    window.localStorage.setItem('player',JSON.stringify(player))
    form.classList.add('not-active')
    window.localStorage.setItem('game','play')
  } catch (error) {
    console.log(error);
  }

}