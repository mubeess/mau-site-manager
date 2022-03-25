import {Avatar, Button} from 'antd'
import React from 'react'

export default function Nav({loading,setOut}) {
  const user=JSON.parse(window.sessionStorage.getItem('mau-user'))
    return (
        <div className='nav'>
        <h4>MAU site manager</h4>
        <div style={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'
        }}>
        <Avatar
        style={{
          backgroundColor:'#f9f9f9',
          verticalAlign: 'middle',
          color:'black',
          marginRight:20
        }}
        size="large"
      >
          {user.firstName.split('')[0].toUpperCase()}
      </Avatar>
      <Button onClick={()=>{
        loading(true)
        setTimeout(()=>{
        setOut()
        loading(false)
        },1000)
      }} style={{
        marginTop:10,
        marginRight:20
      }} size='small' type='default'>Log Out--{'>'}</Button>
        </div>
        </div>
    )
}
