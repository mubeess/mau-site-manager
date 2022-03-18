import React, { useEffect, useState } from 'react'
import { message, Skeleton, Upload } from 'antd';
import { Avatar, Button,Input } from 'antd';
import {DeleteOutlined, PlusCircleOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal';
import Footer from './Footer';

export default function Home() {
    const [homeData,setHomeData]=useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [header,setHeadr]=useState('')
    const [title,setTitle]=useState('')
    const [desc,setDesc]=useState('')
    const [uploaOptions,setUploadOpt]=useState('')
    const [isloading,setLoading]=useState(true)
    const [eventType,setEventType]=useState('')
    const { TextArea }=Input

    const props = {
        name: 'profile_pic',
        action: `https://new-modibbo-adama.herokuapp.com/admin/upload-an-image?eventId=${uploaOptions}&eventName=${eventType}&activity=homepage`,
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
            setHeadr('')
            setTitle('')
            setDesc('')
            loadData()
            handleCancel()
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        
      };





      const props2 = {
        name: 'profile_pic',
        action: `https://new-modibbo-adama.herokuapp.com/admin/upload-an-image?eventId=${homeData.length>0?homeData[0].vc.evntId:''}&activity=vc`,
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
            setHeadr('')
            setTitle('')
            setDesc('')
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
    const loadData=()=>{
        setLoading(true)
        fetch('https://new-modibbo-adama.herokuapp.com/admin/get-home-event')
        .then(res => {
            res.json()
                .then(data => {
                    setLoading(false)
                    setHomeData(data.message)
                    console.log(data.message)
                })
        }).catch(err=>{
            setLoading(false)
        })
    }
    useEffect(() => {
      loadData()
    }, [])
    return (
        <div className='mainContainer'>
        <div className='mainCont'>
        <div className='heading'>
        <h1>Main Events</h1>
        </div>
        
        <div className='homeCont'>
          {
              isloading&&(
                <Skeleton style={{
                    width:'80%',
                    margin:'auto'
                }} active avatar/>
              )
          }

         {
             !isloading&&
             homeData.length>0?homeData[0].mainEvents.map((rec,ind)=>(
                <div className='txt'>
                {rec.image?<img src={rec.image}/>:<h4>No Image Data</h4>}
                <h3>Sub Heading</h3>
               <Input onChange={(txt)=>{
                 setHeadr(txt.target.value)
               }} style={{
                   marginTop:5,
                   width:'70%'
               }} placeholder={`${rec.subHeader}`}/>
                <h4>Title</h4>
                <Input onChange={(txt)=>{
                 setTitle(txt.target.value)
               }} style={{
                   marginTop:5,
                   width:'70%'
               }} placeholder={`${rec.header}`}/>
                <p>Description</p>
                <TextArea onChange={(txt)=>{
                 setDesc(txt.target.value)
               }} style={{
                   marginTop:5,
                   width:'70%',
                   marginBottom:10
               }} placeholder={`${rec.description}`}/>
               <DeleteOutlined onClick={()=>{
                 const confirm=window.confirm('Are You Sure?')
                 if (confirm) {
               
                  fetch(`https://new-modibbo-adama.herokuapp.com/admin/remove-event?eventName=mainEvents&eventId=${rec.evntId}`,{
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
                 marginBottom:10
               }}/>

               <Button onClick={()=>{
              const myObj={
                eventId:rec.evntId,
                eventName:'mainEvents',
                evnt:{
                    header:title?title:homeData[0].header,
                    subHeader:header?header:homeData[0].subHeader,
                    description:desc?desc:homeData[0].description
                }
            }
          
            fetch('https://new-modibbo-adama.herokuapp.com/admin/edit-homepage-event',{
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
                     message.success('doneeeeeee')
                  })
              })


               }} type='primary'>Save Edited Text</Button>
            </div>
             )):(
                 <div>
                     <h1>Empty</h1>
                 </div>
             )


         }
        
    

         <div className='txt'>
         <PlusCircleOutlined onClick={()=>{
             setEventType('mainEvents')
             showModal()
         }} className='myIcon'  style={{
             color:'blue',
             fontSize:40,
             cursor:'pointer'
                 }}/>
         </div>



        </div>
        </div>


        <Modal  title={eventType} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
     {
       eventType=='mainEvents'?(
        <Input value={title} onChange={(txt)=>{
          setHeadr(txt.target.value)
      }}  placeholder='Enter Sub-header'/>
       ):null
     }
     {
       eventType=='mainEvents'||eventType=='newsEvents'?(
        <Input value={header} onChange={(txt)=>{
          setTitle(txt.target.value)
      }} style={{marginTop:20}} placeholder='Enter Title'/>
       ):null
     }
       
       <TextArea value={desc} onChange={(txt)=>{
           setDesc(txt.target.value)
       }} style={{marginTop:20,marginBottom:20}} placeholder={eventType=='mainEvents'?'Enter Description':'Enter News Body'}/>

       <Button onClick={()=>{
          const myObj={
              evnt:{
                  header:title,
                  subHeader:header,
                  description:desc
              },
              homeEventType:eventType
          }
          fetch('https://new-modibbo-adama.herokuapp.com/admin/create-home-event',{
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
                  handleCancel()
                  setDesc('')
                   message.success('doneeeeeee')
                })
            })
      
       }} color='primary'>Upate Text</Button>

{
   eventType=='mainEvents'||eventType=='newsEvents'?(
   <Upload  {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload an Image</Button>
</Upload>
   ):null
}

      </Modal>


<h1>Vc's Message</h1>
<div className='vcMessage'>
  {
     !isloading&&
     homeData.length>0&&
     homeData[0].vc.description!==''?(
       <>
  <img src={homeData[0].vc.image}/>
  <Upload  {...props2}>
    <Button icon={<UploadOutlined />}>Click to Change Vc's Image</Button>
</Upload>
<h4>Vc's Name</h4>
<Input onChange={(txt)=>{
  setHeadr(txt.target.value)
}} style={{width:'70%'}} placeholder={homeData[0].vc.header}/>
<h4>Vc's Message</h4>
<TextArea onChange={(txt)=>{
  setDesc(txt.target.value)
}} style={{width:'70%'}} placeholder={homeData[0].vc.description}/>
<Button onClick={()=>{
  const myObj={
    eventId:homeData[0].vc.evntId,
    eventName:'vc',
    evnt:{
        header:header,
        subHeader:'',
        description:desc
    }
}
console.log(myObj)
fetch('https://new-modibbo-adama.herokuapp.com/admin/edit-homepage-event',{
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
         message.success('doneeeeeee')
      })
  })
}} style={{marginTop:10,marginBottom:10}} type='primary'>Save Edited Text</Button>
       </>
     ):(
       <h1>none</h1>
     )
  }

</div>

<h1>News</h1>
<div className='newsEvent'>


{
             !isloading&&
             homeData.length>0?homeData[0].newsEvents.map((rec,ind)=>(
                <div key={ind} className='txt'>
                {rec.image?<img src={rec.image}/>:<h4>No Image Data</h4>}
                <h4>Title</h4>
                <Input style={{
                   marginTop:5,
                   width:'70%'
               }} placeholder={`${rec.header}`}/>
                <p>News Body</p>
                <TextArea style={{
                   marginTop:5,
                   width:'70%',
                   marginBottom:10
               }} placeholder={`${rec.description}`}/>
               <DeleteOutlined onClick={()=>{
                 const confirm=window.confirm('Are You Sure?')
                 if (confirm) {
               
                  fetch(`https://new-modibbo-adama.herokuapp.com/admin/remove-event?eventName=newsEvents&eventId=${rec.evntId}`,{
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
                 cursor:'pointer'
               }}/>
            </div>
             )):(
                 <div>
                     <h1>Empty</h1>
                 </div>
             )


         }

<div className='txt'>
         <PlusCircleOutlined onClick={()=>{
             showModal()
             setEventType('newsEvents')
         }} className='myIcon'  style={{
             color:'blue',
             fontSize:40,
             cursor:'pointer'
                 }}/>
         </div>
</div>

<h1>Upcoming/Ongoing Events</h1>
<div className='newsEvent'>


{
             !isloading&&
             homeData.length>0?homeData[0].programs.map((rec,ind)=>(
                <div key={ind} className='program'>
                <h4>Event</h4>
                <TextArea style={{
                   width:'70%',
                   marginBottom:10
               }} placeholder={`${rec.description}`}/>
               <DeleteOutlined onClick={()=>{
                 const confirm=window.confirm('Are You Sure?')
                 if (confirm) {
               
                  fetch(`https://new-modibbo-adama.herokuapp.com/admin/remove-event?eventName=programs&eventId=${rec.evntId}`,{
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
                 cursor:'pointer'
               }}/>
            </div>
             )):(
                 <div>
                     <h1>Empty</h1>
                 </div>
             )


         }

<div className='txt'>
         <PlusCircleOutlined onClick={()=>{
             showModal()
             setEventType('programs')
         }} className='myIcon'  style={{
             color:'blue',
             fontSize:40,
             cursor:'pointer'
                 }}/>
         </div>
</div>

<Footer/>
        </div>
    )
}
