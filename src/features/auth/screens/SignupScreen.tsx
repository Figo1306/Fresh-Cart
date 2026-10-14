import React from 'react'
import SignupHero from '../components/signup/SignupHero'
import SignupForm from '../components/signup/SignupForm'

export default function SignupScreen() {
  return <>
  <div className='container lg:grid grid-cols-2 items-center gap-15 py-16 '>
    <SignupHero/>
    <SignupForm/>
  </div>
  </>
}
