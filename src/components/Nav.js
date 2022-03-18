import {Avatar} from 'antd'
import React from 'react'

export default function Nav() {
    return (
        <div className='nav'>
        <h4>MAU site manager</h4>
        <Avatar
        style={{
          backgroundColor:'#f9f9f9',
          verticalAlign: 'middle',
          color:'black',
          marginRight:20
        }}
        size="large"
      >
          U
      </Avatar>
        </div>
    )
}
