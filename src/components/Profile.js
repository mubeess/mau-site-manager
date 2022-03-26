import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import {Avatar, Button, message, Upload,Modal} from 'antd'
import Input from 'antd/lib/input/Input'

import React, { useState } from 'react'
import './user.css'
export default function Profile() {
    const [user,setUser]=useState(JSON.parse(window.sessionStorage.getItem('mau-user')))
    const [fName,setFName]=useState('')
    const [lName,setLName]=useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [phone,setPhone]=useState('')
    const [oldPass,setOld]=useState('')
    const [newPass,setNew]=useState('')
    const [mail,setMail]=useState('')

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
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
<div style={{
  display:'flex',
  flexDirection:'row',
  width:'100%',
  justifyContent:'center',
  marginTop:20,
  

}}>
<Upload  {...props}>
    <Button  icon={<UploadOutlined />}>Update Profile Pic</Button>
</Upload>
<Button onClick={showModal} type='primary' style={{marginLeft:20}}>Change Password</Button>
</div>
<Input value={fName} onChange={(e)=>{
    setFName(e.target.value)
}} style={{marginTop:10,width:'80%'}} placeholder={"First Name: "+user.firstName}/>
<Input value={lName} onChange={(e)=>{
    setLName(e.target.value)
}} style={{marginTop:10,width:'80%'}} placeholder={"Last Name: "+user.lastName}/>
<Input value={phone} onChange={(e)=>{
    setPhone(e.target.value)
}} style={{marginTop:10,width:'80%'}} placeholder={"Phone: "+user.phone}/>
<Input disabled style={{marginTop:10,width:'80%'}} placeholder={"Email: "+user.username}/>
<Button onClick={()=>{
    const myObj={
       staff:{
        firstName:fName==''?user.firstName:fName,
        lastName: lName==''?user.lastName:lName,
        phone: phone==''?user.phone:phone
        
       }
       
    }
    fetch(`https://new-modibbo-adama.herokuapp.com/admin/edit-staff?username=${user.username}`,{
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
          fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-staff?username=${user.username}`)
          .then(res=>{
            res.json()
            .then(dat=>{
              setUser(dat.message)
              window.sessionStorage.setItem('mau-user',JSON.stringify(dat.message))
              setFName('')
              setLName('')
              setPhone('')
            })
          })
         
             
          })
      })
}} style={{marginTop:20}} type='primary'>Save Edited Text</Button>


<Modal  title='Reset Password' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
  <Input value={oldPass} onChange={(e)=>{
    setOld(e.target.value)
  }} placeholder='Enter Old Password'/>
  <Input value={newPass} onChange={(e)=>{
    setNew(e.target.value)
  }} style={{marginTop:20}} placeholder='Enter New Password'/>
  <Button onClick={()=>{
    const myObj={
        oldpassword:oldPass,
        newpassword:newPass

    }
    fetch(`https://new-modibbo-adama.herokuapp.com/admin/change-password?username=${user.username}`,{
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
          message.success('Password Reset Succesfully')
          setNew('')
          setOld('')
          handleCancel()
        }else{
          message.error('Your old password is incorrect!!')
        }
        
     
       
           
        })
    })
  }} style={{marginTop:20}} type='primary'>Reset Password</Button>

</Modal>  
        </div>
    )
}
