import { DeleteOutlined, PlusCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { Skeleton,Input, Button, message,Modal, Select, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import './faculty.css'
export default function Faculty() {
    const [facultyList,setList]=useState([])
    const [loading,setLoading]=useState(false)
    const [loading2,setLoading2]=useState(false)
    const [fName,setFname]=useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [facName,setFacName]=useState('')
    const [welcomeHead,setWelcome]=useState('')
    const [facDesc,setDesc]=useState('')
    const [singFac,setSinFac]=useState([])
    const [curDep,setCurDep]=useState('')
    const [deanName,setDeanName]=useState('')
    const [deanQual,setDeanQual]=useState('')
    const [facId,setFacId]=useState('')
    const {TextArea}=Input
    const {Option}=Select

    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const showModal2 = () => {
        setIsModalVisible2(true);
      };
    
      const handleOk2 = () => {
        setIsModalVisible2(false);
      };
    
      const handleCancel2 = () => {
        setIsModalVisible2(false);
      };











      const props = {
        name: 'profile_pic',
        action: `https://new-modibbo-adama.herokuapp.com/admin/upload-an-image?activity=dean&facultyId=${singFac.length>0?singFac[0].facultyId:''}`,
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
            setDeanQual('')
            setDeanName('')
            setLoading2(true)
            fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-faculty?facultyId=${singFac.length>0?singFac[0].facultyId:''}`)
            .then(res => {
                res.json()
                    .then(data => {
                        setDeanName('')
                        setDeanQual('')
                        handleCancel2()
                        setFacId('')
                        setLoading2(false)
                        setSinFac([data.message])
                    })
            })
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        
      };









    const loadData=()=>{
        setLoading(true)
        fetch('https://new-modibbo-adama.herokuapp.com/admin/get-all-faculties')
        .then(res => {
            res.json()
                .then(data => {
                    console.log(data)
                    setLoading(false)
                    setList(data.message)
                })
        }).catch(err=>{
            setLoading(false)
        })
    }

    useEffect(()=>{
   loadData()
    },[])
    return (
        <div className='faculty'>
           <h1>Faculty List</h1>
           <div className='facultyList'>
               {
                   loading&&(
                       <Skeleton active/>
                   )
               }
               {
                   !loading&&(
                       facultyList.map((fac,ind)=>(
                           <div className='ind' key={ind}>
                     <Input onChange={(txt)=>{
                         setFname(txt.target.value)
                     }} placeholder={fac.facultyName}/>
                     <DeleteOutlined onClick={()=>{
                 const confirm=window.confirm('Are You Sure?')
                 if (confirm) {
               
                  fetch(`https://new-modibbo-adama.herokuapp.com/admin/remove-faculty?facultyId=${fac.facultyId}`,{
                    method:'DELETE',
                    headers:{
                      "Content-Type":'application/json'
                    },
                  
                  })
                  .then(res=>{
                      res.json()
                      .then(data=>{
                         message.success('deleted Succesfuly')
                         loadData()
                      })
                  })



                  
                 }
               }} style={{
                 color:'red',
                 fontSize:20,
                 cursor:'pointer',
                 marginBottom:10,
                 marginTop:10
               }}/>

               <Button onClick={()=>{
              const myObj={
                faculty: {
                    facultyName:fName
                }
            }
           
          
            fetch(`https://new-modibbo-adama.herokuapp.com/admin/edit-faculty?facultyId=${fac.facultyId}`,{
                method:'PUT',
                headers:{
                  "Content-Type":'application/json'
                },
                body:JSON.stringify(myObj)
              })
              .then(res=>{
                  res.json()
                  .then(data=>{
                     loadData()
                     console.log(data)
                   setFname('')
                     message.success('successfuly edited!')
                  })
              })


               }} type='primary'>Save Edited Text</Button>
                           </div>
                       ))
                   )
               }

            <div className='addFac'>
            <PlusCircleOutlined onClick={()=>{
             showModal()
         }} className='myIcon'  style={{
             color:'blue',
             fontSize:40,
             cursor:'pointer'
                 }}/>
            </div>
           </div>

           <Modal  title='Add' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Input onChange={(txt)=>{
                setFacName(txt.target.value)
            }} placeholder='Enter Faculty Name'/>
            <Input  onChange={(txt)=>{
                setWelcome(txt.target.value)
            }} placeholder='Welcome Header'/>
            <TextArea  onChange={(txt)=>{
                setDesc(txt.target.value)
            }} placeholder='Enter Faculty Description'/>

