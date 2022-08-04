import { DeleteOutlined, PlusCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { Skeleton,Input, Button, message,Modal, Select, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import Academics from './Academics'
import Department from './Department'
import './faculty.css'
export default function Faculty() {
    const [facultyList,setList]=useState([])
    const [unitList,setUnitList]=useState([])
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
    const [deanNameEdit,setDeanNameEdit]=useState('')
    const [deanQualEdit,setDeanQualEdit]=useState('')
    const [facDescEdit,setFacEdit]=useState('')
    const [indUnit,setIndUnit]=useState([])
    const [activity,setActivity]=useState('')
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
        action: `https://new-modibbo-adama.herokuapp.com/admin/upload-an-image?subActivity=${activity}&activity=dean&${activity}Id=${singFac.length>0?singFac[0][`${activity}Id`]:''}&target=${activity}Id`,
        headers: {
          authorization: 'authorization-text',
        },
        method:'put',
  
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(`https://new-modibbo-adama.herokuapp.com/admin/upload-an-image?activity=dean&${activity}Id=${singFac.length>0?singFac[0][`${activity}Id`]:''}?target=${activity}Id`,"****???");

          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            setDeanQual('')
            setDeanName('') 
            setLoading2(true)
            console.log(`https://new-modibbo-adama.herokuapp.com/admin/upload-an-image?subActivity=${activity}activity=dean&${activity}Id=${singFac.length>0?singFac[0][`${activity}Id`]:''}&target=${activity}Id`)
            // fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-faculty?facultyId=${singFac.length>0?singFac[0].facultyId:''}`)
            // .then(res => {
            //     res.json()
            //         .then(data => {
            //             setDeanName('')
            //             setDeanQual('')
            //             handleCancel2()
            //             setFacId('')
            //             setLoading2(false)
            //             setSinFac([data.message])
            //         })
            // })
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        
      };









    const loadData=()=>{
        setLoading(true)
        fetch('https://new-modibbo-adama.herokuapp.com/admin/get-all-faculties-schools-college')
        .then(res => {
            res.json()
                .then(data => {
                    console.log(data)
                    setLoading(false)
                    setLoading2(false)
                    setUnitList(data.message)
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
           <h1>Academic Units</h1>
           <div className='acad_cont'>
    <Select onChange={(value)=>{
                 if (value=='sec') {
                     return null
                 }
            const filtered=unitList.filter(dt=>dt.name==value)
            setIndUnit(filtered)
            setActivity(value)
            setList(filtered)

                //  setLoading2(true)
                //  fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-faculty?facultyId=${value}`)
                //  .then(res => {
                //      res.json()
                //          .then(facultyList => {
                //              setLoading2(false)
                //              setSinFac([facultyList.message])
                //              console.log(facultyList)
                             
                //          })
                //  }).catch(err=>{
                     
                //  })
                }} defaultValue='sec' style={{width:'80%',marginTop:30}}>
                <Option value="sec">Select Unit</Option>
                {
                    unitList.length>0&&(
                        unitList.map((fac,ind)=>(
                            <Option value={fac.name} key={fac.name}>{fac.name}</Option>
                        ))
                    )
                }
                
                </Select>
     



                <Select onChange={(value)=>{
                 if (value=='sec') {
                     return null
                 }
                //  setLoading2(true)
                 fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-faculty?eventId=${value}&activity=${activity}&target=${activity}Id`)
                 .then(res => {
                     res.json()
                         .then(facultyList => {
                            //  setLoading2(false)
                            //  setList(facultyList.message)
                            //  console.log([facultyList.message])
                           
                             
                         })
                 }).catch(err=>{
                     
                 })
                }} defaultValue='sec' style={{width:'80%',marginTop:30}}>
                <Option value="sec">Select Sub-Unit</Option>
                {
                    indUnit.length>0&&(
                        indUnit[0].list.map((fac,ind)=>(
                            <Option value={fac.detail.id} key={fac.detail.name}>{fac.detail.name}</Option>
                        ))
                    )
                }
                
                </Select>
    </div>


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
                     }} placeholder={fac.name}/>
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
            <TextArea rows={8}  onChange={(txt)=>{
                setDesc(txt.target.value)
            }} placeholder='Enter Faculty Description'/>

<Button onClick={()=>{
          const myObj={
            entity: {
                [`${activity}Name`]:facName,
                [`${activity}Description`]:facDesc,
                shortNote: welcomeHead
            }
          }
        //   console.log(myObj)
          fetch(`https://new-modibbo-adama.herokuapp.com/admin/add-faculty?status=${activity}`,{
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
                 fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-faculty?eventId=${value}&activity=${activity}&target=${activity}Id`)
                 .then(res => {
                     res.json()
                         .then(data => {
                             setLoading2(false)
                             setSinFac([data.message])
                             console.log(data,'*********')
                             
                         })
                 }).catch(err=>{
                     
                 })
                }} defaultValue='sec' style={{width:'80%',marginTop:30}}>
                <Option value="sec">Select Faculty</Option>
 
                {
                    facultyList.length>0&&(
                        facultyList[0].list.map((fac,ind)=>(
                            <Option value={fac.detail.id} key={fac.detail.name}>{fac.detail.name}</Option>
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
                            <Input
                            placeholder={singFac.length?singFac[0].dean.name:''}
                            style={{
                                marginBottom:10
                            }} value={deanNameEdit} onChange={(txt)=>{
                                setDeanNameEdit(txt.target.value)
                            }}/>
                            <Input placeholder={`Email: ${singFac[0].dean.mail?singFac[0].dean.mail:''}`} value={deanQualEdit} onChange={(txt)=>{
                                setDeanQualEdit(txt.target.value)
                            }}/>
                            <Button onClick={()=>{
                          const myNewObj=deanQualEdit.split(',')
                                const myObj={
                                    dean: {
                                        name:deanNameEdit==''?singFac[0].dean.name:deanNameEdit,
                                        qualification:deanQualEdit==''?singFac[0].dean.qualification:myNewObj,
                                        message: ""
                                    }
                                }
                               setLoading2(true)

                                fetch(`https://new-modibbo-adama.herokuapp.com/admin/edit-dean?facultyId=${singFac[0].facultyId}`,{
                                    method:'PUT',
                                    headers:{
                                    "Content-Type":'application/json'
                                    },
                                    body:JSON.stringify(myObj)
                                })
                                .then(res=>{
                                    res.json()
                                    .then(data=>{
                                        fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-faculty?facultyId=${singFac[0].facultyId}`)
                                        .then(res => {
                                            res.json()
                                                .then(data => {
                                                    setLoading2(false)
                                                    setSinFac([data.message])
                                                    
                                                    
                                                })
                                        }).catch(err=>{
                                            
                                        })
                                        console.log(data)
                                    setFname('')
                                        message.success('successfuly edited!')
                                    })
                                })


                            }} style={{marginTop:10}} type='primary'>Save Edited Text</Button>
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
                                <Input onChange={(txt)=>{
                                    console.log(dpt)
                                }} placeholder={dpt.departmentName}/>
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
                {
                    singFac[0].departmentList.length==0&&(
                        <h2>No Department Added</h2>
                    )
                }

                <h4>{activity} Description</h4>
                <TextArea rows={8} onChange={(txt)=>{
                    setFacEdit(txt.target.value)
                }} value={facDescEdit} placeholder={singFac[0][`${activity}Description`]}/>
                <Button onClick={()=>{
                                const myObj={
                                    newData: {
                                        [`${activity}Description`]:facDescEdit 
                                    }
                                }
                               setLoading2(true)
                               setLoading(true)

                                fetch(`https://new-modibbo-adama.herokuapp.com/admin/edit-faculty?entityId=${singFac[0][`${activity}Id`]}&activity=${activity}&target=${activity}Id`,{
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
                                        setFacEdit('')
                                        message.success('successfuly edited!')
                                    })
                                })


                            }} style={{marginTop:10}} type='primary'>Save Edited Text</Button>
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
         }} placeholder='Enter Mail'/>
         <Button onClick={()=>{
             const newQual=deanQual.split(',')
             const myObj={
                dean: {
                    name: deanName,
                    message: "",
                    mail:deanQual
                }
             }
             fetch(`https://new-modibbo-adama.herokuapp.com/admin/add-dean?activity=${activity}&target=${activity}Id&entityId=${singFac[0][`${activity}Id`]}`,{
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
                    message.success('Added Dean')
                   
                    
                   
                     
                  })
              })
         }} style={{marginTop:10}} type='primary'>Add Dean</Button>
    <Upload  {...props}>
    <Button disabled={!facId?true:false} icon={<UploadOutlined />}>Click to Upload an Image</Button>
</Upload>

           </Modal>



    {/* <Department/> */}
        </div>
    )
}
