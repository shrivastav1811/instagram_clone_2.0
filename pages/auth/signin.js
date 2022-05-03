import React from 'react'
import {getProviders, signIn} from "next-auth/react";
import Header from '../../components/Header';


// browser show contain..
const signin = ({providers}) => {
  return (
    <>
      <Header/>

     <div className='flex flex-col justify-center text-center  items-center min-h-screen py-2 -mt-50 px-14 '>
      <img src="https://links.papareact.com/ocw" className='w-80' alt="" />
      <p className='font-xs italic'>This is not a Real App, it is build for an educational purpose only</p>
     <div className='mt-40'>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className='p-3 bg-blue-500 rounded-lg text-white' onClick={() => signIn(provider.id, {callbackUrl:"/"})}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
      </div>
     </div>
      
      
    </>
  )
}


// server side rendering 
export async function getServerSideProps(){
    const providers = await getProviders();

    return{
        props: {
            providers
        }
    }
}

export default signin