<Button onClick={()=>{
          const myObj={
            faculty: {
                facultyName:facName,
                facultyDescription:facDesc,
                shortNote: welcomeHead
            }
          }
          fetch('https://new-modibbo-adama.herokuapp.com/admin/add-faculty',{
              method:'POST',
              headers:{
                "Content-Type":'application/json'
              },
              body:JSON.stringify(myObj)
            })
            .then(res=>{
                res.json()
                .then(data=>{
                 message.success('Added Succesfuly')
                 handleCancel()
                 setWelcome('')
                 setFacName('')
                 setDesc('')
                  loadData()
                   
                })
            })
      
       }} style={{
           marginTop:20
       }} type='primary'>Add Faculty</Button>

           </Modal>


        <h1>Edit Faculty Details</h1>
        <div className='facultyList'>
            <div className='mainFacDet'>
                <Select onChange={(value)=>{
                 if (value=='sec') {
                     return null
                 }
                 setLoading2(true)
                 fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-faculty?facultyId=${value}`)
                 .then(res => {
                     res.json()
                         .then(data => {
                             setLoading2(false)
                             setSinFac([data.message])
                             
                         })
                 }).catch(err=>{
                     
                 })
                }} defaultValue='sec' style={{width:'80%',marginTop:30}}>
                <Option value="sec">Select Faculty</Option>
                {
                    facultyList.length>0&&(
                        facultyList.map((fac,ind)=>(
                            <Option value={fac.facultyId} key={fac.facultyName}>{fac.facultyName}</Option>
                        ))
                    )
                }
                
                </Select>
            </div>

            <div className='facDetEd'>
                {
                    loading2&&(
                        <Skeleton active/>
                    )
                }
                {
                    !loading2&&
                    singFac.length>0&&
                    (
                    <>
                    <h4>Dean Details</h4>
                    {
                        singFac[0].dean!==null&&(
                            <>
                            {singFac[0].dean.image?(
                            <>
                            <img src={singFac[0].dean.image}/>
                            <Upload {...props}>
                         <Button type='primary' style={{
                                marginTop:10,
                                marginBottom:10
                            }}  icon={<UploadOutlined />}>Change Dean Image</Button>
                           </Upload>
                            </>
                            ):(
                                <>
                                <h4>No Image</h4>
 <Upload  {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload an Image</Button>
</Upload>
                                </>
                            )}
                            <Input disabled placeholder={'Name:'+singFac[0].dean.name}/>
                            <Input disabled placeholder={singFac[0].dean.qualification.map(ql=>ql+',')}/>
                            </>
                        )
                    }
                    {
                        singFac[0].dean==null&&(
                            <>
                            <h2>No Dean Data</h2>
                            <PlusCircleOutlined onClick={()=>{
                                showModal2()
                    }} className='myIcon'  style={{
             color:'blue',
             fontSize:40,
             cursor:'pointer'
                 }}/>
                            </>
                            
                        )
                    }
                    <h4>Departments</h4>
                    {
                        singFac[0].departmentList.map((dpt,ind)=>(
                            <div className='editFac' key={ind}>
                                <Input disabled placeholder={dpt.departmentName}/>
                                <DeleteOutlined onClick={()=>{
                 const confirm=window.confirm('Are You Sure?')
                 if (confirm) {
               
                  fetch(`https://new-modibbo-adama.herokuapp.com/admin/remove-department?facultyId=${singFac[0].facultyId}&departmentId=${dpt.departmentId}`,{
                    method:'PUT',
                    headers:{
                      "Content-Type":'application/json'
                    },
                  
                  })
                  .then(res=>{
                      res.json()
                      .then(data=>{
                         setLoading2(true)
                         message.success('deleted Succesfuly')
                         fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-faculty?facultyId=${singFac[0].facultyId}`)
                         .then(res => {
                             res.json()
                                 .then(data => {
                                     setLoading2(false)
                                     setSinFac([data.message])
                                     console.log(data)
                                 })
                         })
                      })
                  })



                  
                 }
               }} style={{
                 color:'red',
                 fontSize:20,
                 cursor:'pointer',
                 marginBottom:10
               }}/>
                            </div>
                        ))
                    }
                    </>
                    )
                }
            </div>
        </div>











        <Modal  title='Add' visible={isModalVisible2} onOk={handleOk2} onCancel={handleCancel2}>
         <Input value={deanName} onChange={(txt)=>{
             setDeanName(txt.target.value)
         }} placeholder='Enter Dean Name'/>
         <Input value={deanQual} onChange={(txt)=>{
             setDeanQual(txt.target.value)
         }} placeholder='Enter Qualifications'/>
         <Button onClick={()=>{
             const newQual=deanQual.split(',')
             const myObj={
                dean: {
                    name: deanName,
                    qualification: newQual,
                    message: ""
                },
                facultyId: singFac[0].facultyId
             }
             fetch('https://new-modibbo-adama.herokuapp.com/admin/add-dean',{
                method:'PUT',
                headers:{
                  "Content-Type":'application/json'
                },
                body:JSON.stringify(myObj)
              })
              .then(res=>{
                  res.json()
                  .then(data=>{
                    setFacId(data.result.facultyId)
                    message.success('Upload Dean Image')
                   
                    
                   
                     
                  })
              })
         }} style={{marginTop:10}} type='primary'>Add Dean</Button>
    <Upload  {...props}>
    <Button disabled={!facId?true:false} icon={<UploadOutlined />}>Click to Upload an Image</Button>
</Upload>

           </Modal>
        </div>
    )
}
