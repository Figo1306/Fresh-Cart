import React from 'react'
import LoginForm from '../components/login/LoginForm'
import LoginHero from '../components/login/LoginHero'

export default function LoginScreen() {
  return <>
  <div className='container grid lg:grid-cols-2 items-center gap-15 py-16 '>
    <LoginHero/>
    <LoginForm/>
  </div>
  </>

}

