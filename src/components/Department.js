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
    const [depMision,setDepMision]=useState('')
    const [facIdAdd,setFacIdAdd]=useState('sec')
    const [filteredDep,setFilteredDep]=useState([])
    const [facList,setFacList]=useState([])
    const [hodName,setHodName]=useState('')
    const [hodMail,setHodMail]=useState('')
    const [staffName,setStaffName]=useState('')
    const [rank,setStaffRank]=useState('')
    const [staffMajor,setStaffMajor]=useState('')
    const [staffMail,setStaffMail]=useState('')
    const [staffId,setStaffId]=useState('')
    const [staffName2,setStaffName2]=useState('')
    const [staffQual2,setStaffQual2]=useState('')
    const [staffMajor2,setStaffMajor2]=useState('')
    const [programName,setProgName]=useState('')
    const [programMission,setProgMission]=useState('')
    const [programVission,setProgVission]=useState('')
    const [programType,setProgramType]=useState('sec')
    
    const [progReq,setProgReq]=useState('')
    const [programName2,setProgName2]=useState('')
    const [programMission2,setProgMission2]=useState('')
    const [progReq2,setProgReq2]=useState('')
    const [depNameEdit,setDepNameEdit]=useState('')
    const [depVision2,setDepVision2]=useState('')
    const [depMision2,setDepMision2]=useState('')
    const [introduction,setIntro]=useState('')
    const [progId,setProgId]=useState('')
    const [ManiFacList,setMain]=useState([])
    const [activity,setActivity]=useState('sec')
    const [activityId,setActivityId]=useState('')


    const props = {
        name: 'profile_pic',
        action: `https://new-modibbo-adama.herokuapp.com/admin/upload-an-image?activity=hod&departmentId=${filteredDep.length>0?filteredDep[0].department.departmentId:''}&subActivity=${filteredDep.length>0?filteredDep[0].activity:''}`,
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
            loadData()
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        
      };











      const props2 = {
        name: 'file',
        action: `https://new-modibbo-adama.herokuapp.com/admin/add-program-brochure?programId=${progId}&departmentId=${filteredDep.length>0?filteredDep[0].department.departmentId:''}&activity=${filteredDep.length>0?filteredDep[0].activity:''}`,
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
            loadData()
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
        fetch('https://new-modibbo-adama.herokuapp.com/admin/get-all-faculties-schools-college')
        .then(res => {
            res.json()
                .then(data => {
                    setLoading(false)
                    console.log(data,"++++++")
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
                   console.log(data,'dep')
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
                const filteredDepList=depList.filter(dep=>dep.department.departmentId==value)
                setFilteredDep(filteredDepList)
                console.log(facList,filteredDep)
             }} defaultValue='sec' style={{marginTop:10,width:'100%'}}>
                <Option value="sec">Select Department</Option>
                {
                    depList.length>0&&(
                        depList.map((fac,ind)=>(
                            <Option value={fac.department.departmentId} key={fac.department.departmentId}>{fac.department.departmentName}</Option>
                        ))
                    )
                }
                
                </Select>
              <div style={{marginTop:10}} className='addStaff'>
             {
                 filteredDep.length>0&&(
                     <>
                <Input value={depNameEdit} onChange={(txt)=>{
                    setDepNameEdit(txt.target.value)
                }} placeholder={"Department Name: "+filteredDep[0].department.departmentName}/>
               <TextArea rows={6} value={depVision2} onChange={(txt)=>{
                    setDepVision2(txt.target.value)
                }} style={{marginTop:10}} placeholder={"Department Vission: "+filteredDep[0].department.vission}/>

<TextArea rows={6} value={depMision2} onChange={(txt)=>{
                    setDepMision2(txt.target.value)
                }} style={{marginTop:10}} placeholder={"Department Mission: "+filteredDep[0].department.mission}/>
<TextArea rows={6} value={introduction} onChange={(txt)=>{
                    setIntro(txt.target.value)
                }} style={{marginTop:10}} placeholder={"Welcome Address: "+filteredDep[0].department.introduction}/>


               <Button onClick={()=>{
          const myObj={
            department: {
                departmentName:depNameEdit==''?filteredDep[0].department.departmentName:depNameEdit,
                vission:depVision2==''?filteredDep[0].department.vission:depVision2,
                mission:depMision2==''?filteredDep[0].department.mission:depMision2,
                introduction:introduction==''?filteredDep[0].department.introduction:introduction
            }
          }
          fetch(`https://new-modibbo-adama.herokuapp.com/admin/edit-department?departmentId=${filteredDep[0].department.departmentId}&activity=${filteredDep[0].activity}`,{
              method:'PUT',
              headers:{
                "Content-Type":'application/json'
              },
              body:JSON.stringify(myObj)
            })
            .then(res=>{
                res.json()
                .then(data=>{
                    setDepNameEdit('')
                    setDepVision2('')
                    setDepMision2('')
                    loadData()
                    message.success('successfuly edited!')
                   
                })
            })
            .catch(err=>{
                console.log(err)
            })
      
       }} type='primary' style={{marginTop:10}}>Save Edited Text</Button>
                     </>
                 )
             }
             {
                 filteredDep.length==0&&(
                     <h2>Please Select Department.</h2>
                 )
             }
              </div>
            
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
                        filteredDep[0].department.programs.length==0&&(
                            <h4>No Programs Added!!</h4>
                        )
                    }
                    <div className='addStaff'>
                    {
                        filteredDep[0].department.programs.length>0&&(
                            filteredDep[0].department.programs.map((prg)=>(
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
          fetch(`https://new-modibbo-adama.herokuapp.com/admin/edit-department-program?programId=${prg.programId}&departmentId=${filteredDep[0].department.departmentId}`,{
              method:'PUT',
              headers:{
                "Content-Type":'application/json'
              },
              body:JSON.stringify(myObj)
            })
            .then(res=>{
                res.json()
                .then(data=>{
                    fetch(`https://new-modibbo-adama.herokuapp.com/admin/get-single-department?departmentId=${filteredDep.length>0?filteredDep[0].department.departmentId:''}`)
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
               
                  fetch(`https://new-modibbo-adama.herokuapp.com/admin/remove-department-program?departmentId=${filteredDep[0].department.departmentId}&programId=${prg.programId}`,{
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
                 <Upload {...props2}>
        <Button onClick={()=>{
            setProgId(prg.programId)
        }} style={{marginLeft:20}} icon={<UploadOutlined />}>Upload Brochure</Button>
                </Upload>
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
                     <Input value={programVission} onChange={(txt)=>{
                        setProgVission(txt.target.value)
                    }} placeholder='Program Vision'/>
                    <TextArea value={progReq} onChange={(txt)=>{
                        setProgReq(txt.target.value)
                    }} placeholder='Admission Requirements'/>

                    
           <Select value={programType} onChange={(value)=>{
              setProgramType(value) 
             }} defaultValue='sec' style={{marginTop:10,width:'100%'}}>
                <Option value="sec">Select Program Type</Option>
                <Option value="undergraduate">Undergraduate</Option>
                <Option value="postgraduate">Postgraduate</Option>
                
          </Select>






                    <Button onClick={()=>{
                          const myNewObj=progReq.split(',')
                                const myObj={
                                    program: {
                                        name:programName,
                                        admissionRequirement:myNewObj,
                                        mission:programMission,
                                        vission:programVission,
                                        type:programType
                                    },
                                    departmentId:filteredDep[0].department.departmentId
                                }
                              console.log(myObj)

                                fetch(`https://new-modibbo-adama.herokuapp.com/admin/add-department-program?activity=${filteredDep.length>0?Object.entries(filteredDep[0]).filter(en=>en[0]!=='department')[0][0].split('Name')[0]:''}&entityId=${filteredDep.length>0?filteredDep[0].department.departmentId:''}`,{
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
                                        setProgReq('')
                                        setProgName('')
                                        setProgMission('')
                                        setProgVission('')
                                        message.success('successfuly added!')
                                        
                                   
                                       
                                    })
                                })


                            }} style={{marginTop:10}} type='primary'>Add Program</Button>
                    {/* <Upload  {...props2}>
        <Button icon={<UploadOutlined />}>Upload Brochure</Button>
                </Upload> */}

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
                            filteredDep[0].department.hod==null&&(
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
                        filteredDep[0].department.hod!=null&&(
                        <>
                         <img src={filteredDep[0].department.hod.image}/>
                         <Upload  {...props}>
                 <Button type='primary' style={{marginTop:10}} icon={<UploadOutlined />}>Change Hod's Image</Button>
                    </Upload>
                    <Input style={{marginTop:10}} value={hodName} onChange={(txt)=>{
                 setHodName(txt.target.value)
             }} placeholder={"Name: "+filteredDep[0].department.hod.name}/>
                    <Input style={{marginTop:10}} value={hodMail} onChange={(txt)=>{
                 setHodMail(txt.target.value)
             }} placeholder={"E-mail: "+filteredDep[0].department.hod.mail}/>
             <Button style={{marginTop:10}} onClick={()=>{
                       
                                const myObj={
                                    hod:{
                                        name:hodName==''?filteredDep[0].department.hod.name:hodName,
                                        mail:hodMail==''?filteredDep[0].department.hod.mail:hodMail
                                    }
                                }
                              

                                fetch(`https://new-modibbo-adama.herokuapp.com/admin/edit-hod?departmentId=${filteredDep.length>0?filteredDep[0].department.departmentId:''}&activity=${filteredDep.length>0?filteredDep[0].activity:''}`,{
                                    method:'PUT',
                                    headers:{
                                    "Content-Type":'application/json'
                                    },
                                    body:JSON.stringify(myObj)
                                })
                                .then(res=>{
                                    res.json()
                                    .then(data=>{
                                        setHodMail('')
                                        setHodName('')
                                       loadData()
                                        message.success('successfuly edited!') 
                                   
                                       
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
                        {console.log(filteredDep,"PPPPPP")}
                         <h4 style={{marginTop:10}}>Staff List</h4>
                        {
                            filteredDep[0].department.staffList.length==0&&(
                                <h2>No Staff Added Yet!!</h2>
                            )
                        }

                       {
                           filteredDep[0].department.staffList.length>0&&(
                               filteredDep[0].department.staffList.map((stf,ind)=>(
                                <div className='indiStaff'>
                                <Input onChange={(txt)=>{
                        setStaffName2(txt.target.value)
                    }} placeholder={'Name: '+stf.name}/> 
                                <Input onChange={(txt)=>{
                        setStaffQual2(txt.target.value)
                    }} placeholder={'rank: '+stf.rank}/> 
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
          fetch(`https://new-modibbo-adama.herokuapp.com/admin/edit-department-staff?departmentId=${filteredDep[0].department.departmentId}&staffId=${stf.staffId}`,{
              method:'PUT',
              headers:{
                "Content-Type":'application/json'
              },
              body:JSON.stringify(myObj)
            })
            .then(res=>{
                res.json()
                .then(data=>{
                message.success('New Staff Addedd')
                loadData()
                   
                })
            })
            .catch(err=>{
                console.log(err)
            })
      
       }} style={{marginTop:10}} type='primary'>Save Edited Text</Button> 

<DeleteOutlined onClick={()=>{
                 const confirm=window.confirm('Are You Sure?')
                 if (confirm) {
               
                  fetch(`https://new-modibbo-adama.herokuapp.com/admin/remove-department-staff?departmentId=${filteredDep[0].department.departmentId}&staffId=${stf.staffId}`,{
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
                    <Input value={rank} onChange={(txt)=>{
                        setStaffRank(txt.target.value)
                    }} placeholder='New Staff Rank'/>
                    <Input value={staffMajor} onChange={(txt)=>{
                        setStaffMajor(txt.target.value)
                    }} placeholder='New Staff Major'/>
                       <Input value={staffMail} onChange={(txt)=>{
                        setStaffMail(txt.target.value)
                    }} placeholder='New Staff Email'/>
                    <Input value={staffId} onChange={(txt)=>{
                        setStaffId(txt.target.value)
                    }} placeholder='New Staff Id'/>
                    <Button onClick={()=>{
       
          const myObj={
            staff: {
                name:staffName,
                rank:rank,
                major:staffMajor,
                mail:staffMail,
                staffId
            },
            departmentId:filteredDep[0].department.departmentId
          }
          console.log(myObj)
          fetch(`https://new-modibbo-adama.herokuapp.com/admin/add-department-staff?activity=${filteredDep.length>0?Object.entries(filteredDep[0]).filter(en=>en[0]!=='department')[0][0].split('Name')[0]:''}&entityId=${filteredDep.length>0?filteredDep[0].department.departmentId:''}`,{
              method:'PUT',
              headers:{
                "Content-Type":'application/json'
              },
              body:JSON.stringify(myObj)
            })
            .then(res=>{
                res.json()
                .then(data=>{
                
                    message.success('New Staff Addedd')
                    loadData()
                   
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
              <TextArea value={depMision} onChange={(txt)=>{
                 setDepMision(txt.target.value)
                 
             }} style={{marginTop:10}} placeholder='Department Mission'/>
             <Select value={activity} onChange={(value)=>{
                const filtered=facList.filter(fac=>fac.name==value)
                setMain(filtered[0].list)
                setActivity(filtered[0].name)
               
                
                
                }} defaultValue='sec' style={{marginTop:10,width:'100%'}}>
                <Option value="sec">Select Unit</Option>
                {
                    facList.length>0&&(
                        facList.map((fac,ind)=>(
                            <Option value={fac.facultyId} key={fac.name}>{fac.name}</Option>
                        ))
                    )
                }
                
                </Select>

                <Select value={activityId} onChange={(value)=>{
                setActivityId(value)
                
                }} defaultValue='sec' style={{marginTop:10,width:'100%'}}>
                <Option value="sec">Select {activity}</Option>
                {
                    ManiFacList.length>0&&(
                        ManiFacList.map((fac,ind)=>(
                            <Option value={fac.detail.id} key={fac.detail.name}>{fac.detail.name}</Option>
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
                mission: depMision
            }
          }
          console.log(myObj)
          fetch(`https://new-modibbo-adama.herokuapp.com/admin/add-department?eventId=${activityId}&activity=${activity}&target=${activity}Id`,{
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
                 loadData()
                   
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
             <Input value={hodMail} onChange={(txt)=>{
                 setHodMail(txt.target.value)
             }} style={{marginTop:10}} placeholder='Qualifications'/>
             
             <Button style={{
                 marginTop:10
             }} onClick={()=>{
          const myObj={
            hod: {
                name:hodName,
                mail:hodMail
            },
            departmentId:filteredDep[0].department.departmentId,
            activity:filteredDep[0].activity
          }
          
          
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
