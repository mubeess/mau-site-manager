import {Button, Input, message, notification } from 'antd'
import React, { useState } from 'react'
import './login.css'
export default function Login(props) {
    const [userName,setUsername]=useState('')
    const [password,setPassword]=useState('')
    return (
        <div className='logInCont'>
            <div className='mainLog'>
                <div className='logDec'>
                <img src={require('../assets/mau.png')}/>
                <h1>MAU, Yola</h1>
                </div>
                <h2>Site Manager</h2>
                <h3>Login to your account</h3>
                <Input onChange={(txt)=>{
                    setUsername(txt.target.value)
                }} style={{
                    width:'90%',
                    marginLeft:'auto',
                    marginRight:'auto',
                    height:50
                }} type='email' placeholder='Email'/>
                <Input  onChange={(txt)=>{
                    setPassword(txt.target.value)
                }} style={{
                    width:'90%',
                    marginLeft:'auto',
                    marginRight:'auto',
                    height:50,
                    marginTop:20
                }} type='password' placeholder='Password'/>
                <p>Have an issue? Contact the admin for help!</p>
                <Button onClick={()=>{
                    props.setLoading(true)
                    const myObj={
                        username:userName,
                        password:password
                    }
                    fetch(`https://new-modibbo-adama.herokuapp.com/admin/login`,{
                        method:'POST',
                        headers:{
                          "Content-Type":'application/json'
                        },
                        body:JSON.stringify(myObj)
                      
                      })
                      .then(res=>{
                          res.json()
                          .then(data=>{
                            if (data.success) {
                                window.sessionStorage.setItem('mau-user',JSON.stringify(data.newUser))
                                message.success('Logged In Successfuly!')
                                props.setLoading(false)
                                props.setIslogged(data.newUser)
                                notification.open({
                                    message: 'Succesfully Logged In',
                                    description:'Logged as Super-Admin',
                                    onClick: () => {
                                      return null
                                    },
                                  });
                            }
                            if (!data.success) {
                                message.error('Invalid User Name Or Password')
                            }
                            props.setLoading(false)
                          
                          })
                      })
    
    
                }} style={{
                    width:'90%',
                    marginLeft:'auto',
                    marginRight:'auto',
                    height:50,
                    marginTop:20
                }} type='primary'>Log in</Button>
            </div>
            <div className='logStyle'></div>
        </div>
    )
}
