import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import {Avatar, Button, message, Upload} from 'antd'
import Input from 'antd/lib/input/Input'
import React, { useState } from 'react'
import './user.css'
export default function Profile() {
    const [user,setUser]=useState(JSON.parse(window.sessionStorage.getItem('mau-user')))
    const [fName,setFName]=useState('')
    const [lName,setLName]=useState('')
    const [phone,setPhone]=useState('')
    const [mail,setMail]=useState('')
    const props = {
        name: 'profile_pic',
        action: `https://new-modibbo-adama.herokuapp.com/admin/set-profile-pic?username=${user.username}`,
        headers: {
          authorization: 'authorization-text',
        },
        method:'put',
  
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            window.sessionStorage.setItem('mau-user',JSON.stringify(info.file.response.message))
            setUser(info.file.response.message)
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        
      };
    return (
        <div className='profCont'>
            {
                user.image!='null'?<img src={user.image} alt='user'/>:<Avatar size={64} icon={<UserOutlined/>}></Avatar>
            }
<Upload  {...props}>
    <Button style={{marginTop:20}} icon={<UploadOutlined />}>Update Profile Pic</Button>
</Upload>

<Input value={fName} onChange={(e)=>{
    setFName(e.target.value)
}} style={{marginTop:10,width:'80%'}} placeholder={"First Name: "+user.firstName}/>
<Input value={lName} onChange={(e)=>{
    setLName(e.target.value)
}} style={{marginTop:10,width:'80%'}} placeholder={"Last Name: "+user.lastName}/>
<Input value={phone} onChange={(e)=>{
    setPhone(e.target.value)
}} style={{marginTop:10,width:'80%'}} placeholder={"Phone: "+user.phone}/>
<Input value={mail} onChange={(e)=>{
    setMail(e.target.value)
}} style={{marginTop:10,width:'80%'}} placeholder={"Email: "+user.username}/>
<Button onClick={()=>{
    const myObj={
        username:mail==''?user.username:mail,
        firstName:fName==''?user.firstName:fName,
        lastName: lName==''?user.lastName:lName,
        phone: phone==''?user.phone:phone,
       
    }
    fetch(`https://new-modibbo-adama.herokuapp.com/admin/edit-user?username=${user.username}`,{
        method:'PUT',
        headers:{
          "Content-Type":'application/json'
        },
        body:JSON.stringify(myObj)
      })
      .then(res=>{
          res.json()
          .then(data=>{
          message.success('Updated successfully')
          console.log(data)
             
          })
      })
}} style={{marginTop:20}} type='primary'>Save Edited Text</Button>
            
        </div>
    )
}
