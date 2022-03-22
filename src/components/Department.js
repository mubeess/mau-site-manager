import { DeleteOutlined, PlusCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { Skeleton,Modal, Button, message, Select,Input, Upload } from 'antd'


import React, { useEffect, useState } from 'react'
import './dep.css'
export default function Department() {
    const [loading,setLoading]=useState(false)
    const [depList,setDepList]=useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [depName,setDepName]=useState('')
    const [depVision,setDepVision]=useState('')
    const [facIdAdd,setFacIdAdd]=useState('sec')
    const [filteredDep,setFilteredDep]=useState([])
    const [facList,setFacList]=useState([])
    const [hodName,setHodName]=useState('')
    const [hodQual,setHodQual]=useState('')
    const [staffName,setStaffName]=useState('')
    const [staffQual,setStaffQual]=useState('')
    const [staffMajor,setStaffMajor]=useState('')
    const [staffName2,setStaffName2]=useState('')
    const [staffQual2,setStaffQual2]=useState('')
    const [staffMajor2,setStaffMajor2]=useState('')
    const [programName,setProgName]=useState('')
    const [programMission,setProgMission]=useState('')
    const [progReq,setProgReq]=useState('')
    const [programName2,setProgName2]=useState('')
    const [programMission2,setProgMission2]=useState('')
    const [progReq2,setProgReq2]=useState('')


    const props = {
        name: 'profile_pic',
        action: `https://new-modibbo-adama.herokuapp.com/admin/upload-an-image?activity=hod&departmentId=${filteredDep.length>0?filteredDep[0].departmentId:''}`,
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
            setLoading(true)
            fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-department?departmentId=${filteredDep.length>0?filteredDep[0].departmentId:''}`)
            .then(res => {
                res.json()
                    .then(data => {
                        setHodQual('')
                        setHodName('')
                        setFilteredDep(data.message)
                       
                    })
            })
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        
      };











      const props2 = {
        name: 'profile_pic',
        action: `https://new-modibbo-adama.herokuapp.com/admin/upload-an-image?activity=program&departmentId=${filteredDep.length>0?filteredDep[0].departmentId:''}`,
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
            setLoading(true)
            fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-department?departmentId=${filteredDep.length>0?filteredDep[0].departmentId:''}`)
            .then(res => {
                res.json()
                    .then(data => {
                        setHodQual('')
                        setHodName('')
                        setFilteredDep(data.message)
                       
                    })
            })
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        
      };













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



    
      const loadFaculty=()=>{
        setLoading(true)
        fetch('https://new-modibbo-adama.herokuapp.com/admin/get-all-faculties')
        .then(res => {
            res.json()
                .then(data => {
                    setLoading(false)
                    setFacList(data.message)
                })
        }).catch(err=>{
            setLoading(false)
        })
    }


    const loadData=()=>{
        setLoading(true)
        fetch('https://new-modibbo-adama.herokuapp.com/admin/get-all-department')
        .then(res => {
            res.json()
                .then(data => {
                    console.log(data)
                    setDepList(data.message)
                    loadFaculty()
                })
        }).catch(err=>{
            setLoading(false)
        })
    }

    useEffect(()=>{
    loadData()
    },[])
    const {TextArea}=Input
    const {Option}=Select
    return (
        <div className='department'>
            <h1>Department List</h1>
          
            <div className='depList'>
            <div style={{backgroundColor:'#f9f9f9'}} className='addStaff'>
            <Select onChange={(value)=>{
                const filteredDepList=depList.filter(dep=>dep.departmentId==value)
                setFilteredDep(filteredDepList)
                console.log(facList,filteredDep)
                }} defaultValue='sec' style={{marginTop:10,width:'100%'}}>
                <Option value="sec">Select Department</Option>
                {
                    depList.length>0&&(
                        depList.map((fac,ind)=>(
                            <Option value={fac.departmentId} key={fac.departmentName}>{fac.departmentName}</Option>
                        ))
                    )
                }
                
                </Select>
           </div>
            {
                   loading&&(
                       <Skeleton active/>
                   )
               }
            <div className='addDep'>
            <PlusCircleOutlined onClick={()=>{
             showModal()
         }} className='myIcon'  style={{
             color:'blue',
             fontSize:40,
             cursor:'pointer'
                 }}/>
            </div>
            </div>
            
            <h1>Hod & Staff List</h1>
            <div className='HodDetails'>
                <div className='selectDep'>

              {
                  filteredDep.length>0&&(
                    <div className='depProgram'>
                    <h2>Department Programs</h2>
                    {
                        filteredDep[0].programs.length==0&&(
                            <h4>No Programs Added!!</h4>
                        )
                    }
                    <div className='addStaff'>
                    {
                        filteredDep[0].programs.length>0&&(
                            filteredDep[0].programs.map((prg)=>(
                                <div key={prg.name} className='indiProgram'>
                                <Input value={programName2} onChange={(txt)=>{
                                    setProgName2(txt.target.value)
                                }} placeholder={"Name:"+prg.name}/>
                                <Input value={programMission2} onChange={(txt)=>{
                                    setProgMission2(txt.target.value)
                                }} placeholder={"Mission:"+prg.mission}/>
                                <TextArea value={progReq2} onChange={(txt)=>{
                                    setProgReq2(txt.target.value)
                                }} placeholder={"Requirements:"+prg.admissionRequirement.map(rq=>rq+', ')}/>
                                <Button onClick={()=>{
        const processed=progReq2.split(',')
          const myObj={
            program: {
                name: programName2==''?prg.name:programName2,
                addmissionRequirement:progReq2==''?prg.addmissionRequirement:processed,
                mission: programMission2==''?prg.mission:programMission2
            }
          }
          console.log(myObj)
          fetch(`https://new-modibbo-adama.herokuapp.com/admin/edit-department-program?programId=${prg.programId}&departmentId=${filteredDep[0].departmentId}`,{
              method:'PUT',
              headers:{
                "Content-Type":'application/json'
              },
              body:JSON.stringify(myObj)
            })
            .then(res=>{
                res.json()
                .then(data=>{
                    fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-department?departmentId=${filteredDep.length>0?filteredDep[0].departmentId:''}`)
                                        .then(res => {
                                            res.json()
                                                .then(data => {
                                                   setProgReq2('')
                                                   setProgName2('')
                                                   setProgMission2('')
                                                    setFilteredDep(data.message)
                                                    message.success('successfuly added!')
                                                   
                                                })
                                        })
                   
                })
            })
            .catch(err=>{
                console.log(err)
            })
      
       }} style={{marginTop:10,marginRight:10}} type='primary'>Save Edited Text</Button>

<DeleteOutlined onClick={()=>{
                 const confirm=window.confirm('Are You Sure?')
                 if (confirm) {
               
                  fetch(`https://new-modibbo-adama.herokuapp.com/admin/remove-department-program?departmentId=${filteredDep[0].departmentId}&programId=${prg.programId}`,{
                    method:'PUT',
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
                                </div>
                            ))
                        )
                    }
                    </div>
                   
                     <div style={{marginTop:20}} className='addStaff'>
                    <h4 style={{textAlign:'center'}}>Add New Program</h4>
                    <Input value={programName} onChange={(txt)=>{
                        setProgName(txt.target.value)
                    }} placeholder='Program Name'/>
                    <Input value={programMission} onChange={(txt)=>{
                        setProgMission(txt.target.value)
                    }} placeholder='Program Mission'/>
                    <TextArea value={progReq} onChange={(txt)=>{
                        setProgReq(txt.target.value)
                    }} placeholder='Admission Requirements'/>
                    <Button onClick={()=>{
                          const myNewObj=progReq.split(',')
                                const myObj={
                                    program: {
                                        name:programName,
                                        admissionRequirement:myNewObj,
                                        mission:programMission
                                    },
                                    departmentId:filteredDep[0].departmentId
                                }
                              console.log(myObj)

                                fetch(`https://new-modibbo-adama.herokuapp.com/admin/add-department-program`,{
                                    method:'PUT',
                                    headers:{
                                    "Content-Type":'application/json'
                                    },
                                    body:JSON.stringify(myObj)
                                })
                                .then(res=>{
                                    res.json()
                                    .then(data=>{
                                        fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-department?departmentId=${filteredDep.length>0?filteredDep[0].departmentId:''}`)
                                        .then(res => {
                                            res.json()
                                                .then(data => {
                                                    setProgReq('')
                                                    setProgName('')
                                                    setProgMission('')
                                                    setFilteredDep(data.message)
                                                    message.success('successfuly added!')
                                                   
                                                })
                                        })
                                        
                                   
                                       
                                    })
                                })


                            }} style={{marginTop:10}} type='primary'>Add Program</Button>
                    <Upload  {...props2}>
        <Button icon={<UploadOutlined />}>Upload Brochure</Button>
                </Upload>

                    </div>
                    </div>
                  )
              }
               
                </div>
                <div className='HodDetail'>
               
                {
                    filteredDep.length>0&&(
                        <>
                         <h4>Hod's Details</h4>
                        {
                            filteredDep[0].hod==null&&(
                                <>
                                <h2>No Hod Data!</h2>
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
                    {
                        filteredDep[0].hod!=null&&(
                        <>
                         <img src={filteredDep[0].hod.image}/>
                         <Upload  {...props}>
                 <Button type='primary' style={{marginTop:10}} icon={<UploadOutlined />}>Change Hod's Image</Button>
                    </Upload>
                    <Input style={{marginTop:10}} value={hodName} onChange={(txt)=>{
                 setHodName(txt.target.value)
             }} placeholder={"Name: "+filteredDep[0].hod.name}/>
                    <Input style={{marginTop:10}} value={hodQual} onChange={(txt)=>{
                 setHodQual(txt.target.value)
             }} placeholder={"Qualifications: "+filteredDep[0].hod.qualification.map(ql=>ql+', ')}/>
             <Button style={{marginTop:10}} onClick={()=>{
                          const myNewObj=hodQual.split(',')
                                const myObj={
                                    hod: {
                                        name:hodName==''?filteredDep[0].hod.name:hodName,
                                        qualification:hodQual==''?filteredDep[0].hod.qualification:myNewObj
                                    }
                                }
                              

                                fetch(`https://new-modibbo-adama.herokuapp.com/admin/edit-hod?departmentId=${filteredDep.length>0?filteredDep[0].departmentId:''}`,{
                                    method:'PUT',
                                    headers:{
                                    "Content-Type":'application/json'
                                    },
                                    body:JSON.stringify(myObj)
                                })
                                .then(res=>{
                                    res.json()
                                    .then(data=>{
                                        fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-department?departmentId=${filteredDep.length>0?filteredDep[0].departmentId:''}`)
                                        .then(res => {
                                            res.json()
                                                .then(data => {
                                                    setHodQual('')
                                                    setHodName('')
                                                    setFilteredDep(data.message)
                                                    message.success('successfuly edited!')
                                                   
                                                })
                                        })
                                        
                                   
                                       
                                    })
                                })


                            }} type='primary'>Change Edited Text</Button>
                         </>
                         
                        )
                    }
                        </>
                    )
                }

               
                {
                    filteredDep.length>0&&(
                        <>
                         <h4 style={{marginTop:10}}>Staff List</h4>
                        {
                            filteredDep[0].staffList.length==0&&(
                                <h2>No Staff Added Yet!!</h2>
                            )
                        }

                       {
                           filteredDep[0].staffList.length>0&&(
                               filteredDep[0].staffList.map((stf,ind)=>(
                                <div className='indiStaff'>
                                <Input onChange={(txt)=>{
                        setStaffName2(txt.target.value)
                    }} placeholder={'Name: '+stf.name}/> 
                                <Input onChange={(txt)=>{
                        setStaffQual2(txt.target.value)
                    }} placeholder={'Qualificaions: '+stf.qualification.map(ql=>ql+', ')}/> 
                                <Input  onChange={(txt)=>{
                        setStaffMajor2(txt.target.value)
                    }} placeholder={'Major: '+stf.major}/>
                                <Button onClick={()=>{
        const processed=staffQual2.split(',')
          const myObj={
            staff: {
                name:staffName2==''?stf.name:staffName2,
                qualification:staffQual2==''?stf.qualification:processed,
                major:staffMajor2==''?stf.major:staffMajor2
            }
          }
          console.log(myObj)
          fetch(`https://new-modibbo-adama.herokuapp.com/admin/edit-department-staff?departmentId=${filteredDep[0].departmentId}&staffId=${stf.staffId}`,{
              method:'PUT',
              headers:{
                "Content-Type":'application/json'
              },
              body:JSON.stringify(myObj)
            })
            .then(res=>{
                res.json()
                .then(data=>{
                
                    fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-department?departmentId=${filteredDep.length>0?filteredDep[0].departmentId:''}`)
                                        .then(res => {
                                            res.json()
                                                .then(data => {
                                                   setStaffMajor2('')
                                                   setStaffName2('')
                                                   setStaffQual2('')
                                                    setFilteredDep(data.message)
                                                    message.success('successfuly added!')
                                                   
                                                })
                                        })
                   
                })
            })
            .catch(err=>{
                console.log(err)
            })
      
       }} style={{marginTop:10}} type='primary'>Save Edited Text</Button> 

<DeleteOutlined onClick={()=>{
                 const confirm=window.confirm('Are You Sure?')
                 if (confirm) {
               
                  fetch(`https://new-modibbo-adama.herokuapp.com/admin/remove-department-staff?departmentId=${filteredDep[0].departmentId}&staffId=${stf.staffId}`,{
                    method:'PUT',
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
                                </div>

                               ))
                           )
                       }

                        <div className='addStaff'>
                    <h4 style={{textAlign:'center'}}>Add New Staff</h4>
                    <Input value={staffName} onChange={(txt)=>{
                        setStaffName(txt.target.value)
                    }} placeholder='New Staff Name'/>
                    <Input value={staffQual} onChange={(txt)=>{
                        setStaffQual(txt.target.value)
                    }} placeholder='New Staff Qualifications'/>
                    <Input value={staffMajor} onChange={(txt)=>{
                        setStaffMajor(txt.target.value)
                    }} placeholder='New Staff Major'/>
                    <Button onClick={()=>{
        const processed=staffQual.split(',')
          const myObj={
            staff: {
                name:staffName,
                qualification:processed,
                major:staffMajor
            },
            departmentId:filteredDep[0].departmentId
          }
          console.log(myObj)
          fetch('https://new-modibbo-adama.herokuapp.com/admin/add-department-staff',{
              method:'PUT',
              headers:{
                "Content-Type":'application/json'
              },
              body:JSON.stringify(myObj)
            })
            .then(res=>{
                res.json()
                .then(data=>{
                
                    fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-department?departmentId=${filteredDep.length>0?filteredDep[0].departmentId:''}`)
                                        .then(res => {
                                            res.json()
                                                .then(data => {
                                                   setStaffMajor('')
                                                   setStaffName('')
                                                   setStaffQual('')
                                                    setFilteredDep(data.message)
                                                    message.success('successfuly added!')
                                                   
                                                })
                                        })
                   
                })
            })
            .catch(err=>{
                console.log(err)
            })
      
       }}  style={{marginTop:10}} type='primary'>Add New Staff</Button>

                </div>
                        </>
                    )
                }
              
                </div>
            </div>




        








            <Modal  title='Add' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
             <Input value={depName} onChange={(txt)=>{
                 setDepName(txt.target.value)
             }} placeholder='Department Name'/>
             <TextArea value={depVision} onChange={(txt)=>{
                 setDepVision(txt.target.value)
             }} style={{marginTop:10}} placeholder='Department Vision'/>
             <Select value={facIdAdd} onChange={(value)=>{
                
                setFacIdAdd(value)
                }} defaultValue='sec' style={{marginTop:10,width:'100%'}}>
                <Option value="sec">Select Faculty</Option>
                {
                    facList.length>0&&(
                        facList.map((fac,ind)=>(
                            <Option value={fac.facultyId} key={fac.facultyName}>{fac.facultyName}</Option>
                        ))
                    )
                }
                
                </Select>
             <Button style={{
                 marginTop:10
             }} onClick={()=>{
          const myObj={
            department: {
                departmentName: depName,
                vission: depVision,
                mission: ""
            },
            facultyId: facIdAdd
          }
          console.log(myObj)
          fetch('https://new-modibbo-adama.herokuapp.com/admin/add-department',{
              method:'PUT',
              headers:{
                "Content-Type":'application/json'
              },
              body:JSON.stringify(myObj)
            })
            .then(res=>{
                res.json()
                .then(data=>{
                 message.success('Added Succesfuly')
                 console.log(data)
                   
                })
            })
            .catch(err=>{
                console.log(err)
            })
      
       }} type='primary'>Add Dep</Button>
            </Modal>




            <Modal  title='Add' visible={isModalVisible2} onOk={handleOk2} onCancel={handleCancel2}>
             <Input value={hodName} onChange={(txt)=>{
                 setHodName(txt.target.value)
             }} placeholder={`Enter Hod's Name`}/>
             <Input value={hodQual} onChange={(txt)=>{
                 setHodQual(txt.target.value)
             }} style={{marginTop:10}} placeholder='Qualifications'/>
             
             <Button style={{
                 marginTop:10
             }} onClick={()=>{
          const processed=hodQual.split(',')
          const myObj={
            hod: {
                name:hodName,
                qualification:processed
            },
            departmentId:filteredDep[0].departmentId
          }
          console.log(myObj)
          fetch('https://new-modibbo-adama.herokuapp.com/admin/add-hod',{
              method:'PUT',
              headers:{
                "Content-Type":'application/json'
              },
              body:JSON.stringify(myObj)
            })
            .then(res=>{
                res.json()
                .then(data=>{
                 message.success('Added Succesfuly')
                 console.log(data)
                   
                })
            })
            .catch(err=>{
                console.log(err)
            })
      
       }} type='primary'>Add Hod</Button>

<Upload  {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload an Image</Button>
</Upload>

            </Modal>

        </div>
    )
}
