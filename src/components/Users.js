import { DeleteOutlined,ReloadOutlined } from '@ant-design/icons'
import {Input} from 'antd'
import React, { useEffect, useState } from 'react'
import './user.css'
export default function Users() {
    const [allUsers,setAll]=useState([])
    

    const loadData=()=>{
        fetch('https://new-modibbo-adama.herokuapp.com/admin/get-all-staff')
        .then(res => {
            res.json()
                .then(data => {
                    setAll(data.message)
                    console.log(data)
                })
        }).catch(err=>{
            
        })
    }

    useEffect(()=>{
    loadData()
    },[])
    const user=JSON.parse(window.sessionStorage.getItem('mau-user'))
    const filtere=allUsers.filter(usr=>usr.username!=user.username)
    return (
        <div className='usersCont'>
            {
                allUsers.map(user=>(
                    <div key={user.firstName} className='userCard'>
                    <div className='imgDet'>
                   <img src={user.image} alt='user'/>
                    </div>
                    <div className='txtDet'>
                      <Input disabled value={"First Name: "+user.firstName} />
                      <Input disabled value={"Last Name: "+user.lastName} />
                      <Input disabled value={"Phone: "+user.phone} />
                      <Input disabled value={"Email: "+user.username} />
                      <div style={{
                          padding:10,
                          width:'70%',
                          display:'flex',
                          flexDirection:'row',
                          justifyContent:'space-around'
                                                }}>
                      <DeleteOutlined style={{
                          fontSize:20,
                          color:'red',
                          cursor:'pointer'
                      }}/>
                      <ReloadOutlined style={{
                          fontSize:20,
                          color:'green',
                          cursor:'pointer'
                      }} />
                      </div>
                    </div>
                   </div>
                ))
            }
           
        </div>
    )
}
