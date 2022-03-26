import { DeleteOutlined,PlusCircleOutlined,ReloadOutlined, UserOutlined } from '@ant-design/icons'
import {Input, Rate,Modal,Select, Button, message, Avatar} from 'antd'

import React, { useEffect, useState } from 'react'
import './user.css'
export default function Users() {
    const [allUsers,setAll]=useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fName,setFName]=useState('')
    const [lName,setLName]=useState('')
    const [phone,setPhone]=useState('')
    const [mail,setMail]=useState('')
    const [role,setRole]=useState('none')
    const userr=JSON.parse(window.sessionStorage.getItem('mau-user'))
    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
      const { Option } = Select;
    const loadData=()=>{
        fetch('https://new-modibbo-adama.herokuapp.com/admin/get-all-staff')
        .then(res => {
            res.json()
                .then(data => {
                    const filtered=data.message.filter(usr=>usr.username!=userr.username)
                    setAll(filtered)
                    
                })
        }).catch(err=>{
            
        })
    }

    useEffect(()=>{
    loadData()
    },[])
    
    
    return (
        <div className='usersCont'>
            {
                allUsers.map(user=>(
                    <div key={user.firstName} className='userCard'>
                    <div className='imgDet'>
                    {
                        user.image!='null'?<img src={user.image} alt='user'/>:<Avatar size={64} icon={<UserOutlined />} />
                    }
                 
                   <h4>{user.role!='null'?user.role.toUpperCase():'No Role Set'}</h4>
                   <Rate allowHalf disabled defaultValue={user.role=='super'?4.5:2.5} />
                    </div>
                    <div className='txtDet'>
                      <Input disabled value={"Name: "+user.firstName+" "+user.lastName} />
                      <Input disabled value={"Phone: "+user.phone} />
                      <Input disabled value={"Email: "+user.username}/>
                      <div style={{
                          width:'100%'
                      }}>
                      <Select style={{marginTop:5,width:'60%'}} defaultValue="none" onChange={(val)=>{
              setRole(val)
        }}>
      <Option value="none">---Set Role---</Option>
      <Option value="super">Super Admin</Option>
      <Option value="admin">Admin</Option>
      <Option value="staff">Staff</Option>
      </Select>
      <Button onClick={()=>{
    const myObj={
       staff:{
        role
        
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
          message.success('Role set successfully')
          setRole('none')
          loadData()
         
             
          })
      })
}} style={{marginLeft:10}} type='primary' size='small'>Set Role</Button>
                      </div>
                      <div style={{
                          padding:10,
                          width:'70%',
                          display:'flex',
                          flexDirection:'row',
                          justifyContent:'space-around'
                                                }}>
                      <DeleteOutlined onClick={()=>{
                          const confirmed=window.confirm('Are You Sure?')
                          if (confirmed) {
                            fetch(`https://new-modibbo-adama.herokuapp.com/admin/remove-staff?username=${user.username}`,{
                                method:'DELETE',
                                headers:{
                                  "Content-Type":'application/json'
                                }
                              })
                              .then(res=>{
                                  res.json()
                                  .then(data=>{
                                  message.success('Deleted successfully')
                                  loadData()
                                  
                                     
                                  })
                              })
                              
                          }
                            
                      }} style={{
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

            <div className='addStaff'>
            <PlusCircleOutlined onClick={()=>{
             showModal()
         }} className='myIcon'  style={{
             color:'blue',
             fontSize:40,
             cursor:'pointer'
                 }}/>
            </div>
           








            <Modal  title='Add User' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
             <Input value={fName} onChange={(e)=>{
                 setFName(e.target.value)
             }} style={{marginTop:10}} placeholder='First Name'/>
             <Input value={lName} onChange={(e)=>{
                 setLName(e.target.value)
             }} style={{marginTop:10}} placeholder='Last Name'/>
             <Input type='number' value={phone} onChange={(e)=>{
                 setPhone(e.target.value)
             }} style={{marginTop:10}} placeholder='Phone'/>
             <Input type='email' value={mail} onChange={(e)=>{
                 setMail(e.target.value)
             }} style={{marginTop:10}} placeholder='Email'/>
        <Select value={role} style={{marginTop:10,width:'100%'}} defaultValue="none" onChange={(val)=>{
              setRole(val)
        }}>
      <Option value="none">---Select Role---</Option>
      <Option value="super">Super Admin</Option>
      <Option value="admin">Admin</Option>
      <Option value="staff">Staff</Option>
      </Select>
      <Button onClick={()=>{
          const myObj={
                username:mail,
                firstName:fName,
                lastName: lName,
                phone: phone,
                role:role,
                gender: "",
                address:''
        
          }
          fetch('https://new-modibbo-adama.herokuapp.com/admin/register-staff',{
            method:'POST',
            headers:{
              "Content-Type":'application/json'
            },
            body:JSON.stringify(myObj)
          })
          .then(res=>{
              res.json()
              .then(data=>{
              message.success('Created successfully')
              loadData()
              console.log(data)
                 
              })
          })
      }} style={{
          marginTop:10,
          width:'40%'
      }} type='primary'>Add User</Button>
            </Modal>
        </div>
    )
}

// .toUpperCase()